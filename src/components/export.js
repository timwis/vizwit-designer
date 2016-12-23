const html = require('choo/html')

module.exports = (config) => {
  return html`
    <pre>
${JSON.stringify(config, null, 2)}
    </pre>
  `
}

