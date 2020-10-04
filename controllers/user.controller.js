const { User } = require('./../models');
const _ = require('lodash');

exports.createUser = async (req, res, next) => {
    const { body } = req;
    try {
        const createUser = await User.create(body);
        const userData = createUser.get();
        const preparedUser = _.omit(userData, ['password']);
        res.status(201).send({
            data: preparedUser,
        });
    } catch (err) {
        next(err);
    }
};
exports.getUsers = async (req, res, next) => {
    const users = await User.findAll({
        attributes: {
            exclude: ['password'],
        },
    });
    res.send(users);
};
exports.getUserById = async (req, res, next) => {};
exports.updateUserById = async (req, res, next) => {};
exports.deleteUserById = async (req, res, next) => {};
