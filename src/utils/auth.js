import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.secrets.jwt,
    {
      expiresIn: config.secrets.jwtExp
    }
  )
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const validateToken = async (req, res) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).send({
      message: 'access forbidden'
    })
  }

  const token = bearer.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).send({
      message: 'access forbidden'
    })
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec()

  if (!user) {
    return res.status(401).send({
      message: 'access forbidden'
    })
  }

  res.status(200).json({ token, user })
}

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' })
  }

  try {
    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (e) {
    return res.status(500).end()
  }
}

export const adminSignup = async (req, res) => {
  try {
    await User.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin'
    })
    return res.status(201).send({
      message: 'admin account created'
    })
  } catch (e) {
    return res.status(500).end()
  }
}

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' })
  }

  const invalid = { message: 'Invalid email and password combination' }

  try {
    const user = await User.findOne({ email: req.body.email })
      .select('email password role')
      .exec()

    if (!user) {
      return res.status(401).send(invalid)
    }

    const match = await user.checkPassword(req.body.password)

    if (!match) {
      return res.status(401).send(invalid)
    }

    const token = newToken(user)
    return res
      .status(201)
      .send({ token, user: { email: user.email, role: user.role } })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).send({
      message: 'access forbidden'
    })
  }

  const token = bearer.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).send({
      message: 'access forbidden'
    })
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec()

  if (!user) {
    return res.status(401).send({
      message: 'access forbidden'
    })
  }

  req.user = user
  next()
}
