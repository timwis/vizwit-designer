const xhr = require('xhr')
const parallel = require('run-parallel')

module.exports = {
  state: {
    fields: [],
    field: '', // which field is selected
    domain: '',
    dataset: '',
    chartType: ''
  },
  reducers: {
    setDomainDataset: (state, formData) => formData,
    receiveFields: (state, fields) => ({ fields }),
    setField: (state, field) => ({ field }),
    setChartType: (state, chartType) => ({ chartType })
  },
  effects: {
    submitDomainDataset: (state, formData, send, done) => {
      parallel([
        (cb) => send('setDomainDataset', formData, cb),
        (cb) => send('getFields', formData, cb)
      ], done)
    },
    getFields: (state, formData, send, done) => {
      const { domain, dataset } = formData
      const query = `SELECT * FROM ${dataset} LIMIT 0`
      const url = `https://${domain}/api/v2/sql?q=${encodeURIComponent(query)}`

      xhr(url, { json: true }, (err, resp, body) => {
        if (err) return done(new Error('Failed to fetch fields'))
        send('receiveFields', body.fields, done)
      })
    }
  }
}
