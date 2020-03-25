import { merge } from 'lodash'
const env = process.env.NODE_ENV || 'development'

import { devConfig } from './dev'
import { prodConfig } from './prod'
import { testConfig } from './testing'

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: process.env.PORT || 3000,
  secrets: {
    jwt: process.env.DEVELOPMENT_JWT_SECRET,
    jwtExp: '100d'
  }
}

let envConfig = {}

switch (env) {
  case 'dev':
  case 'development':
    envConfig = devConfig
    break

  case 'test':
  case 'testing':
    envConfig = testConfig
    break

  case 'prod':
  case 'production':
    envConfig = prodConfig
    break

  default:
    envConfig = devConfig
}

export default merge(baseConfig, envConfig)
