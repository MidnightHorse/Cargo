const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const schema = new Schema({
    uid: String,
    cid : String, //the cid of the car
    comment: String,
    rating: Number,
    realName: String,
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
//reg mongoose model
mongoose.model('Comment',schema);
