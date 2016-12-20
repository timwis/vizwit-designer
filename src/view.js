const html = require('choo/html')

const DomainDataset = require('./components/domain-dataset')
const Fields = require('./components/fields')
const ChartTypes = require('./components/chart-types')

module.exports = (state, prev, send) => {
  const fieldType = state.field ? state.fields[state.field].type : ''

  return html`
    <div class="container">
      <h1>VizWit Designer</h1>
      ${DomainDataset(submitDomainDatasetCb)}
      ${state.fields ? Fields(state.fields, selectFieldCb) : ''}
      ${fieldType ? ChartTypes(fieldType, state.chartType, selectChartTypeCb) : ''}
    </div>
  `
  function submitDomainDatasetCb (formData) {
    send('submitDomainDataset', formData)
  }
  function selectFieldCb (field) {
    send('setField', field)
  }
  function selectChartTypeCb (chartType) {
    send('setChartType', chartType)
  }
}
