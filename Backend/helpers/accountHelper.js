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

exports.isLoanLinkedToUserID = async (userID, accountID, loanID) => {
    try {
        const query = `SELECT AccountID FROM Loan WHERE LoanID = ? AND AccountID = ? AND IsDeleted = FALSE`;
        const results = await mysqlDB.executeMySQLQuery(query, [loanID, accountID]);

        if (results.length === 0) {
            // Loan ID not found or deleted
            return false;
        }

        // Check if the account associated with the loan belongs to the provided user ID
        const accountQuery = `SELECT UserID FROM Account WHERE AccountID = ? AND IsDeleted = FALSE`;
        const accountResults = await mysqlDB.executeMySQLQuery(accountQuery, [accountID]);

        if (accountResults.length === 0) {
            // Account associated with the loan not found or deleted
            return false;
        }

        // Check if the user ID matches
        return accountResults[0].UserID === userID;

    } catch (error) {
        console.error('Error checking loan linked to user ID:', error);
        // Handle error appropriately
        throw error; // or return false, or any other error handling mechanism
    }
}

exports.isValidEmployee = async (userID) => {
    try {
        const query = `SELECT * FROM Employee WHERE UserID = ? AND IsDeleted = FALSE`;
        const results = await mysqlDB.executeMySQLQuery(query, [userID]);

        return results.length > 0;

    } catch (error) {
        console.error('Error checking if UserID is linked to an employee:', error);
        // Handle error appropriately
        throw error; // or return false, or any other error handling mechanism
    }
}