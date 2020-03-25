import { Schema, model } from 'mongoose'

const districtSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  regency_id: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  }
})

export const District = model('districts', districtSchema)
