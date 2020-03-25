import mongoose from 'mongoose'
import options from '../config'

export const connect = (
  url = options.dbUrl,
  opts = {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  }
) => {
  // console.log('URL: ', url)
  return mongoose.connect(url, { ...opts, useNewUrlParser: true })
}
