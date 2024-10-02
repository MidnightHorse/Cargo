const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const schema = new Schema({
    uid : String, //the uid of the owner
    uname: String, //the uname of the owner
    name: String, // the car name
    make: String,
    model: String,
    year: String,
    engineType: String, // Gas / Electric /Hybrid
    doorType: String, // door2 / door4
    seats: String, // seat2/ seat4/ seat5
    pricePerDay: Number,
    location: String, //zipCode
    features:String, //Automatic Transmission , Backup Camera
    booked:Number, //0 1
    carProfileURL: String,
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
mongoose.model('Car',schema);
