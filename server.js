const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3005;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

let notes = require("./db/db.json");

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {id:notes.length + 1, title, text };
    notes.push(newNote);
    res.sendStatus(201);
  } else {
    res.status(400).send('Both title and text are required.');
  }
});

app.delete("/api/notes/:id",(req, res)=>{
  const id = req.params.id 
  
  const newNotes = notes.filter(n => n.id != id)
  notes = newNotes
  //console.log(notes)
  res.json({data:notes})
})

app.listen(PORT, () => {
  console.log(` http://localhost:${PORT}`);
});
