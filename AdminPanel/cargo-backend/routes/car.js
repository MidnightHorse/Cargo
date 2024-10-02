var controller = require('../mongodb/controllers/car');

const router = (app)=> {
    // detail
    app.get('/car/:id', controller.findOneById);

    // list
    app.get('/car/', controller.list);
    // create
    app.post('/car/', controller.create);
    // update
    app.post('/car/:id', controller.update);
    // delete
    app.delete('/car/:id', controller.delete);
}
module.exports = router;
 