# API Wilayah Administrasi Indonesia

> Based on Peraturan Mendagri No.72 tahun 2019

There're 2 endpoints available to access this API, they're

- https://main-api-wil-stjyl7jyh7qj8vgu-gtw.qovery.io
- https://twilight-frost-2680.fly.dev


## Endpoints

All `ID` here is the `id` properties of the object, NOT the `_id` one

Routes | Description
------------ | ------------
`/prov` | Get All Provinces
`/kab` | Get All Kabupaten & Kota
`/prov/\[PROV_ID]` | Get Province's data and all Kab/Kota in the Province
`/kab/\[KABUPATEN_ID/KOTA_ID]` | Get Kab/Kota's data and all Kecamatan in the Kab/Kota
`/kec/\[KECAMATAN_ID]` | Get Kecamatan's data and all Kelurahan/Desa in the Kecamatan