import express from 'express';
import homeController from '../controllers/homeController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);

    router.get('/test', (req, res) => {
        return res.send('hello word test');
    });
    return app.use('/', router);
};

module.exports = initWebRoutes;
