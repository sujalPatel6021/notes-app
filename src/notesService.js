let notes = [];
let currentId = 1;

function resetNotes() {
  notes = [];
  currentId = 1;
}

function getAllNotes() {
  return notes;
}

function getNoteById(id) {
  return notes.find((note) => note.id === Number(id));
}

function createNote(title, content) {
  const note = {
    id: currentId++,
    title,
    content
  };
  notes.push(note);
  return note;
}

function updateNote(id, title, content) {
  const note = getNoteById(id);
  if (!note) return null;

  note.title = title;
  note.content = content;
  return note;
}

function deleteNote(id) {
  const index = notes.findIndex((note) => note.id === Number(id));
  if (index === -1) return false;

  notes.splice(index, 1);
  return true;
}

module.exports = {
  resetNotes,
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
};