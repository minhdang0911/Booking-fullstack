import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUses);
    router.get('/test', (req, res) => {
        return res.send('hello word test');
    });
    return app.use('/', router);
};

module.exports = initWebRoutes;
