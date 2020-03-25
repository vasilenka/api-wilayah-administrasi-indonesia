import { Schema, model } from 'mongoose'

const provinceSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  }
})

export const Province = model('provinces', provinceSchema)
