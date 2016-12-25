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
  const tree = html`
    <div class="${prefix} container">
      <h1>VizWit Layout</h1>
      ${state.layout.rows.map((columns) => {
        return html`
          <div class="flex-row">
            ${columns.map((card) => html`
              <div class="flex-column">
                ${JSON.stringify(card)}
              </div>
            `)}
          </div>
        `
      })}
      <div class="flex-row"></div>
    </div>
  `

  const rowEls = Array.from(tree.querySelectorAll('.flex-row'))
  const dragArea = dragula(rowEls)
  dragArea.on('drop', (el, target, source, sibling) => {
    // target is the row, sibling is the one it's before & null if last
    console.log('dropped', {el, target, source, sibling})
  })

  return tree
}
