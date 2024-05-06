const mysqlDB = require('../services/databaseService')

exports.getDistrictFinancialAndCreditInsights = async (req, res) => {
    try {

        const { isEmployee } = req
        const { DistrictId } = req.query;

        if(!isEmployee){
            return res.status(401).json({ message: 'Restricted to Employee only' });
        }
        const query = `CALL cs411group100.DistrictFinancialAndCreditInsights(?)`;
        const result = await mysqlDB.executeMySQLQuery(query, [DistrictId]);
        res.status(200).json({ creditScore : result[0], insight : result[1]})


    } catch (error) {
        console.error('Error retriving data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}