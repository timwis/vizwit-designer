const html = require('choo/html')
const css = require('sheetify')
const pick = require('ramda/src/pick')

const DomainDataset = require('../components/domain-dataset')
const Fields = require('../components/fields')
const ChartTypes = require('../components/chart-types')
const ChartSettings = require('../components/chart-settings')
const Preview = require('../components/preview')

css('bootstrap')
css('leaflet/dist/leaflet.css')
css('vizwit/src/styles/main.css')

module.exports = (state, prev, send) => {
  const config = state.configure
  const areFieldsFetched = !!Object.keys(config.fields).length
  const fieldType = config.field ? config.fields[config.field].type : ''
  const serialized = serialize(config)

  return html`
    <div class="container">
      <h1>VizWit Designer</h1>
      ${DomainDataset(submitDomainDatasetCb)}
      ${areFieldsFetched ? Fields(config.fields, selectFieldCb) : ''}
      ${fieldType ? ChartTypes(fieldType, config.chartType, selectChartTypeCb) : ''}
      ${config.chartType ? ChartSettings(config.chartType, chartSettingsCb) : ''}
      ${config.chartType ? Preview(serialized) : ''}
      ${config.chartType ? SaveButton(saveCb) : ''}
    </div>
  `
  function submitDomainDatasetCb (formData) {
    send('configure:submitDomainDataset', formData)
  }
  function selectFieldCb (field) {
    send('configure:setField', field)
  }
  function selectChartTypeCb (chartType) {
    send('configure:setChartType', chartType)
  }
  function chartSettingsCb (settings) {
    send('configure:setChartSettings', settings)
  }
  function SaveButton (clickCb) {
    return html`<button class="btn btn-primary" onclick=${clickCb}>Save</button>`
  }
  function saveCb () {
    const payload = {
      config: serialized,
      row: state.location.params.row,
      column: state.location.params.column
    }
    send('layout:setCard', payload)
    send('location:set', '/')
  }

  function serialize (state) {
    // Derive vizwit-ready configuration object from state.configure
    const config = pick(['provider', 'domain', 'dataset', 'chartType'], state)

    if (fieldType === 'date') {
      config.groupBy = `date_trunc('month', ${state.field})`
      config.triggerField = state.field
    } else {
      config.groupBy = state.field
    }

    Object.assign(config, state.settings)
    return config
  }
}
