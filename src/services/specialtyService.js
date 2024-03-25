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

module.exports = {
    createSpecialty: createSpecialty,
};
