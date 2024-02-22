import db from '../models/index';
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

module.exports = {
    getHomepage: getHomepage,
};
