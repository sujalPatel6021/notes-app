const {
  resetNotes,
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
} = require('../src/notesService');

beforeEach(() => {
  resetNotes();
});

test('should create a note', () => {
  const note = createNote('Test Title', 'Test Content');

  expect(note.id).toBe(1);
  expect(note.title).toBe('Test Title');
  expect(note.content).toBe('Test Content');
});

test('should get all notes', () => {
  createNote('Note 1', 'Content 1');
  createNote('Note 2', 'Content 2');

  const notes = getAllNotes();
  expect(notes.length).toBe(2);
});

test('should get note by id', () => {
  const note = createNote('Single Note', 'Single Content');

  const found = getNoteById(note.id);
  expect(found.title).toBe('Single Note');
});

test('should update a note', () => {
  const note = createNote('Old Title', 'Old Content');

  const updated = updateNote(note.id, 'New Title', 'New Content');

  expect(updated.title).toBe('New Title');
  expect(updated.content).toBe('New Content');
});

test('should delete a note', () => {
  const note = createNote('Delete Me', 'Delete Content');

  const deleted = deleteNote(note.id);

  expect(deleted).toBe(true);
  expect(getAllNotes().length).toBe(0);
});