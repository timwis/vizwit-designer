const html = require('choo/html')
const css = require('sheetify')

const DomainDataset = require('./components/domain-dataset')
const Fields = require('./components/fields')
const ChartTypes = require('./components/chart-types')
const ChartSettings = require('./components/chart-settings')
const Export = require('./components/export')
const Preview = require('./components/preview')

css('bootstrap')
css('leaflet/dist/leaflet.css')
css('vizwit/src/styles/main.css')

module.exports = (state, prev, send) => {
  const areFieldsFetched = !!Object.keys(state.fields).length
  const fieldType = state.field ? state.fields[state.field].type : ''
  const config = constructConfig(state)

  return html`
    <div class="container">
      <h1>VizWit Designer</h1>
      ${DomainDataset(submitDomainDatasetCb)}
      ${areFieldsFetched ? Fields(state.fields, selectFieldCb) : ''}
      ${fieldType ? ChartTypes(fieldType, state.chartType, selectChartTypeCb) : ''}
      ${state.chartType ? ChartSettings(state.chartType, chartSettingsCb) : ''}
      ${state.chartType ? Preview(config) : ''}
      ${state.chartType ? Export(config) : ''}
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
  function constructConfig (state) {
    const config = {
      provider: 'cartodb',
      domain: state.domain,
      dataset: state.dataset,
      chartType: state.chartType,
      groupBy: state.field
    }
    if (fieldType === 'date') {
      config.groupBy = `date_trunc('month', ${state.field})`
      config.triggerField = state.field
    }
    Object.assign(config, state.settings)
    return config
  }
}
