const html = require('choo/html')

const boundaries = require('../boundaries.json')

module.exports = (chartType, cb) => {
  switch (chartType) {
    case 'choropleth':
      return html`
        <div class="form-group">
          <label for="boundaries">
            Boundaries
          </label>
          <select
            id="boundaries"
            name="boundaries"
            class="form-control"
            onchange=${onChange}>
            <option value="">Select...</option>
            ${boundaries.map((boundary) => html`
              <option>${boundary.name}</option>
            `)}
          </select>
        </div>
      `
      function onChange (e) {
        if (cb) {
          const value = e.target.value
          const boundary = boundaries.find((boundary) => boundary.name === value)
          const payload = {
            boundaries: boundary.url,
            boundariesLabel: boundary.label,
            boundariesId: boundary.id
          }
          cb(payload)
        }
      }
    default:
      return html`
        <div></div>
      `
  }
}
