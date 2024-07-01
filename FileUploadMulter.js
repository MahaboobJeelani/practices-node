const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/e-comm')
    .then(() => { console.log('Mongodb is connected with node js application'); })
    .catch((err) => { console.log(err); });

const profileSchema = mongoose.Schema({
    email: String,
    password: String,
    image: String
});

const profileModel = mongoose.model('profile', profileSchema);

const app = express();
app.use(cors());
app.use(express.static('uploads'));
app.use(express.json());

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage: Storage
}).single('file');

app.post('/register', (req, resp) => {
    upload(req, resp, async (err) => {
        if (err) {
            console.log(err);
            resp.status(500).send("Error Uploading file");
        } else {
            const profile = req.file.filename;
            const email = req.body.email;
            const password = req.body.password;

            const newImage = new profileModel({
                email: email,
                password: password,
                image: profile
            });

            await newImage.save()
                .then(() => resp.status(201).json({ newImage, message: "File successfully uploaded" }))
                .catch((err) => console.log(err));
        }
    });
});

app.get('/images', async (req, resp) => {
    try {
        const profiles = await profileModel.find();
        const profilesWithImageURLs = profiles.map(profile => {
            return {
                email: profile.email,
                password: profile.password,
                image: `http://localhost:8000/uploads/images/${profile.image}`
            };
        });
        resp.status(200).json(profilesWithImageURLs);
    } catch (error) {
        resp.status(500).send(error.message);
    }
});

app.listen(8000, () => {
    console.log("server is running on port 8000");
});

