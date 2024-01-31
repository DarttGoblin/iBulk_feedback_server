const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 10000;
var myPassword = "oriolukxhzzakbrq";

app.use(express.json())
app.use(express.text())
app.use(cors({origin: "*"}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post("/", (req, res) => {
    var userFeedback = req.body.submittedFeedback; 
    let resObject = {};

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'yassine.bazgour@gmail.com',
          pass: myPassword
        }
    });
    
    var mailOptions = {
        from: 'yassine.bazgour@gmail.com',
        to: 'yassine.bazgour@gmail.com',
        subject: 'iBulk feedback',
        html: 
        `
            <html>
            <head>
                <style>
                    body {font-family: 'Arial', 'Helvetica', sans-serif; background-color: grey; color: #333; margin: 0; padding: 20px;}
                    .container {max-width: 600px;}
                    h1 {color: black;}
                    p {margin-bottom: 15px; line-height: 1.6;}
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>iBulk Feedback</h1>
                    <p>${userFeedback}</p>
                </div>
            </body>
        </html>
        `
    };

    try {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                resObject.success = false;
                resObject = { success: false, error: "Error sending email." };
            } else {
                console.log('Email sent: ' + info.response);
                resObject.success = true;
                console.log(resObject);
            }
            res.send(resObject);
        });
    }
    catch (error) {console.log(error);}
});

app.listen(port, () => console.log("Listening on port " + port));
