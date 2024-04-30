const mysqlDB = require('../services/databaseService')
const accountHelper = require('../helpers/accountHelper')

// exports.createLoan = async (req, res) => {
//     try {
//         const { AccountID, Date, Amount, LoanTypeID, DurationInMonths } = req.body;
//         if (!DistrictID) {
//             return res.status(400).json({ message: 'All parameters are required' });
//         }
//         const query = `INSERT INTO Loan (AccountID, Date, Amount, LoanTypeID, DurationInMonths) VALUES (?, ?, ?, ?, ?)`;
//         const result = await mysqlDB.executeMySQLQuery(query, [AccountID, Date, Amount, LoanTypeID, DurationInMonths]);

//         res.status(201).json({ message: 'Loan created successfully', loanID: result.insertId });

//     } catch (error) {
//         console.error('Error creating loan:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

exports.getLoansByAccountID = async (req, res) => {
    try {
        const { userId } = req;
        const accountId = req.params.accountId;

        const isLinked = await accountHelper.isAccountLinkedToUser(accountId, userId);

        // If account is not linked to the user, return unauthorized
        if (!isLinked) {
            return res.status(401).json({ message: 'Account is not linked to the user' });
        }

        const query = `SELECT * FROM Loan WHERE AccountID = ? AND IsDeleted = FALSE`;
        const results = await mysqlDB.executeMySQLQuery(query, [accountId]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No loans found for this account' });
        }

        res.status(200).json({ loans: results });

    } catch (error) {
        console.error('Error retrieving loans by account ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getLoanRepaymentSchedule = async (req, res) => {
    try {
        const { userId } = req;
        const { accountId, loanId } = req.params;
        
        const isLinked = await accountHelper.isLoanLinkedToUserID(userId, accountId, loanId);

        // If account is not linked to the user, return unauthorized
        if (!isLinked) {
            return res.status(401).json({ message: 'Account is not linked to the user' });
        }

        // Call stored procedure GetTransactionSummary
        const query = 'CALL GenerateRepaymentSchedule(?, ?)';
        const [results] = await mysqlDB.executeMySQLQuery(query, [accountId, loanId]);

        // Check if the results are empty or not
        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'No Repayment Schedule found' });
        }

        // Return the transaction summary
        res.status(200).json({ repaymentSchedule: results });

    } catch (error) {
        console.error('Error retrieving loans Repayment Schedule:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}