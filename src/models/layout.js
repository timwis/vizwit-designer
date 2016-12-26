'use strict'

module.exports = {
  namespace: 'layout',
  state: {
    rows: [
      [ {a: 'a'}, {b: 'b'} ]
    ]
  },
  reducers: {
    reorder: (state, data) => { // Who wants to take a stab at refactoring this?
      const { from, to } = data

      const rowsCopy = state.rows.slice()

      const fromRowCopy = rowsCopy[from.row].slice()
      const item = fromRowCopy[from.index]
      fromRowCopy.splice(from.index, 1) // remove from row

      if (fromRowCopy.length) { // if there are still items left in row
        rowsCopy[from.row] = fromRowCopy // replace 'from' row
      } else { // otherwise, row is now empty so delete it
        rowsCopy.splice(from.row, 1)
      }

      // If target row doesn't exist, create a new array
      const toRowCopy = rowsCopy[to.row] ? rowsCopy[to.row].slice() : []
      toRowCopy.splice(to.index, 0, item) // add to row
      rowsCopy[to.row] = toRowCopy // replace 'to' row

      return { rows: rowsCopy }
    },
    setCard: (state, data) => {
      const { config, row, column } = data
      const rowsCopy = state.rows.slice()

      if (row && column) {
        const rowCopy = rowsCopy[row].slice()
        rowCopy[column] = config
        rowsCopy[row] = rowCopy
      } else {
        rowsCopy.push([ config ])
      }

      return { rows: rowsCopy }
    }
  }
}
