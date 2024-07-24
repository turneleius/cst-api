const express = require('express');
const app = express();

const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' }
];


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

// app.listen(3000);
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});