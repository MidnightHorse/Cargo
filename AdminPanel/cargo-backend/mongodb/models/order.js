const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const schema = new Schema({
    uid : String, //the uid of the owner
    cid: String, //the car involveed in the order
    cname: String, //teh carname
    orderDate: String,
    orderLength: Number, //x day
    totalPrice: Number, //order total
    active:Number, //1 0
})

schema.pre('save',function(next){
    next()
})

schema.methods = {
    updateAndSave : function () {
        return this.save();
    }
}

schema.statics = {
    fetch : function(){

    },
    findById : function(){

    },
    load : function(id){
        return this.findOne({_id : id }).exec();
    },
    list : function(options){
        const criteria = options.criteria || {};
        return this.find(criteria).exec();
    }
}
// reg mongoose model
mongoose.model('Order',schema);
