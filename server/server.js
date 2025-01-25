const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// In-memory database
let users = [
    { id: uuidv4(), name: 'John Doe' },
    { id: uuidv4(), name: 'Jane Doe' },
];

// GET all users
app.get('/api/users/GetAll', (req, res) => {
    res.json(users);
});

// GET user by id
app.get('/api/users/Get/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// CREATE user
app.post('/api/users/Create', (req, res) => {
    const user = {
        id: uuidv4(),
        ...req.body,
    };
    users.push(user);
    res.status(201).json(user);
});

// UPDATE user
app.put('/api/users/Update/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        users[index] = {
            ...users[index],
            ...req.body,
            id: req.params.id,
        };
        res.json(users[index]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// DELETE user
app.delete('/api/users/Delete/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        users.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
