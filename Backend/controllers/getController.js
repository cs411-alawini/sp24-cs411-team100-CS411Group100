const mysqlDB = require('../services/databaseService')

exports.getRoles = async (req, res) => {
    try {
        const query = `SELECT * FROM Role WHERE IsDeleted = FALSE`;
        const results = await mysqlDB.executeMySQLQuery(query, []);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No roles found' });
        }

        res.status(200).json({ roles: results });

    } catch (error) {
        console.error('Error retrieving roles:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getDistricts = async (req, res) => {
    try {
        const query = `SELECT * FROM District WHERE IsDeleted = FALSE`;
        const results = await mysqlDB.executeMySQLQuery(query, []);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No districts found' });
        }

        res.status(200).json({ districts: results });

    } catch (error) {
        console.error('Error retrieving districts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getTransactionModes = async (req, res) => {
    try {
        const query = `SELECT * FROM TransactionMode WHERE IsDeleted = FALSE`;
        const results = await mysqlDB.executeMySQLQuery(query, []);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No transaction modes found' });
        }

        res.status(200).json({ transactionModes: results });

    } catch (error) {
        console.error('Error retrieving transaction modes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getTransactionTypes = async (req, res) => {
    try {
        const query = `SELECT * FROM TransactionType WHERE IsDeleted = FALSE`;
        const results = await mysqlDB.executeMySQLQuery(query, []);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No transaction types found' });
        }

        res.status(200).json({ transactionTypes: results });

    } catch (error) {
        console.error('Error retrieving transaction types:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getLoanTypes = async (req, res) => {
    try {
        const query = `SELECT * FROM LoanType WHERE IsDeleted = FALSE`;
        const results = await mysqlDB.executeMySQLQuery(query, []);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No loan types found' });
        }

        res.status(200).json({ loanTypes: results });

    } catch (error) {
        console.error('Error retrieving loan types:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}