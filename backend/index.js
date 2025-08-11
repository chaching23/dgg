require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { auth, db } = require('./firebaseAdmin');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

// Signup route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }
  try {
    const userRecord = await auth.createUser({ email, password });

    // Optional: create user doc in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      email: userRecord.email,
      createdAt: new Date().toISOString(),
    });

    return res.status(201).json({ uid: userRecord.uid, email: userRecord.email });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Verify token route
app.post('/verifyToken', async (req, res) => {
  const { token } = req.body || {};
  if (!token) {
    return res.status(400).json({ error: 'token is required' });
  }
  try {
    const decodedToken = await auth.verifyIdToken(token);
    return res.json({ uid: decodedToken.uid, email: decodedToken.email || null });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on port ${PORT}`);
});


