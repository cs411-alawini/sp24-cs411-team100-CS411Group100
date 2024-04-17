const mysqlDB = require('../services/databaseService')

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