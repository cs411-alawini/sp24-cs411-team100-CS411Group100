const {body, checkSchema, validationResult} = require('express-validator');

exports.validate = (validations) => {
    return async (request, response, next) => {
        await Promise.all(validations.map(validation => validation.run(request)));

        const errors = validationResult(request);
        if (errors.isEmpty()) {
            return next();
        }

        response.status(400).json({
            errors: errors.array()
        });
    };
};