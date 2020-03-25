export const testConfig = {
  secrets: {
    jwt: process.env.TESTING_JWT_SECRET
  },
  dbUrl: process.env.TESTING_MONGO_URL
}
