const mysqlDB = require('../services/databaseService')

// Get a user by ID
exports.getUserByID = async (req,res) => {
    const { userId } = req;
    try {
        const query = `SELECT * FROM User WHERE UserID = ? AND IsDeleted = FALSE`;
        const results = await mysqlDB.executeMySQLQuery(query, [userId]);

        if (results.length === 0) {
            // User not found
            return res.status(401).json({ message: 'Invalid user' });
        }

        res.status(200).json({ user: results[0] })

    } catch (error) {
        console.error('Error retriving user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Create a new user
exports.createUser = async (req, res) => {
    const { Password, DateOfBirth, Gender } = req.body;
    try {

        if (!Password || !DateOfBirth || !Gender) {
            return res.status(400).json({ message: 'All parameters are required' });
        }

        const query = `INSERT INTO User (Password, DateOfBirth, Gender) VALUES (?, ?, ?)`;
        const results = await mysqlDB.executeMySQLQuery(query, [Password, DateOfBirth, Gender]);

        const userId = results.insertId;

        res.status(201).json({ message: 'User created successfully', userId });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Update a user
exports.updateUser = async (req, res) => {
    const { userId } = req;
    const { Password, DateOfBirth, Gender } = req.body;
    try {

        if (!Password || !DateOfBirth || !Gender) {
            return res.status(400).json({ message: 'All parameters are required' });
        }

        const query = `UPDATE User SET Password = ?, DateOfBirth = ?, Gender = ?, DateModified = NOW() WHERE UserID = ?`;
        await mysqlDB.executeMySQLQuery(query, [Password, DateOfBirth, Gender, userId]);

        res.status(200).json({ message: 'User updated successfully' });

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Delete a user
exports.deleteUser = async (req, res) => {
    const { userId } = req;
    try {
        const query = `UPDATE User SET IsDeleted = TRUE, DateDeleted = NOW() WHERE UserID = ?`;
        await mysqlDB.executeMySQLQuery(query, [userId]);

        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}