export const prodConfig = {
  secrets: {
    jwt: process.env.PRODUCTION_JWT_SECRET
  },
  dbUrl: process.env.PRODUCTION_MONGO_URL
}
