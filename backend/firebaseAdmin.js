const admin = require('firebase-admin');
const path = require('path');

// Allow overriding service account path via env, default to local file
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, 'serviceAccountKey.json');
// Lazy load to give a clearer error if missing
let serviceAccount;
try {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  serviceAccount = require(serviceAccountPath);
} catch (error) {
  throw new Error(
    `Missing Firebase service account JSON at ${serviceAccountPath}. Download it from Firebase Console > Project Settings > Service Accounts.`,
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL || `https://${serviceAccount.project_id}.firebaseio.com`,
  });
}

const auth = admin.auth();
const db = admin.firestore();

module.exports = { admin, auth, db };


