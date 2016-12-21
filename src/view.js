const html = require('choo/html')

const DomainDataset = require('./components/domain-dataset')
const Fields = require('./components/fields')
const ChartTypes = require('./components/chart-types')
const ChartSettings = require('./components/chart-settings')

module.exports = (state, prev, send) => {
  const fieldType = state.field ? state.fields[state.field].type : ''

  return html`
    <div class="container">
      <h1>VizWit Designer</h1>
      ${DomainDataset(submitDomainDatasetCb)}
      ${state.fields ? Fields(state.fields, selectFieldCb) : ''}
      ${fieldType ? ChartTypes(fieldType, state.chartType, selectChartTypeCb) : ''}
      ${state.chartType ? ChartSettings(state.chartType, chartSettingsCb) : ''}
      ${state.chartType ? Export() : ''}
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
  function chartSettingsCb (settings) {
    send('setChartSettings', settings)
  }
  function Export () {
    const config = {
      provider: 'cartodb',
      domain: state.domain,
      dataset: state.dataset,
      chartType: state.chartType,
      groupBy: state.field
    }
    if (state.fields[state.field].type === 'date') {
      config.groupBy = `date_trunc('month', ${state.field})`
      config.triggerField = state.field
    }
    Object.assign(config, state.settings)

    return html`
      <pre>
${JSON.stringify(config, null, 2)}
      </pre>
    `
  }
}
