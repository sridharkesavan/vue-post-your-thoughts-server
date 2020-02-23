// invoking the required libraries after installing
const express = require ('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const messages = require('./db/messages')

const app = express();  // invoking the express 

app.use(morgan('tiny'))  //Invoking logger to the app
app.use(cors());
app.use(bodyParser.json()); // parses the data sent from the client

app.get('/', (req, res) => {
    res.json({
        message: 'full stack message board'
    });
});

app.get('/messages', (req, res) => {
    messages.getAll().then((messages) => {
        res.json(messages);
    });
});

app.post('/messages', (req, res) => {
    console.log(req.body);
    messages.create(req.body).then((message) => {
        res.json(message);
    }).catch(err => {
        res.status(500);
        res.json(err);
    });
});


const port = process.env.PORT || 2609;
    app.listen(port, () => console.log(`listening on port ${port}!`));
