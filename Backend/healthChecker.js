exports.checkStatus = async (request, response) => {
    try {
        let status = 200;
        return response.status(status).json({API: 'OK'});
    }
    catch (error) {
        return response.status(500).json({ message: error.message || error });
    }
}
