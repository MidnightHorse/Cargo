const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const schema = new Schema({
    username : String,
    realName: String,
    password: String,
    email: String,
    joinDate: String,
    userProfileURL: String,
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
mongoose.model('User',schema);
