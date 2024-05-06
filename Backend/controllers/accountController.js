const mysqlDB = require('../services/databaseService')

exports.getAccounts = async (req,res) => {
    const { userId } = req;
    try{
        const query = `SELECT * FROM Account WHERE UserID = ? AND IsDeleted = FALSE`;
        const results = await mysqlDB.executeMySQLQuery(query, [userId]);
    
        if (results.length === 0) {
          // Account not found
            return res.status(404).json({ message: 'Account not found for this user' });
        }
    
        res.status(200).json({ accounts: results });

    } catch (error) {
        console.error('Error retriving account:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// Function to create an account
exports.createAccount = async (req, res) => {
    const { userId } = req;
    const { DistrictID } = req.body;
    try {

        if (!DistrictID) {
            return res.status(400).json({ message: 'All parameters are required' });
        }

        const query = `INSERT INTO Account (UserID, DistrictID, Balance, DateCreated) VALUES (?, ?, ?, NOW())`;
        const result = await mysqlDB.executeMySQLQuery(query, [userId, DistrictID, 0]);
        
        res.status(201).json({ message: 'Account created successfully', accountID: result.insertId });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to retrieve an account by ID
exports.getAccountByID = async (req, res) => {
    const { userId } = req;
    const { accountId } = req.params;
    try {
        const query = `SELECT * FROM Account WHERE AccountID = ? AND UserID = ? AND IsDeleted = FALSE`;
        const results = await mysqlDB.executeMySQLQuery(query, [accountId, userId]);

        if (results.length === 0) {
        // Account not found
        return res.status(404).json({ message: 'Account not found' });
        }

        res.status(200).json({ account: results[0] });

    } catch (error) {
        console.error('Error retrieving account:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to update an account
exports.updateAccount = async (req, res) => {
    const { userId } = req;
    const { accountId } = req.params;
    const { DistrictID } = req.body;
    try {

        if (!DistrictID || !accountId) {
            return res.status(400).json({ message: 'All parameters are required' });
        }

        const query = `UPDATE Account SET  DistrictID = ?, DateModified = NOW(), IsDeleted = FALSE WHERE AccountID = ? AND UserID = ?`;
        await mysqlDB.executeMySQLQuery(query, [DistrictID, accountId, userId]);

        res.status(200).json({ message: 'Account updated successfully' });
    } catch (error) {
        console.error('Error updating account:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to delete an account
exports.deleteAccount = async (req, res) => {
    const { userId } = req;
    const { accountId } = req.params;
    try {
        const query = `UPDATE Account SET IsDeleted = TRUE, DateDeleted = CURRENT_DATE() WHERE AccountID = ? AND UserID = ? AND IsDeleted = FALSE`;
        await mysqlDB.executeMySQLQuery(query, [accountId, userId]);

        res.status(204).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};