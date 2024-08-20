const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' }
];
const products = require('./products.js');

app.use('/products', products);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/users/:id',
    (req, res, next) => {
        res.set('turnell', 'was here');
        next()
    },
    (req, res) => {
        const turnell = res.get('turnell');
        const user = users.find(user => user.id === parseInt(req.params.id));
        if (!user) return res.status(404).send('User not found');
        res.send({ user, turnell });
    });



app.listen(3000, () => {
    console.log('Server listening on port 3000');
});