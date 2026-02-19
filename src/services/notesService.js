import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './FireBaseConfig';

const NOTES_COLLECTION = 'notes';

// Format date as YYYY-DD-MM (year-day-month)
export const formatNoteDate = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getFullYear();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${year}-${day}-${month}`;
};

// Get all notes by user id, sorted by creation date (newest first).
// Uses only where() so no Firestore composite index is needed; we sort in JavaScript.
export const getNotesByUserId = async (userId) => {
  const q = query(
    collection(db, NOTES_COLLECTION),
    where('userId', '==', userId)
  );
  const snapshot = await getDocs(q);
  const notes = snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() ?? data.createdAt,
    };
  });
  notes.sort((a, b) => {
    const tA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const tB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return tB - tA;
  });
  return notes;
};

//get a note by id
export const getNoteById = async (noteId) => {
  const ref = doc(db, NOTES_COLLECTION, noteId);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  const data = snapshot.data();
  return {
    id: snapshot.id,
    ...data,
    createdAt: data.createdAt?.toDate?.() ?? data.createdAt,
  };
};

//create a note
export const addNote = async ({ userId, title, body, noteDate, latitude, longitude, imageBase64 }) => {
  const data = {
    userId,
    title: title || '',
    body: body || '',
    noteDate: noteDate || formatNoteDate(new Date()),
    createdAt: serverTimestamp(),
    latitude: latitude ?? null,
    longitude: longitude ?? null,
    imageBase64: imageBase64 ?? null,
  };
  const ref = await addDoc(collection(db, NOTES_COLLECTION), data);
  return { id: ref.id, ...data };
};

//update a note
export const updateNote = async (noteId, { title, body, noteDate, latitude, longitude, imageBase64 }) => {
  const ref = doc(db, NOTES_COLLECTION, noteId);
  const data = { title: title ?? '', body: body ?? '' };
  if (noteDate != null) data.noteDate = noteDate;
  if (latitude != null) data.latitude = latitude;
  if (longitude != null) data.longitude = longitude;
  if (imageBase64 !== undefined) data.imageBase64 = imageBase64;
  await updateDoc(ref, data);
};

//delete a note
export const deleteNote = async (noteId) => {
  await deleteDoc(doc(db, NOTES_COLLECTION, noteId));
};
