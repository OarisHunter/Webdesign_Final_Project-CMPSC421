// Backend server for orders page

const express = require('express');
const CORS = require('cors');
var mongoose = require('mongoose');

app = express();

app.use(express.json());
app.use(CORS());


// -------------------------------- //

mongoose.connect('mongodb://localhost:27017/TOT', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection

db.on('error',console.error.bind(console, 'MongoDB connection error: '));

var orderSchema = mongoose.Schema({
    email: String,
    order: Object,
    orderStatus: Number
});

var Customer = new mongoose.model('Customers', orderSchema);

// -------------------------------- //

app.post('/Process_Order', CORS(), (req, res) => {
    var email = req.body.email;
    var order = JSON.parse(req.body.order);
    var orderStatus = req.body.orderStatus;

    console.log("Email: " + email);
    console.log("Order: ");
    console.log(order);
    console.log("OrderStatus: " + orderStatus);

    for(var i = 0; i < Object.keys(order).length; i++) {
        var key = Object.keys(order)[i];
        console.log("Key: " + key + " | Value: " + order[key]);
    }

    Customer.create({email: email, order: order, orderStatus: orderStatus});

    res.send("Order received and inserted into database");
    console.log("Inserted order under email: " + email + " into database");
});

app.listen(3000,()=>{
    console.log("App is running and listening");
});