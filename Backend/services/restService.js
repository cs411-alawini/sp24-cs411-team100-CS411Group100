const httpClient = require("request-promise");

exports.executeRequest = (options) => {
    return new Promise((resolve, reject) => {
        httpClient(options)
            .then((response) => {
                // console.log(response);
                resolve(response);

            })
            .catch((error) => {
                // console.log(error);
                reject(error);
            });
    })
};
