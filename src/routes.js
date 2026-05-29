const express = require('express');
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
} = require('./notesService');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.get('/notes', (req, res) => {
  res.status(200).json(getAllNotes());
});

router.get('/notes/:id', (req, res) => {
  const note = getNoteById(req.params.id);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.status(200).json(note);
});

router.post('/notes', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const note = createNote(title, content);
  res.status(201).json(note);
});

router.put('/notes/:id', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const updatedNote = updateNote(req.params.id, title, content);

  if (!updatedNote) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.status(200).json(updatedNote);
});

router.delete('/notes/:id', (req, res) => {
  const deleted = deleteNote(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.status(200).json({ message: 'Note deleted successfully' });
});

module.exports = router;