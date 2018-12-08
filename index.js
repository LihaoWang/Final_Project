//set up npm packages
const Jimp = require('jimp')
const fs = require('fs')
var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = Express();
var ejs = require('ejs')

//set up ejs and express routing
app.use(Express.static('public'));
app.use(bodyParser.json());
app.set('views', __dirname + '/public')
app.set('view engine', 'ejs')

//set up listen port
app.listen(3000, function (a) {
    console.log("Listening to port 3000");
});

//the function of generating screenshot with frame
function insert(screenshot) {
    Jimp.read('public/image/frame.PNG')
        .then(image => {
            return image
                .composite(screenshot, 320, 580)
                .write('public/image/full.jpg')
        })
        .catch(err => {
            console.error(err);
        });
}

var action = false

//set up upload functions
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "public/image");
    },
    filename: function (req, file, callback) {
        callback(null, "screen1.PNG");
    }
});

var upload = multer({
    storage: Storage
}).array("imgUploader", 3); //Field name and max count

//set up index route
app.get("/", function (req, res) {
    res.render('index',{
        action: action,
    });
});

//set up welcome route
app.get("/welcome", function (req, res) {
    res.render('welcome');
});

//display framed image with black phone
app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        var screen = new Jimp('public/image/screen1.PNG', function (err, img) {
            err ? console.log('logo err' + err) : console.log('image processed');
            return img.scale(2.5);
        });
        insert(screen); 
        setTimeout(function(){
            action = true;
            res.redirect('/');
        }, 3000);
        
    });
});

//display framed image with silver phone
app.post("/api/Upload1", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        var screen = new Jimp('public/image/screen1.PNG', function (err, img) {
            err ? console.log('logo err' + err) : console.log('image processed');
            return img.scale(2.5);
        });
        Jimp.read('public/image/frameWhite.jpeg')
        .then(image => {
            return image
                .composite(screen, 320, 570)
                .write('public/image/full.jpg')
        })
        .catch(err => {
            console.error(err);
        });
        setTimeout(function(){
            action = true;
            res.redirect('/');
        }, 3000);
        
    });
});

//display framed image with gold phone
app.post("/api/Upload2", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        var screen = new Jimp('public/image/screen1.PNG', function (err, img) {
            err ? console.log('logo err' + err) : console.log('image processed');
            return img.scale(2.5);
        });
        Jimp.read('public/image/frameGold.jpeg')
        .then(image => {
            return image
                .composite(screen, 320, 570)
                .write('public/image/full.jpg')
        })
        .catch(err => {
            console.error(err);
        });
        setTimeout(function(){
            action = true;
            res.redirect('/');
        }, 3000);
        
    });
});








