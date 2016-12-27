const html = require('choo/html')
const css = require('sheetify')
const vizwit = require('vizwit')

const prefix = css`
  :host, :host > div {
    height: 230px;
  }
  :host > div > .card {
    padding-top: 0;
  }
`
module.exports = () => {
  let mountedEl

  return function (config) {
    const tree = html`
      <div class=${prefix}>
        <div class="preview-container" onload=${onLoad} onunload=${onUnload}></div>
      </div>
    `

    if (mountedEl) {
      console.log('reloading', mountedEl)
      tryVizwit(mountedEl, config)
    }

    return tree

    function onLoad (el) {
      console.log('onLoad', el)
      mountedEl = el
      tryVizwit(el, config)
    }
    function onUnload (el) {
      console.log('onUnload', el)
      mountedEl = null
    }
  }
}

function tryVizwit (el, config) {
  const configCopy = Object.assign({}, config) // vizwit mutates config
  try {
    vizwit.init(el, configCopy)
  } catch (err) {
    console.error(err)
  }
}
