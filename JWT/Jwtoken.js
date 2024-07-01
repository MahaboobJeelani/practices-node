// const express = require('express');
// const bodyparser = require('body-parser');
// const jwt = require('jsonwebtoken');

// const app = express();
// app.use(bodyparser.json());


// const verifyMiddleware = (req, resp, next) => {
//     const bearerHeader = req.headers['authorization'];
//     if (typeof bearerHeader !== "undefined") {
//         const splitToken = bearerHeader.split(' ');
//         const token = splitToken[1];
//         jwt.verify(token, "SECRET_KEY", (err, authData) => {
//             if (err) {
//                 return resp.status(403).send("Token is expired or invalid");
//             } else {
//                 req.authData = authData;
//                 next();
//             }
//         });
//     } else {
//         resp.sendStatus(403);
//     }
// };


// app.post('/login', (req, resp) => {
//     const { email1, password1 } = req.body;
//     try {
//         const email = "fake123@gmail.com";
//         const password = "fake123@";
//         if (email !== email1 || password !== password1) {
//             return resp.send("Email or password is invalid");
//         }
//         const token = jwt.sign({ email: email1 }, "SECRET_KEY", { expiresIn: '2m' });
//         resp.send({ token: token });
//     } catch (error) {
//         resp.status(500).send(error.message);
//     }
// });



// app.get('/home', verifyMiddleware, (req, resp) => {
//     resp.send("Welcome to my world");
// });

// app.listen(8000, () => {
//     console.log("Server is running on http://localhost:8000");
// });



// access token and refresh token  ======

const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const userCredentials = {
    username: 'admin',
    password: 'admin123',
    email: 'admin@gmail.com'
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'jeeCredencials';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refreshCredencials';

let refreshTokens = []; // In a real application, store this in a database

// Middleware to authenticate access tokens
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Login route to generate tokens
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === userCredentials.username && password === userCredentials.password) {
        const accessToken = jwt.sign({ username }, ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
        const refreshToken = jwt.sign({ username }, REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

        refreshTokens.push(refreshToken); // Save the refresh token

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.json({ accessToken });
    } else {
        return res.status(406).json({
            message: 'Invalid credentials'
        });
    }
});

// Refresh token route to generate new access tokens
app.post('/refresh', (req, res) => {
    const refreshToken = req.cookies?.jwt;

    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = jwt.sign({ username: user.username }, ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
        return res.json({ accessToken });
    });
});

// Logout route to invalidate refresh token
app.post('/logout', (req, res) => {
    const refreshToken = req.cookies?.jwt;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
});

// Example protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

// Home route
app.get('/', (req, res) => {
    res.send("Server is running");
    console.log("Server running");
});

app.listen(8000, () => {
    console.log(`Server active on http://localhost:8000`);
});
