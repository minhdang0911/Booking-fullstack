import db from '../models/index';
import CRUDService from '../services/CRUDService';
let getHomepage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        console.log(data);
        console.log('-----------------------');
        return res.render('homepage.ejs', {
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e);
    }
};

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
};
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);

    return res.send('post crud');
};

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('-------------------');
    console.log(data);

    res.render('displayCRUD.ejs', {
        dataTable: data,
    });
};

module.exports = {
    getHomepage: getHomepage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
};
