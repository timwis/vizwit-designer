module.exports = {
  bar: {
    title: 'Bar chart',
    description: 'Columns that represent categorical data',
    validFieldTypes: ['string']
  },
  pie: {
    title: 'Pie chart',
    description: 'Slices that represent categorical data',
    validFieldTypes: ['string']
  },
  datetime: {
    title: 'Date/time chart',
    description: 'An area chart representing temporal categories',
    validFieldTypes: ['date']
  },
  choropleth: {
    title: 'Choropleth map',
    description: 'A map with polygon colors scaled based on a value',
    validFieldTypes: ['string']
  }
}
