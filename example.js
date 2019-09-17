// const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./db/mongoos');
const multer = require('multer')
const Users = require('./models/userAuthModel');
//const Product = require('./models/product');
const UserInfo = require('./models/userInfo');
const Mypost = require('./models/mypost');
app.use(express.static('./images'))
app.use(express.json());

//const UserInfo = require('./models/userinfo');

const path = require('path');
// const publicDirectry = path.join(__dirname, 'public')
// const viewPath = path.join(__dirname, 'resources');
// app.set('views', viewPath);
const cors = require('cors');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
app.use(cors());
const middleware = require('./middleware/middleware');


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/mytest', auth, function () {
    res.send("this is my private page")
})

// app.post('/login', function (req, res) {

//     const username=req.body.username;
//     const password=req.body.password;

// const User=Users.myFirst(username,password);

// });
// app.get('/test11',middleware,function(){
//     console.log("middlewarer infff")
// })
app.get('/users/me', auth, function (req, res) {
    res.send(req.user);
})
app.post("/login", async function (req, res) {

    const user = await Users.checkCrediantialsDb(req.body.username, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ success:true, token:token, usertype:user.usertype });
})

app.get("/test99", auth, function (req, res) {

})

app.post("/register", async function (req, res) {
    // console.log('myData')
    var myData = new Users(req.body);
    myData.save().then(function () {
        //   console.log(myData)
        //res.send(true);
    }).catch(function (e) {
        res.send(false)
    });
    const user = await Users.checkCrediantialsDb(req.body.username, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ token })


});
app.get('/profiledata/:id', function (req, res) {

    id = req.params.id;

    UserInfo.findOne({ _id: id }).then(function (userData) {
        res.send(userData);
        // console.log(userData);
    }).catch(function () {
        console.log('errot');
    })

});
// 
app.post('/addpost', auth, function (req, res) {


    const myPost = new Mypost({ ...req.body, userId: req.user._id });
    //console.log(myPost);

    myPost.save().then(function () {
        res.json(true);

    }).catch(function (e) {
        res.send(e)
    })
});
app.put('/updateprofile', auth, function (req, res) {

 
    UserInfo.findByIdAndUpdate(req.user._id, req.body, { new: true }, function (user) {
        res.send(true)
    })
})

app.delete('/deletepost/:id', auth, function (req, res) {

    console.log(req.params.id);
    Mypost.findByIdAndDelete(req.params.id, function (user) {
        res.send(true)
    })
})
app.put('/like', auth, function (req, res) {

    console.log(req.body.pid);


    Mypost.updateOne({ _id: req.body.pid }, { $inc : {likes : 1}}, function (user) {
        console.log(user);
        res.send(true)
    })
 
})

app.get('/gettimeline', auth, function (req, res) {

    Mypost.find()
        .populate('userId', ['username', 'profile_image'])
        .exec()
        .then(function (postdata) {
            if (postdata) {
                res.json({
                    Post: postdata.map(doc => {
                        return {
                            _id: doc._id,
                            postImage: doc.postImage,
                            postDescription: doc.postDescription,
                            location: doc.location,
                            likes: doc.likes,
                            comments: doc.comments,
                            userId: doc.userId
                        }
                    })
                })
            }
        }).catch(function (params) {
            console.log(params)
        })
})

app.get('/getadmintimeline', auth, function (req, res) {

    Mypost.find()
        .populate('userId', ['username', 'profile_image'])
        .exec()
        .then(function (postdata) {
            if (postdata) {
                res.json({
                    Post: postdata.map(doc => {
                        return {
                            _id: doc._id,
                            postImage: doc.postImage,
                            postDescription: doc.postDescription,
                            location: doc.location,
                            likes: doc.likes,
                            comments: doc.comments,
                            userId: doc.userId
                        }
                    })
                })
            }
        }).catch(function (params) {
            console.log(params)
        })
})
app.get('/gettimelineandroid', auth, function (req, res) {

    Mypost.find().then(function (params) {
        // console.log(params)
        res.send(params);
    })
    // Mypost.find()
    // .populate('userId',['username','profile_image'])
    // .exec()
    // .then(function(postdata){
    //     console.log('yaha samma')
    //      if(postdata){
    //         console.log(postdata)
    //          res.send(postdata);
    //      }  
    // }).catch(function (params) {
    //     console.log(params)
    // })

})

app.get('/getpersonaltimeline', auth, function (req, res) {
    Mypost.find({ userId: req.user._id })
        .populate('userId', ['username', 'profile_image'])
        .exec()
        .then(function (postdata) {
            if (postdata) {
                res.json({
                    Post: postdata.map(doc => {
                        return {
                            _id: doc._id,
                            postImage: doc.postImage,
                            postDescription: doc.postDescription,
                            location: doc.location,
                            likes: doc.likes,
                            comments: doc.comments,
                            userId: doc.userId
                        }
                    })


                })
            }
        })



    //    then(function (postdata) {
    //     postdata.forEach(postdata=>{
    //             console.log(pos)
    //     })
    //     UserInfo.findById(postdata.userId).then(function (userprps){

    //                    //console.log(userprps);
    //     })
    //             res.send(postdata);
    //    // console.log(postdata);
    // }).catch(function () {
    //     console.log('errot');
    // })
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
    if
        (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { return cb(newError("You can upload only image files!"), false); }
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
    //console.log(req.file.filename)
})



// function generateToken(){
//     const token =jwt.sign({_id:"userid"},"mysecretwordsd");
//     console.log(token);
// }
//generateTokens();

app.listen(90);