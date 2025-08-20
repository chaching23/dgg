require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { auth, db } = require('./firebaseAdmin');

const app = express();
app.use(cors());
app.use(express.json());
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

// Create Stripe Checkout Session for adding money
app.post('/payments/create-checkout-session', async (req, res) => {
  try {
    const { amount = 1000, currency = 'usd', customer_email } = req.body || {};
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            unit_amount: Number(amount),
            product_data: { name: 'Wallet top-up' },
          },
          quantity: 1,
        },
      ],
      success_url: (process.env.CHECKOUT_SUCCESS_URL || 'myapp://stripe/success') + '?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: process.env.CHECKOUT_CANCEL_URL || 'myapp://stripe/cancel',
      customer_email,
    });
    res.json({ id: session.id, url: session.url });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on port ${PORT}`);
});


