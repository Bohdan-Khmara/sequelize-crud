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
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password'],
            },
        });
        res.send({
            data: users,
        });
    } catch (err) {
        next(err);
    }
};
exports.getUserById = async (req, res, next) => {
    const { url } = req;
    const userId = url.split('/users/').join('');
    try {
        const user = await User.findAll({
            attributes: {
                exclude: ['password'],
            },
            where: {
                id: userId,
            },
        });
        res.send({
            data: user,
        });
    } catch (err) {
        next(err);
    }
};
exports.updateUserById = async (req, res, next) => {
    const { body, url } = req;
    const userId = url.split('/users/').join('');
    try {
        const updateUser = await User.update(body, {
            where: {
                id: userId,
            },
        });
        res.send({
            data: 'user updated',
        });
    } catch (err) {
        next(err);
    }
};
exports.deleteUserById = async (req, res, next) => {
    const { url } = req;
    const userId = url.split('/users/').join('');
    try {
        const remoteUser = await User.destroy({
            where: {
                id: userId,
            },
        });
        res.status(200).send({
            data: 'user has been deleted',
        });
    } catch (err) {
        next(err);
    }
};
