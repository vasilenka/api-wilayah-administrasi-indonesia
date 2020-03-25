import { children, getAllChildren, getOneChildren } from './children'
import { Province } from './../resources/province/province.model'
import { Regency } from './../resources/regency/regency.model'
import { District } from './../resources/district/district.model'
import { Village } from './../resources/village/village.model'

export const getById = model => async (req, res) => {
  try {
    let { prov, kab, kec, kel } = getOneChildren(req.params.id)

    let promises = [
      model
        .findOne({ id: req.params.id })
        .lean()
        .exec(),
      Province.find({ id: prov })
        .lean()
        .exec(),
      Regency.find({ id: kab })
        .lean()
        .exec(),
      District.find({ id: kec })
        .lean()
        .exec(),
      Village.find({ id: kel })
        .lean()
        .exec()
    ]

    let results
    try {
      results = await Promise.all(promises)
    } catch (err) {
      console.log('ERROR GET ALL: ', err)
      return res.status(400).send(err)
    }

    const doc = results[0]
    const provinsi = results[1].length > 0 ? results[1] : undefined
    const kabupaten = results[2].length > 0 ? results[2] : undefined
    const kecamatan = results[3].length > 0 ? results[3] : undefined
    const kelurahan = results[4].length > 0 ? results[4] : undefined

    res.status(200).json({
      data: doc,
      provinsi,
      kabupaten,
      kecamatan,
      kelurahan
    })
  } catch (e) {
    console.error(e)
    res.status(400).send(e)
  }
}

export const getAll = model => async (req, res) => {
  try {
    const docs = await model
      .find()
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).send(e)
  }
}

export const getComplete = model => async (req, res) => {
  try {
    let { prov, kab, kec, kel } = getAllChildren(req.params.id)

    let promises = [
      model
        .findOne({ id: req.params.id })
        .lean()
        .exec(),
      Province.find({ id: prov })
        .lean()
        .exec(),
      Regency.find({ id: kab })
        .lean()
        .exec(),
      District.find({ id: kec })
        .lean()
        .exec(),
      Village.find({ id: kel })
        .lean()
        .exec()
    ]

    let results
    try {
      results = await Promise.all(promises)
    } catch (err) {
      console.log('ERROR GET ALL: ', err)
      return res.status(400).send(err)
    }

    const doc = results[0]
    const provinsi = results[1].length > 0 ? results[1] : undefined
    const kabupaten = results[2].length > 0 ? results[2] : undefined
    const kecamatan = results[3].length > 0 ? results[3] : undefined
    const kelurahan = results[4].length > 0 ? results[4] : undefined

    res.status(200).json({
      data: doc,
      provinsi,
      kabupaten,
      kecamatan,
      kelurahan
    })
  } catch (e) {
    console.error(e)
    res.status(400).send(e)
  }
}

export const crudControllers = model => ({
  getById: getById(model),
  getAll: getAll(model),
  getComplete: getComplete(model)
})
