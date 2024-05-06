const mysqlDB = require('../services/databaseService')

exports.searchRecords = async (req, res) => {
    try {
        const { isEmployee } = req
        const { searchAttribute, searchKey } = req.query;
        const attributes = searchAttribute.split(',').map(key => key.trim());

        if(!isEmployee){
            return res.status(401).json({ message: 'Restricted to Employee only' });
        }

        // Perform search in each table based on the search attribute
        let results = {};

        // Search in User table
        for (const attribute of attributes) {

            if (attribute === 'User') {
                // Perform search in User table
                const userResult = await mysqlDB.executeMySQLQuery(`SELECT * FROM User WHERE CAST(UserID AS CHAR) LIKE CONCAT('%', ?, '%') ORDER BY UserID ASC LIMIT 10`, [searchKey]);
                results.User = userResult;
            }

            // Search in District table
            if (attribute === 'District') {
                // Perform search in District table
                const districtResult = await mysqlDB.executeMySQLQuery(`SELECT * FROM District WHERE CAST(DistrictID AS CHAR) LIKE CONCAT('%', ?, '%') OR DistrictName LIKE CONCAT('%', ?, '%') ORDER BY DistrictID ASC, DistrictName ASC  LIMIT 10`, [searchKey, searchKey]);
                results.District = districtResult;
            }

            // Search in Employee table
            if (attribute === 'Employee') {
                // Perform search in Employee table
                const employeeResult = await mysqlDB.executeMySQLQuery(`SELECT * FROM Employee WHERE CAST(EmployeeID AS CHAR) LIKE CONCAT('%', ?, '%') ORDER BY EmployeeID ASC LIMIT 10`, [searchKey]);
                results.Employee = employeeResult;
            }

            // Search in Account table
            if (attribute === 'Account') {
                // Perform search in Account table
                const accountResult = await mysqlDB.executeMySQLQuery(`SELECT * FROM Account WHERE CAST(AccountID AS CHAR) LIKE CONCAT('%', ?, '%') ORDER BY AccountID ASC LIMIT 10`, [searchKey]);
                results.Account = accountResult;
            }

            // Search in Loan table
            if (attribute === 'Loan') {
                // Perform search in Loan table
                const loanResult = await mysqlDB.executeMySQLQuery(`SELECT * FROM Loan WHERE CAST(LoanID AS CHAR) LIKE CONCAT('%', ?, '%') ORDER BY LoanID ASC LIMIT 10`, [searchKey]);
                results.Loan = loanResult;
            }
        }

        res.json(results);
    } catch (error) {
        console.error('Error performing search:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}