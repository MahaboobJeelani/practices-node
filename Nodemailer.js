const nodemailer = require('nodemailer');
const express = require('express');

const app = express()

app.post('/sendmail', (req, resp) => {
    const mailsend = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: "luckyjoy765@gmail.com",
            pass: "rkwm odwi miwy pntv"
        }
    }); 
    const recevier = {
        from: 'luckyjoy765@gmail.com',
        to: 'luckyjoy765@gmail.com',
        subject: "node js mail test",
        text: "Hello this is text mail from the merchant Application"
    }
    mailsend.sendMail(recevier, (err, emailResponse) => {
        if (err) resp.send(err);
        console.log(emailResponse);
        resp.end();
    })
})

app.listen(4000, () => {
    console.log("server running 4000");
})


