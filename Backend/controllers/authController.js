const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysqlDB = require('../services/databaseService')
const accountHelper = require('../helpers/accountHelper')

// Secret key for JWT signing
const JWT_SECRET = 'your_secret_key'; // Replace this with your own secret key

// Employee authentication controller
exports.authenticateEmployee = async (req, res) => {
    const { username, password } = req.body;

    try {
        const isEmployee = await accountHelper.isValidEmployee(username);

        // If account is not linked to the user, return unauthorized
        if (!isEmployee) {
            return res.status(401).json({ message: 'Employee doesn\'t exist' });
        }
        // Fetch user from database by username
        const query = `SELECT * FROM User WHERE UserID = ? AND IsDeleted = FALSE`;
        const results = await mysqlDB.executeMySQLQuery(query, [username]);

        if (results.length === 0) {
        // User not found
        return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare password hash
        const user = results[0];
        const passwordMatch = password === user.Password;
        // const passwordMatch = await bcrypt.compare(password, user.Password);

        if (!passwordMatch) {
        // Password does not match
        return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.UserID, isEmployee: true }, JWT_SECRET, { expiresIn: '24hr' });

        // Respond with token
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error authenticating Employee:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// User authentication controller
exports.authenticateUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Fetch user from database by username
        const query = `SELECT * FROM User WHERE UserID = ? AND IsDeleted = FALSE`;
        const results = await mysqlDB.executeMySQLQuery(query, [username]);

        if (results.length === 0) {
        // User not found
        return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare password hash
        const user = results[0];
        const passwordMatch = password === user.Password;
        // const passwordMatch = await bcrypt.compare(password, user.Password);

        if (!passwordMatch) {
        // Password does not match
        return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.UserID, isEmployee: false }, JWT_SECRET, { expiresIn: '8hr' });

        // Respond with token
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Middleware for verifying JWT token
exports.isAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token not provided or invalid' });
    }

    const token = authHeader.split(' ')[1];

    // Verify JWT token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Attach userId to request for further processing
        req.userId = decoded.userId;
        req.isEmployee = decoded.isEmployee;
        next();
    });
};

exports.nextreq = (req, res) => {
    res.status(200).json({ user : req.userId })
};