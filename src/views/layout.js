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
`

module.exports = (state, prev, send) => {
  const nextRowIndex = state.layout.rows.length

  const tree = html`
    <div class="${prefix} container">
      <h1>VizWit Layout</h1>
      ${state.layout.rows.map((columns, rowIndex) => {
        return html`
          <div class="flex-row" data-row-index=${rowIndex}>
            ${columns.map((card, columnIndex) => html`
              <div
                class="flex-column"
                data-column-index=${columnIndex}>
                ${JSON.stringify(card)}
              </div>
            `)}
          </div>
        `
      })}
      <div class="flex-row" data-row-index=${nextRowIndex}></div>
      <pre>
        ${Export(state.layout.rows)}
      </pre>
    </div>
  `

  const rowEls = Array.from(tree.querySelectorAll('.flex-row'))
  const dragArea = dragula(rowEls)
  dragArea.on('drop', dragDropCallback)

  return tree

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

  function Export (rows) {
    return html`
      <pre>
${JSON.stringify(rows, null, 2)}
      </pre>
    `
  }
}

function getIndexInParent (el) {
  return Array.from(el.parentNode.children).indexOf(el)
}
