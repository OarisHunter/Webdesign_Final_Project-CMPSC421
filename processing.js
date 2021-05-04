const express = require('express');
const CORS = require('cors');
var mongoose = require('mongoose');

app = express();

app.use(express.json());
app.use(CORS());


//__________________________________________________________________________________________
mongoose.connect('mongodb://localhost:27017/TOT', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error',console.error.bind(console, 'MongoDB connection error:'));

var orderSchema = new mongoose.Schema({
    email: String,
    order: Object,
    orderStatus: Number,
    total: Number
});

var Order = mongoose.model('Orders', orderSchema);
//__________________________________________________________________________________________
app.get('/createOrder', async(req, res) => {
    let order = new Order({email: 'benjamin@gmail.com', order:{

        },orderStatus: 1, total: 1 });
    order.save(function(err, saved){
        console.log(err);
        res.send({result: "ok"});
    });

})

app.get('/get/order/status', CORS(), async (req, res) => {

    console.log('getting order status...')

    let email = req.query.email
    console.log(email);
    let emails = await Order.find({
        emails: email
    });

    if (emails && emails.length) {
        res.send(emails[0]);
        return;
    }
    res.send({});

})

app.listen(3001,()=>{
    console.log("App is running and listening");
});
