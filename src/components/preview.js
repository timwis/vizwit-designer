const html = require('choo/html')
const css = require('sheetify')
const vizwit = require('vizwit')
const widget = require('cache-element/widget')

const vw = VizWit()

module.exports = (config) => {
  return vw(config)
}

const prefix = css`
  :host, :host > div {
    height: 230px;
  }
`

function VizWit () {
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
  try {
    vizwit.init(el, config)
  } catch (err) {
    console.error(err)
  }
}
