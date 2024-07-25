const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { createClient } = require('@supabase/supabase-js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' }
];

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.send(user);
});

app.get('/products', async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select()
    res.send({ data });
});

app.get('/products/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select()
        .is('id', req.params.id)
    res.send({ data });
});

app.post('/products', async (req, res) => {
    const { error } = await supabase
        .from('products')
        .insert({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        })
    if (error) {
        res.send({ error });
    }
    res.send({ msg: "created!!" });
});

app.put('/products/:id', async (req, res) => {
    const { error } = await supabase
        .from('products')
        .update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        })
        .eq('id', req.params.id)
    if (error) {
        res.send({ error });
    }
    res.send({ msg: "updated!!" });
});

app.delete('/products/:id', async (req, res) => {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send({ msg: "deleted!!" })

});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});