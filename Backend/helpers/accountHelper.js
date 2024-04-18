const mysqlDB = require('../services/databaseService')

exports.isAccountLinkedToUser = async (accountID, userID) => {
    try {
        // Query to check if the AccountID is linked to the UserID
        const query = `SELECT COUNT(*) AS count FROM Account WHERE AccountID = ? AND UserID = ?`;

        // Execute the query
        const [row] = await mysqlDB.executeMySQLQuery(query, [accountID, userID]);

        // Extract the count from the result
        const count = row.count;

        // Return true if count is greater than 0, indicating a match
        return count > 0;

    } catch (error) {
        console.error('Error checking account link:', error);
        // Return false in case of any error
        return false;
    }
};

// Helper function to check if an account is valid
exports.isValidAccount = async (accountID) => {
    // Check if account exists and is not deleted
    const query = `SELECT * FROM Account WHERE AccountID = ? AND IsDeleted = FALSE`;
    const results = await mysqlDB.executeMySQLQuery(query, [accountID]);
    return results && results.length > 0;
}

// Helper function to check if a transaction mode is valid
exports.isValidTransactionMode = async (modeID) => {
    // Check if transaction mode exists and is not deleted
    const query = `SELECT * FROM TransactionMode WHERE ModeID = ? AND IsDeleted = FALSE`;
    const results = await mysqlDB.executeMySQLQuery(query, [modeID]);
    return results && results.length > 0;
}

// Helper function to check if a transaction type is valid
exports.isValidTransactionType = async (typeID) => {
    // Check if transaction type exists and is not deleted
    const query = `SELECT * FROM TransactionType WHERE TransactionTypeID = ? AND IsDeleted = FALSE`;
    const results = await mysqlDB.executeMySQLQuery(query, [typeID]);
    return results && results.length > 0;
}