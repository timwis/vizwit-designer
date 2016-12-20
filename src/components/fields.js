const html = require('choo/html')

module.exports = (fieldsObj, cb) => {
  const fields = toArray(fieldsObj, 'name')

  return html`
    <div class="form-group">
      <label for="field">Field</label>
      <select
        name="field"
        id="field"
        class="form-control"
        onchange=${onChange}>
        ${fields.length
          ? html`<option value="">Select field...</option>`
          : ''}
        ${fields.map(Field)}
      </select>
    </div>
  `

  function Field (field) {
    return html`
      <option value=${field.name}>
        ${field.name} (${field.type})
      </option>
    `
  }
  function onChange (e) {
    if (cb) {
      cb(e.target.value)
    }
  }
}

function toArray (obj, keyName) {
  const arr = []
  for (let key in obj) {
    // add key to item by keyName
    const item = Object.assign({}, obj[key], { [keyName]: key })
    arr.push(item)
  }
  return arr
}
