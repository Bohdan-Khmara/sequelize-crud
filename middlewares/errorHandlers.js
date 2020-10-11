const { BaseError, ValidationError } = require('sequelize');
exports.sequelizeErrorHandler = (err, req, res, next) => {
    if (err instanceof BaseError) {
        if (err instanceof ValidationError) {
            res.status(400).send({
                data: null,
                errors: err.errors.map((e) => ({
                    title: e.message,
                })),
            });
        }
    }

    next(err);
};
exports.errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return;
    }
    res.status(err?.status ?? 500).send({
        data: null,
        errors: [
            {
                title: err?.message ?? err,
            },
        ],
    });
};
