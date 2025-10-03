import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your-stripe-publishable-key-here'
);

export default stripePromise;