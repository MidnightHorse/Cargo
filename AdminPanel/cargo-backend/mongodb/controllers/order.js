const mongoose = require('mongoose');
const Modal = mongoose.model('Order');
const { wrap: async } = require('co');
const lodash = require("lodash");
const msg = require('../../utils/message')


exports.create = async function(req,res){
    let  modal = new Modal(req.body);
    try {
        await modal.updateAndSave();
        res.send(msg.genSuccessMsg('save success!'))
    } catch (error) {
        console.log(error);
        res.send(msg.genFailedMsg('save fail'))
    }
}
exports.update = async function(req,res){
    try {
        const id = lodash.get(req,'params.id');
        req.modal = await Modal.load(id)
        let modal = req.modal;
        modal = Object.assign(modal,req.body);
        await modal.updateAndSave();
        res.send(msg.genSuccessMsg('update success'))
    } catch (error) {
        console.log(error);
        res.send(msg.genFailedMsg('update fail'))
    }
}
exports.list = async function(req,res){
    try{
        var query = {
            criteria: req.query.criteria&&JSON.parse(req.query&&req.query.criteria),
        }
        var list = await Modal.list(query);
        var count = await Modal.count();
        res.send(msg.genSuccessMsg('success',list,{count:count}))
    } catch (error){
        console.log(error);
        res.send(msg.genFailedMsg('read list fail!'))
    }
}
exports.delete = async function(req,res){
    try {
        const id = lodash.get(req,'params.id');
        req.modal = await Modal.load(id)
        let modal = req.modal;
        await modal.remove()
        res.send(msg.genSuccessMsg('delete success!',modal))
    } catch (error) {
        res.send(msg.genFailedMsg('delete fail!'))
    }
}
exports.findOneById = async function (req,res){
    try {
        const id = lodash.get(req,'params.id');
        req.modal = await Modal.load(id)
        if (!req.modal) return res.send(msg.genFailedMsg('does not exist!'));
        res.send(msg.genSuccessMsg('search success!',req.modal))
    } catch (error) {
        res.send(msg.genFailedMsg('does not exist!'))
    }
}
