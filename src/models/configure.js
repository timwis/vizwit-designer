const xhr = require('xhr')
const parallel = require('run-parallel')

module.exports = {
  namespace: 'configure',
  state: {
    fields: {},
    field: '', // which field is selected
    provider: 'cartodb',
    domain: '',
    dataset: '',
    chartType: '',
    settings: {} // chartType-specific extras
  },
  reducers: {
    setDomainDataset: (state, formData) => formData,
    receiveFields: (state, fields) => ({ fields }),
    setField: (state, field) => ({ field, chartType: '', settings: {} }),
    setChartType: (state, chartType) => ({ chartType, settings: {} }),
    setChartSettings: (state, settings) => ({ settings })
  },
  effects: {
    submitDomainDataset: (state, formData, send, done) => {
      parallel([
        (cb) => send('configure:setDomainDataset', formData, cb),
        (cb) => send('configure:getFields', formData, cb)
      ], done)
    },
    getFields: (state, formData, send, done) => {
      const { domain, dataset } = formData
      const query = `SELECT * FROM ${dataset} LIMIT 0`
      const url = `https://${domain}/api/v2/sql?q=${encodeURIComponent(query)}`

      xhr(url, { json: true }, (err, resp, body) => {
        if (err) return done(new Error('Failed to fetch fields'))
        send('configure:receiveFields', body.fields, done)
      })
    }
  }
}
