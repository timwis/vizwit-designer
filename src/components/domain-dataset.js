const html = require('choo/html')
const getFormData = require('get-form-data')

module.exports = (cb) => {
  return html`
    <form onsubmit=${onSubmit}>
      <div class="form-group">
        <label for="domain">Domain</label>
        <input
          type="text"
          name="domain"
          id="domain"
          class="form-control"
          value="timwis.carto.com"
          placeholder="phl.carto.com"/>
      </div>
      <div class="form-group">
        <label for="dataset">Dataset</label>
        <input
          type="text"
          name="dataset"
          id="dataset"
          class="form-control"
          value="crimes_2015_to_oct_2016"
          placeholder="crime_incidents"/>
      </div>
      <button type="submit" class="btn btn-primary">
        Get fields
      </button>
    </form>
  `
  function onSubmit (e) {
    const formData = getFormData(e.target)
    if (cb && formData.domain && formData.dataset) {
      cb(formData)
    }
    e.preventDefault()
  }
}
