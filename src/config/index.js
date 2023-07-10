module.exports = {
  server: { port: process.env.PORT },
  db: { dbUri: process.env.DB_URI },
  jwtConf: { secret: process.env.JWT_SECRET },
  stripeConf: {
    stripe_secret: process.env.STRIPE_SECRET_KEY,
    stripe_publishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
  },
};
