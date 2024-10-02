var controller = require('../mongodb/controllers/user');
const router = (app)=>{
    app.get('/user/:id', controller.findOneById);

    app.get('/user/',controller.list);

    app.post('/user/',controller.create);

    app.post('/user/:id',controller.update);

    app.delete('/user/:id',controller.delete);
}


module.exports = router;
