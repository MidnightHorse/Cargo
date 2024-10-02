var controller = require('../mongodb/controllers/order');
const router = (app)=> {
    app.get('/order/:id', controller.findOneById);

    app.get('/order/', controller.list);

    app.post('/order/', controller.create);

    app.post('/order/:id', controller.update);

    app.delete('/order/:id', controller.delete);
}
module.exports = router;
