import db from '../models/index';
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            });
            resolve('create success');
        } catch (e) {
            reject(e);
        }
    });

    // console.log('data from service');
    // console.log(data);
    // console.log(hashPasswordFromBcrypt);
};

let hashUserPassword = (password) => {
    return new Promise(async (resolse, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolse(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createNewUser: createNewUser,
};
