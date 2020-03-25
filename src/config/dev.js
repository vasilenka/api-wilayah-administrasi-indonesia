// require('dotenv').config()

export const devConfig = {
  secrets: {
    jwt: process.env.DEVELOPMENT_JWT_SECRET
  },
  dbUrl: process.env.DEVELOPMENT_MONGO_URL
}
