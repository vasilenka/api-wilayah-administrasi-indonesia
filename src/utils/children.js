export const children = children => {
  if (
    children === 'kabupaten' ||
    children === 'kab' ||
    children === 'regency' ||
    children === 'kota' ||
    children === 'city'
  ) {
    return 'regency_id'
  } else if (
    children === 'kecamatan' ||
    children === 'kec' ||
    children === 'district'
  ) {
    return 'district_id'
  } else if (
    children === 'kelurahan' ||
    children === 'kel' ||
    children === 'desa' ||
    children === 'village'
  ) {
    return 'district_id'
  } else {
    return false
  }
}

export const getOneChildren = id => {
  console.log('INCOMING ID:', id)
  let prov, kab, kec, kel

  if (id.length === 2) {
    kab = { $regex: `^${id}` }
  } else if (id.length === 4) {
    prov = id.substring(0, 2)
    kec = { $regex: `^${id}` }
  } else if (id.length === 6) {
    prov = id.substring(0, 2)
    kab = id.substring(0, 4)
    kel = { $regex: `^${id}` }
  } else if (id.length === 10) {
    prov = id.substring(0, 2)
    kab = id.substring(0, 4)
    kec = id.substring(0, 6)
  }

  return {
    prov,
    kab,
    kec,
    kel
  }
}

export const getAllChildren = id => {
  console.log('INCOMING ID:', id)
  let prov, kab, kec, kel

  if (id.length === 2) {
    kab = { $regex: `^${id}` }
    kec = { $regex: `^${id}` }
    kel = { $regex: `^${id}` }
  } else if (id.length === 4) {
    prov = id.substring(0, 2)
    kec = { $regex: `^${id}` }
    kel = { $regex: `^${id}` }
  } else if (id.length === 6) {
    prov = id.substring(0, 2)
    kab = id.substring(0, 4)
    kel = { $regex: `^${id}` }
  } else if (id.length === 10) {
    prov = id.substring(0, 2)
    kab = id.substring(0, 4)
    kec = id.substring(0, 6)
  }

  return {
    prov,
    kab,
    kec,
    kel
  }
}
