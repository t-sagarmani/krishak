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
const Category = require('./models/categoryModel');
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
        res.send({ success: true, token: token, userid: user._id });
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

    var myProductData = new Products({
        productName: req.body.productName,
        productCategory: req.body.productCategory,
        pricePerUnit: req.body.pricePerUnit,
        description: req.body.description,
        image: req.body.image,
        discount: req.body.discount,
        quantity: req.body.quantity,
        availableLocation: req.body.availableLocation,
        manufacturedLocation: req.body.manufacturedLocation,
        productExpireData: req.body.productExpireData,
        uploadedBy: req.body.uploadedBy,
    });
    console.log(myProductData)

    myProductData.save().then((datalist) => {
       
        console.log("new dataaa see herev ")
       
        
    }).catch(function(e) {
        res.send(false)
    })
});


app.get('/productslist', function(req, res) {

    Products.find().then(function(prductlist) {
        res.json([
            {
                data:prductlist
            }
        ]);
    }).catch(function() {
        console.log('error');
    })
})

app.post('/addcategory', function (req, res) {

    var myCatData = new Category(req.body);
    console.log(myCatData)
    myCatData.save().then(() => {
        res.send(myCatData);
    }).catch(function (e) {
        res.send(false)
    })
});

app.get('/categories', function (req, res) {

    Category.find().then(function (prductlist) {
        res.send(prductlist);
    }).catch(function () {
        console.log('errot');
    })
})

app.get('/filterlist/:tagId', function (req, res) {

    Products.find({ "productCategory": req.params.tagId }).then(function (prductlist) {
        res.send(prductlist);
    }).catch(function () {
        console.log('errot');
    })
})

app.get('/cart/:tagId', function (req, res) {

    Products.find({ _id: req.params.tagId }).then(function (cartlist) {
        res.send(cartlist);
    }).catch(function () {
        console.log('error');
    })
})







var storage = multer.diskStorage(
    {
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
app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file.filename);
    res.send({ Filename: req.file.filename });
})

app.listen(90);