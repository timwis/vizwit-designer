const html = require('choo/html')
const css = require('sheetify')
const dragula = require('dragula')

css('dragula/dist/dragula.css')

const prefix = css`
  :host .flex-row {
    min-height: 100px;
    border: 1px #777 dashed;
    display: flex;
  }
  :host .flex-column {
    min-height: 100px;
    border: 1px black solid;
    flex: 1;
    overflow-x: hidden;
  }
  :host .add-button {
    margin: 0 auto;
  }
`

module.exports = (state, prev, send) => {
  const nextRowIndex = state.layout.rows.length
  let dragArea

  return html`
    <div class="${prefix} container" onload=${onLoad} onunload=${onUnload}>
      <h1>VizWit Layout</h1>

      ${state.layout.rows.map(Row)}

      <div class="flex-row empty-row" data-row-index=${nextRowIndex}>
        <a href="/configure" class="btn btn-secondary add-button">Add card</a>
      </div>

      <pre>
${JSON.stringify(state.layout.rows, null, 2)}
      </pre>
    </div>
  `

  function onLoad (el) {
    // workaround for bug https://github.com/shama/bel/issues/61
    const elFix = document.querySelector(`.${prefix}`)
    const rowEls = Array.from(elFix.querySelectorAll('.flex-row'))
    dragArea = dragula(rowEls)
    dragArea.on('drop', dragDropCallback)
  }

  function onUnload (el) {
    dragArea.destroy()
  }

  function dragDropCallback (el, target, source, sibling) {
    const from = {
      row: +source.getAttribute('data-row-index'),
      index: +el.getAttribute('data-column-index')
    }
    const to = {
      row: +target.getAttribute('data-row-index'),
      index: +getIndexInParent(el)
    }
    send('layout:reorder', { from, to })
  }
}

function Row (columns, rowIndex) {
  return html`
    <div class="flex-row" data-row-index=${rowIndex}>
      ${columns.map(Column)}
    </div>
  `
}
function Column (config, columnIndex) {
  return html`
    <div class="flex-column" data-column-index=${columnIndex}>
      <pre>
${JSON.stringify(config, null, 2)}
      </pre>
    </div>
  `
}

function getIndexInParent (el) {
  return Array.from(el.parentNode.children).indexOf(el)
}
