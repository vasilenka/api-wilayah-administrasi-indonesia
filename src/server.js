import 'dotenv/config'

import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import { connect } from './utils/db'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.status(200).send({
    welcome: 'to wilayah administrasi indonesia'
  })
})

app.use('/provinsi', require('./resources/province/province.router'))
app.use('/province', require('./resources/province/province.router'))
app.use('/prov', require('./resources/province/province.router'))

app.use('/kabupaten', require('./resources/regency/regency.router'))
app.use('/kab', require('./resources/regency/regency.router'))
app.use('/regency', require('./resources/regency/regency.router'))
app.use('/kota', require('./resources/regency/regency.router'))
app.use('/city', require('./resources/regency/regency.router'))

app.use('/kecamatan', require('./resources/district/district.router'))
app.use('/kec', require('./resources/district/district.router'))
app.use('/district', require('./resources/district/district.router'))

app.use('/kelurahan', require('./resources/village/village.router'))
app.use('/kel', require('./resources/village/village.router'))
app.use('/desa', require('./resources/village/village.router'))
app.use('/village', require('./resources/village/village.router'))

export const start = async () => {
  try {
    await connect()
      .then(() => {
        console.log('CONNECTED TO DATABASE')
      })
      .catch(err => {
        console.log('FAILED CONNECTING TO DB')
        console.log('ERROR: ', err)
      })
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}`)
    })
  } catch (e) {
    console.error('ERROR: ', e)
  }
}
