// const express = require('express')
// const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
// const cors = require('cors')

// mongoose.connect('mongodb://0.0.0.0:27017/e-comm')
//     .then(() => {
//         console.log("Database is connedted to node js application");
//     }).catch(err => console.log(err))

// const bcryptSchema = mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// })

// const bCryptModel = mongoose.model('logindata', bcryptSchema)

// const app = express()
// app.use(cors())
// app.use(express.json())

// app.post('/register', async (req, resp) => {
//     const { username, email, password } = req.body
//     try {
//         // let findMerchant = await bCryptModel.findOne({ username: username, email: email })
//         // if (!findMerchant) {

//         const bcryptPassword = await bcrypt.hash(password, salt = 10)
//         const createMerchantAccount = new bCryptModel({ username: username, email: email, password: bcryptPassword })
//         await createMerchantAccount.save();
//         resp.status(201).send({ message: "Merchant account created succesfullt" });

//         // } else {
//         //     resp.send({ messgae: "Merchant found please login" })
//         // }
//     } catch (err) {
//         console.log(err)
//     }
// })

// app.post('/login', async (req, resp) => {
//     const { email, password } = req.body;
//     const bCryptData = await bCryptModel.findOne({ email: email, password: bcryptPassword })
//     const bcryptPassword = bcrypt.compare(password, bCryptData.password)
//     resp.send(bCryptData);
// })

// app.listen(4000, () => {
//     console.log("Server is running on the port 4000");
// })




const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

mongoose.connect('mongodb://0.0.0.0:27017/e-comm')
    .then(() => { console.log("Mongodb is connected to node js") })

const merchantSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const merchantModel = mongoose.model('logindata', merchantSchema)

const app = express()
app.use(express.json())

app.post('/register', async (req, resp) => {
    const { email, password } = req.body
    const bcryptPassword = await bcrypt.hash(password, 10)

    const findUser = await merchantModel.findOne({ email: email })

    if (!findUser) {
        const createMerchant = new merchantModel({ email: email, password: bcryptPassword })
        const saveMerchant = await createMerchant.save()
        resp.status(201).send("Merchant is successfully creates")
    }
    else {

        resp.send({ message: "user Not found" })
    }
})

app.post('/login', async (req, resp) => {
    const { email, password } = req.body
    const findMerchant = await merchantModel.findOne({ email: email })
    const comparePassword = bcrypt.compare(password, findMerchant.password)
    if (password !== comparePassword) {
        resp.send("login Successfully")
    } else {
        resp.send("Email or Password is invalid")
    }
})

app.listen(4000, () => {
    console.log("server is running in port 4000");
})