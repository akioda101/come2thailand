const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MySQL_ROOT,
    database: 'checklist_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Get checklist items for a user and page
app.get('/api/checklist', (req, res) => {
    const { userId, pageId } = req.query;
    const sql = 'SELECT * FROM checklist_items WHERE user_id = ? AND page_id = ?';
    db.query(sql, [userId, pageId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Add a new checklist item
app.post('/api/checklist', (req, res) => {
    const { userId, pageId, itemId, text } = req.body;
    const sql = 'INSERT INTO checklist_items (user_id, page_id, item_id, text) VALUES (?, ?, ?, ?)';
    db.query(sql, [userId, pageId, itemId, text], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Item added');
    });
});

// Update a checklist item
app.put('/api/checklist/:id', (req, res) => {
    const { id } = req.params;
    const { checked } = req.body;
    const sql = 'UPDATE checklist_items SET checked = ? WHERE id = ?';
    db.query(sql, [checked, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Item updated');
    });
});

// Delete a checklist item
app.delete('/api/checklist/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM checklist_items WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Item deleted');
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});