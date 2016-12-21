const html = require('choo/html')

module.exports = (state) => {
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

