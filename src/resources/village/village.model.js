import { Schema, model } from 'mongoose'

const villageSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  district_id: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  }
})

export const Village = model('villages', villageSchema)
