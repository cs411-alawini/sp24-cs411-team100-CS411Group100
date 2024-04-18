const mysqlDB = require('../services/databaseService')
const accountHelper = require('../helpers/accountHelper')

exports.getTrasactionSummary = async (req,res) => {
    try {
        const { userId } = req
        const { accountId } = req.params
        const { startDate, endDate, transactionType, page, limit } = req.query
        const isLinked = await accountHelper.isAccountLinkedToUser(accountId, userId);

        // If account is not linked to the user, return unauthorized
        if (!isLinked) {
            return res.status(401).json({ message: 'Account is not linked to the user' });
        }
        // Call stored procedure GetTransactionSummary
        const query = 'CALL GetTransactionSummary(?, ?, ?, ?, ?, ?)';
        const [results] = await mysqlDB.executeMySQLQuery(query, [accountId, startDate, endDate, transactionType, page, limit]);

        // Check if the results are empty or not
        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'No transaction summary found' });
        }

        // Return the transaction summary
        res.status(200).json({ transactionSummary: results });
    } catch (error) {
        console.error('Error retrieving transaction summary:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.amountTransfer = async (req,res) => {
    try {
        // Extract data from request body
        const { userId } = req
        const { SenderAccountID, ReceiverAccountID, TransferAmount, TransactionTypeID, TransactionModeID } = req.body;

         // Check if any of the required parameters are null
        if (!SenderAccountID || !ReceiverAccountID || !TransferAmount || !TransactionTypeID || !TransactionModeID) {
            return res.status(400).json({ message: 'All parameters are required' });
        }


        // Check if sender and receiver accounts exist and are valid
        const senderAccountExists = await accountHelper.isValidAccount(SenderAccountID);
        const receiverAccountExists = await accountHelper.isValidAccount(ReceiverAccountID);

        if (!senderAccountExists || !receiverAccountExists) {
            return res.status(400).json({ message: 'Invalid sender or receiver account' });
        }

        // Check if transaction mode and type exist and are valid
        const transactionModeExists = await accountHelper.isValidTransactionMode(TransactionModeID);
        const transactionTypeExists = await accountHelper.isValidTransactionType(TransactionTypeID);

        if (!transactionModeExists || !transactionTypeExists) {
            return res.status(400).json({ message: 'Invalid transaction mode or type' });
        }

        const isLinked = await accountHelper.isAccountLinkedToUser(SenderAccountID, userId);

        // If account is not linked to the user, return unauthorized
        if (!isLinked) {
            return res.status(401).json({ message: 'Account is not linked to the user' });
        }

        // Call the stored procedure ProcessTransaction with the provided parameters
        const query = `CALL cs411group100.ProcessTransaction(?, ?, ?, ?, ?)`;
        const [results] = await mysqlDB.executeMySQLQuery(query, [SenderAccountID, ReceiverAccountID, TransferAmount, TransactionTypeID, TransactionModeID]);

        // If the transaction is successful, return success message
        if (results && results.length > 0 && results[0]['Message'] === 'Transaction Completed Successfully') {
            return res.status(200).json({ message: 'Transaction completed successfully' });
        } else {
            // If the transaction fails, return error message
            return res.status(400).json({ message: 'Transaction failed' });
        }
    } catch (error) {
        // If an error occurs, return internal server error
        console.error('Error transferring amount:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}