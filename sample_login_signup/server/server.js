const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const userList = [
    {
        userName: "test",
        password: "test123"
    }
];

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

app.post('/login', cors(), (req, res) => {

    const input = req.body;
    const foundIndex = userList.findIndex(userObj => (userObj.userName === input.userName &&
        userObj.password === input.password));

    if (foundIndex !== -1) {
        res.json({
            isValid: true
        });
    } else {
        res.json({
            isValid: false,
            error: {
                apiFailure: 'UserName or Password Invalid'
            }
        });
    }
});

app.post('/register', cors(), (req, res) => {

    const input = req.body;
    const foundIndex = userList.findIndex(userObj => userObj.userName === input.userName);

    if (foundIndex !== -1) {
        res.json({
            isValid: false,
            error: {
                apiFailure: 'User already exist'
            }
        });
    } else {
        userList.push({
            ...input
        });
        res.json({
            isValid: true
        });
    }
});

app.get('/home', cors(), (req, res) => {
    const userName = req.query['username'];

    const foundIndex = userList.findIndex(userObj => userObj.userName === userName);

    res.json(userList[foundIndex]);
});

app.listen(3001, () => {
    console.log('Server listening on 3001 !');
});