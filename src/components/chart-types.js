const html = require('choo/html')

const chartTypes = {
  bar: {
    title: 'Bar chart',
    description: 'Columns that represent categorical data',
    validFieldTypes: ['string']
  },
  pie: {
    title: 'Pie chart',
    description: 'Slices that represent categorical data',
    validFieldTypes: ['string']
  },
  datetime: {
    title: 'Date/time chart',
    description: 'An area chart representing temporal categories',
    validFieldTypes: ['date']
  },
  choropleth: {
    title: 'Choropleth map',
    description: 'A map with polygon colors scaled based on a value',
    validFieldTypes: ['geometry']
  }
}

module.exports = (fieldType, selectedType, cb) => {
  const validChartTypes = getValidChartTypes(fieldType)
  return html`
    <div class="card-columns">
      ${validChartTypes.map(ChartCard)}
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
