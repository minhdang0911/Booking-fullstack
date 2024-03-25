const db = require('../models');

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdowm) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameters',
                });
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdowm: data.descriptionMarkdowm,
                });
                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllSpeccialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll({});
            if (data && data.length > 0) {
                data.map((item) => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');

                    return item;
                });
            }
            resolve({
                errMessage: 'ok',
                errCode: 0,
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createSpecialty: createSpecialty,
    getAllSpeccialty: getAllSpeccialty,
};
