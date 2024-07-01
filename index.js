// const mongoose = require('mongoose');
// const express = require('express');
// const cors = require('cors');

// const app = express();

// mongoose.connect('mongodb://0.0.0.0:27017/e-comm', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Could not connect to MongoDB', err));

// const userSchema = new mongoose.Schema({
//     email: { type: String, required: true },
//     password: { type: String, required: true },
// });

// const userModel = mongoose.model('logindata', userSchema);

// app.use(cors());
// app.use(express.json());

// const loginMiddleware = async (req, res, next) => {
//     const { email, password } = req.body;
//     const userLogin = await userModel.findOne({ email });
//     if (!userLogin) {
//         return res.status(401).send("Invalid credentials");
//     }
//     if (password !== userLogin.password) {
//         return res.status(401).send("Password is invalid");
//     }
//     next();
// };

// app.post('/login', loginMiddleware, async (req, res) => {
//     try {
//         res.send({ message: "Login Successfully" });
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.listen(8081, () => {
//     console.log('Server is running on port 8081');
// });



