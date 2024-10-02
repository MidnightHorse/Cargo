const axios = require('axios');
const clearCollection = require("./mongo-clear");
const userSourceList = require("./dataSource/data-user-source");
const carSourceList = require("./dataSource/data-car-source");
const orderSourceList = require("./dataSource/data-order-source");
const commentSourceList = require("./dataSource/data-comment-source");
const instance = axios;
async function initUser(){
    for (let index = 0; index < userSourceList.length; index++) {
        const item = userSourceList[index];
        const data = {
            _id: item._id,
            username: item.username,
            realName: item.realName,
            password: item.password,
            joinDate: item.joinDate,
            email: item.email,
        }
        const res = await instance.post("http://localhost:3000/user", data);
    }
}
async function initCar(){
    for (let index = 0; index < carSourceList.length; index++) {
        const item = carSourceList[index];
        const data = {
            _id: item._id,
            uid: item.uid,
            name: item.name,
            make: item.make,
            model: item.model,
            year: item.year,
            engineType: item.engineType,
            doorType: item.doorType,
            seats: item.seats,
            location: item.location,
            pricePerDay: item.pricePerDay,
            joinDate: item.joinDate,
            email: item.email,
            features: item.features,
            booked: item.booked
        }
        const res = await instance.post("http://localhost:3000/car", data);
    }
}
async function initOrder(){
    for(let index = 0; index < orderSourceList.length; index++) {
        const item = orderSourceList[index];
        const data = {
            _id: item._id,
            uid: item.uid,
            cid: item.cid,
            orderDate: item.orderDate,
            orderLength: item.orderLength,
            totalPrice:item.totalPrice,
            active: item.active,
        }
        const res = await instance.post("http://localhost:3000/order", data);
    }
}
async function initComments(){
    for(let index = 0; index < commentSourceList.length; index++) {
        const item = commentSourceList[index];
        const data = {
            _id: item._id,
            uid: item.uid,
            cid: item.cid,
            comment: item.comment,
            rating: item.rating,
            realName:item.realName,
        }
        const res = await instance.post("http://localhost:3000/comment", data);
    }
}
async function main() {
    await clearCollection("users");
    await clearCollection("orders");
    await clearCollection("cars");
    await clearCollection("comments");
    await initUser();
    await initCar();
    await initOrder();
    await initComments();
}
module.exports = main;
