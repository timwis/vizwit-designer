const html = require('choo/html')
const css = require('sheetify')

const DomainDataset = require('../components/domain-dataset')
const Fields = require('../components/fields')
const ChartTypes = require('../components/chart-types')
const ChartSettings = require('../components/chart-settings')
const Export = require('../components/export')
const Preview = require('../components/preview')

css('bootstrap')
css('leaflet/dist/leaflet.css')
css('vizwit/src/styles/main.css')

module.exports = (state, prev, send) => {
  const areFieldsFetched = !!Object.keys(state.card.fields).length
  const fieldType = state.card.field ? state.card.fields[state.card.field].type : ''
  const config = constructConfig(state.card)

  return html`
    <div class="container">
      <h1>VizWit Designer</h1>
      ${DomainDataset(submitDomainDatasetCb)}
      ${areFieldsFetched ? Fields(state.card.fields, selectFieldCb) : ''}
      ${fieldType ? ChartTypes(fieldType, state.card.chartType, selectChartTypeCb) : ''}
      ${state.card.chartType ? ChartSettings(state.card.chartType, chartSettingsCb) : ''}
      ${state.card.chartType ? Preview(config) : ''}
      ${state.card.chartType ? Export(config) : ''}
    </div>
  `
  function submitDomainDatasetCb (formData) {
    send('card:submitDomainDataset', formData)
  }
  function selectFieldCb (field) {
    send('card:setField', field)
  }
  function selectChartTypeCb (chartType) {
    send('card:setChartType', chartType)
  }
  function chartSettingsCb (settings) {
    send('card:setChartSettings', settings)
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
