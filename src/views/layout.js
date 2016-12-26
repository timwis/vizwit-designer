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
    height: 100px;
    border: 1px black solid;
    flex: 1;
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
    const rowEls = Array.from(el.querySelectorAll('.flex-row'))
    dragArea = dragula(rowEls)
    console.log('draggable', rowEls, dragArea)
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
      ${JSON.stringify(config)}
    </div>
  `
}

function getIndexInParent (el) {
  return Array.from(el.parentNode.children).indexOf(el)
}
