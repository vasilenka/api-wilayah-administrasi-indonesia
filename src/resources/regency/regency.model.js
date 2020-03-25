import { Schema, model } from 'mongoose'

const regencySchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  province_id: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  }
})

export const Regency = model('regencies', regencySchema)
