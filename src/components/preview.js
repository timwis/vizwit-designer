const html = require('choo/html')
const css = require('sheetify')
const vizwit = require('vizwit')
const widget = require('cache-element/widget')

const prefix = css`
  :host, :host > div {
    height: 230px;
  }
  :host > div > .card {
    padding-top: 0;
  }
`

module.exports = function Preview () {
  return widget({
    render: function (config) {
      return html`
        <div class=${prefix}>
          <div
            class="preview-container"
            onload=${(el) => tryVizwit(el, config)}>
          </div>
        </div>
      `
    },
    onupdate: function (el, config) {
      const previewContainer = el.querySelector('.preview-container')
      tryVizwit(previewContainer, config)
    }
  })
}

function tryVizwit (el, config) {
  const configCopy = Object.assign({}, config) // vizwit mutates config
  try {
    vizwit.init(el, configCopy)
  } catch (err) {
    console.error(err)
  }
}
