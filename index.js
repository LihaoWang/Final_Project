const Jimp = require('Jimp')
var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = Express();
app.use(bodyParser.json());

var image2 = new Jimp('image/screen.PNG', function (err, img) {
    err ? console.log('logo err' + err) : console.log('logo created and ready for use');
    return img.scale(2.5);
});

function insert(screenshot) {

    Jimp.read('image/Frame.PNG')

        .then(image => {
            image.clone()

                .composite(screenshot, 320, 580)
                .write('image/full.jpg')
        })
        .catch(err => {
            console.error(err);
        });
}
// const promise = require('make-promises-safe')
// const mergeImages = require('merge-images');
// const Canvas = require('canvas');

// mergeImages(['image/i1.PNG', 'image/i2.PNG'], {
//   Canvas: Canvas
// })
//   .then(b64 => 'data:image/;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==')
//   .catch(err => {
//     console.error(err);
// });// data:image/png;base64,iVBORw0KGgoAA...


var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "image");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).array("imgUploader", 3); //Field name and max count

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
    var screen = new Jimp('image/screen1.PNG', function (err, img) {
        err ? console.log('logo err' + err) : console.log('logo created and ready for use');
        return img.scale(2.5);
    });
    insert(screen);
});

app.listen(3000, function (a) {
    console.log("Listening to port 3000");
});