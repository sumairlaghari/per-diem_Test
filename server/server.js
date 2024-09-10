const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { LocalStorage } = require('node-localstorage');

// Initialize local storage
const localStorage = new LocalStorage('./accounts');

// Initialize Express
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Signup endpoint
app.post('/signup', (req, res) => {
    const { email, password, confirmPassword } = req.body;

    // Check if all fields are provided
    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if the account already exists
    const existingAccount = localStorage.getItem(email);
    if (existingAccount) {
        return res.status(400).json({ message: 'Account already exists' });
    }

    // Save account to local storage
    const account = { email, password };
    localStorage.setItem(email, JSON.stringify(account));

    res.status(200).json({ message: 'Account created successfully' });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the account exists
    const storedAccount = localStorage.getItem(email);
    if (!storedAccount) {
        return res.status(404).json({ message: 'Account does not exist' });
    }

    // Parse the account and verify the password
    const account = JSON.parse(storedAccount);
    if (account.password !== password) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
