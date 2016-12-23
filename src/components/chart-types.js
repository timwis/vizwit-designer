const html = require('choo/html')
const css = require('sheetify')

const chartTypes = require('../config')

const prefix = css`
  :host .card {
    cursor: pointer;
  }
`

module.exports = (fieldType, selectedType, cb) => {
  const validChartTypes = getValidChartTypes(fieldType)
  return html`
    <div class="${prefix} card-columns">
      ${validChartTypes.length
        ? validChartTypes.map(ChartCard)
        : 'No chart types available for this field'}
    </div>
  `
  function ChartCard (chartType) {
    const chart = chartTypes[chartType]
    const cardClasses = ['card']
    if (selectedType === chartType) {
      cardClasses.push('card-inverse', 'card-primary')
    }

    return html`
      <div class=${cardClasses.join(' ')} onclick=${onClick}>
        <div class="card-block">
          <h4 class="card-title">
            ${chart.title}
          </h4>
          <p class="card-text">
            ${chart.description}
          </p>
        </div>
      </div>
    `
    function onClick (e) {
      if (cb) {
        cb(chartType)
      }
    }
  }
}

function getValidChartTypes (fieldType) {
  const validChartTypes = []
  for (let chartType in chartTypes) {
    const validFieldTypes = chartTypes[chartType].validFieldTypes
    if (validFieldTypes.indexOf(fieldType) !== -1) {
      validChartTypes.push(chartType)
    }
  }
  return validChartTypes
}
