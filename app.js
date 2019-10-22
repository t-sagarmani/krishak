const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./db/mongoos');
const multer = require('multer')
const Users = require('./models/userAuthModel');
const Mypost = require('./models/mypost');
app.use(express.static('./images'))
app.use(express.json());
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
app.use(cors());
const middleware = require('./middleware/middleware');
const Products = require('./models/productModel');
const Transactions = require('./models/transactionModel');


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/users/me', auth, function(req, res) {
    res.send(req.user);
})

app.post("/login", async function(req, res) {
console.log(req.body)
    const user = await Users.checkCrediantialsDb(req.body.username, req.body.password);
    const token = await user.generateAuthToken();
    // console.log('li'+token)
    if(token===null){
        res.send({ success: false});
    }else{
        res.send({ success: true, token: token, usertype: user.usertype });
    }
})

app.post("/register", async function(req, res) {
    console.log(req.body)
    var myData = new Users(req.body);
    myData.save().then(() => {
        proceedToken(req, res);

    }).catch(function(e) {
        res.send(false)
    })

});

async function proceedToken(req, res) {

    try {
        const user = await Users.checkCrediantialsDb(req.body.username, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ token })
    } catch (erro) {
        res.send(erro);
        console.log(erro)
    }
}

app.get('/alluser', function(req, res) {

    Users.find().then(function(alluser) {
        res.send(alluser);
    }).catch(function() {
        console.log('errot');
    })

});
app.post('/addmyproduct', function(req, res) {

    var myProductData = new Products(req.body);
    console.log(req.body)
    myProductData.save().then(() => {
        // res.send(myProductData);
        res.send(true)
    }).catch(function(e) {
        res.send(false)
    })
});
app.get('/productslist', function(req, res) {

    Products.find().then(function(prductlist) {
        res.send(prductlist);
    }).catch(function() {
        console.log('error');
    })
})

var storage = multer.diskStorage({
    destination: "images",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, file.fieldname + "-" + Date.now() + ext);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { return cb(newError("You can upload only image files!"), false); }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 10000000
    }
});
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send({ Filename: req.file.filename });
})

app.listen(90);