var controller = require('../mongodb/controllers/comment');
const router = (app)=> {
    app.get('/comment/:id', controller.findOneById);

    app.get('/comment/', controller.list);

    app.post('/comment/', controller.create);

    app.post('/comment/:id', controller.update);

    app.delete('/comment/:id', controller.delete);
}
module.exports = router;
