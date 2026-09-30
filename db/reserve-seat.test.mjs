import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { drizzle } from 'drizzle-orm/sqlite-proxy';
import { reserveSeat, validAttendees } from './reserve-seat.ts';

function fixture() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec(readFileSync(new URL('../drizzle/0000_initial.sql', import.meta.url), 'utf8'));
  sqlite.exec("ALTER TABLE reservations ADD COLUMN child_gender TEXT; ALTER TABLE reservations ADD COLUMN progress TEXT NOT NULL DEFAULT 'reserved'");
  const db = drizzle(async (query, params) => {
    const stmt = sqlite.prepare(query);
    stmt.setReturnArrays(true);
    return { rows: stmt.all(...params) };
  });
  let code = 0;
  const book = (attendees, slotId = 'slot') => reserveSeat(db, {
    code: `test-${++code}`, slotId, track: '신규생', sessionId: '5-1',
    date: '2026-12-07', time: '10:00', parentName: 'test', phone: 'test',
    childName: 'test', childAge: '5세', childGender: 'test', childYear: '5-1', attendees,
  }, 4);
  return { sqlite, book };
}

test('two families of two fill four seats; further bookings are rejected', async () => {
  const { sqlite, book } = fixture();
  try {
    assert.equal((await book(2))[0].attendees, 2);
    assert.equal((await book(2)).length, 1);
    assert.equal((await book(1)).length, 0);
    assert.equal((await book(2)).length, 0);
    assert.equal((await book(1, 'other-slot')).length, 1);
  } finally { sqlite.close(); }
});

test('competing requests for the final seat admit only one', async () => {
  const { sqlite, book } = fixture();
  try {
    await book(3);
    const results = await Promise.all(Array.from({ length: 20 }, () => book(1)));
    assert.equal(results.flat().length, 1);
    assert.equal(sqlite.prepare('SELECT SUM(attendees) AS seats FROM reservations').get().seats, 4);
  } finally { sqlite.close(); }
});

test('cancellation releases seats and an already overbooked slot stays closed', async () => {
  const { sqlite, book } = fixture();
  try {
    await book(4);
    sqlite.exec("UPDATE reservations SET status = 'cancelled'");
    await book(2);
    sqlite.exec("UPDATE reservations SET attendees = 5 WHERE status = 'confirmed'");
    assert.equal((await book(1)).length, 0);
    assert.equal(sqlite.prepare('SELECT COUNT(*) AS count FROM reservations').get().count, 2);
  } finally { sqlite.close(); }
});

test('attendee count must be a positive integer within capacity', () => {
  for (const value of [undefined, null, '2', 0, -1, 1.5, NaN, Infinity, 5, true]) {
    assert.equal(validAttendees(value, 4), false);
  }
  assert.equal(validAttendees(1, 4), true);
  assert.equal(validAttendees(2, 4), true);
  assert.equal(validAttendees(2, 1), false);
});
