const request = require('supertest');
const app = require('../src/app');
const { resetNotes } = require('../src/notesService');

beforeEach(() => {
  resetNotes();
});

test('GET /health should return status ok', async () => {
  const res = await request(app).get('/health');

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe('ok');
});

test('POST /notes should create a note', async () => {
  const res = await request(app)
    .post('/notes')
    .send({ title: 'API Note', content: 'API Content' });

  expect(res.statusCode).toBe(201);
  expect(res.body.title).toBe('API Note');
});

test('GET /notes should return all notes', async () => {
  await request(app)
    .post('/notes')
    .send({ title: 'Note 1', content: 'Content 1' });

  const res = await request(app).get('/notes');

  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBe(1);
});

test('PUT /notes/:id should update a note', async () => {
  const created = await request(app)
    .post('/notes')
    .send({ title: 'Old', content: 'Old Content' });

  const res = await request(app)
    .put(`/notes/${created.body.id}`)
    .send({ title: 'Updated', content: 'Updated Content' });

  expect(res.statusCode).toBe(200);
  expect(res.body.title).toBe('Updated');
});

test('DELETE /notes/:id should delete a note', async () => {
  const created = await request(app)
    .post('/notes')
    .send({ title: 'Delete', content: 'Delete Content' });

  const res = await request(app).delete(`/notes/${created.body.id}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe('Note deleted successfully');
});