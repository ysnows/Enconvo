import Stripe from 'stripe';
import * as jose from 'jose';
import { withAuth } from '@/utils/auth';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = {
  'standard': 'price_1PUnQhP5mwiRKlICpgeJUKFx',
  'premium': 'price_1PUnVqP5mwiRKlICIJJ5Z9kG',

  'monthly': 'price_1PUnZ5P5mwiRKlICwO3oKaJZ',
  'yearly': 'price_1PUnbcP5mwiRKlICBAdbINOS',
};

async function handler(req, res) {


  const { lookupKey } = req.body;
  const email = req.user.email

  try {
    // Create Checkout Sessions from body params.
    const priceId = PRICE_IDS[lookupKey];
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/pay_success?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/pay_success?canceled=true`,
      automatic_tax: { enabled: true },
      allow_promotion_codes: true,
      client_reference_id: email
    });

    res.json({ url: session.url });
    res.end();
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

export default withAuth(handler);