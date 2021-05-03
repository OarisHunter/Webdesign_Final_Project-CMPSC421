const express = require('express');
const CORS = require('cors');
const mongoose = require('mongoose');

app = express();

app.use(express.json());
app.use(CORS());


mongoose.connect("mongodb://localhost:27017/TOT", {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
var hold;
var cemail;
db.on('error',console.error.bind(console, "MongoDB connection error:"));

var orderSchema = mongoose.Schema({
    email: String,
    order: Object,
    orderStatus: Number,
    total: Number
});

var Customer = new mongoose.model('Customers', orderSchema);

// sends the order Prosessing page
app.post('/Process_Order', CORS(), (req, res) => {
    var email = req.body.email;
    var order = JSON.parse(req.body.order);
    var orderStatus = req.body.orderStatus;
    var total = 0;

    console.log("Email: " + email);
    console.log("Order: ");
    console.log(order);
    console.log("OrderStatus: " + orderStatus);
    console.log("Total: " + total);

    for(var i = 0; i < Object.keys(order).length; i++) {
        var key = Object.keys(order)[i];
        console.log("Key: " + key + " | Value: " + order[key]);
    }

    Customer.create({email: email, order: order, orderStatus: orderStatus, total: total});

    res.send("Order received and inserted into database");
    console.log("Inserted order totaling " + total + " under email: " + email + " into database");
});

// Recieves email from awards
app.post('/awards', CORS(), (req, res) => {
    cemail = req.body.email;

    //counts the number of times the email was used for orders
    Customer.find({email: cemail}, function (err, doc){
        try {

            console.log(doc.length)
            hold = doc.length

        } catch (g) {
            console.error("bad");
        }
    });

    res.send("email received");
});


// sends the number of emails to fe
app.post('/get', CORS(), (req, res) => {
    console.log("Request from Frontend for JSON");

    res.send(JSON.stringify(hold))
});

app.listen(3002,()=>{
    console.log("App is running and listening");
});