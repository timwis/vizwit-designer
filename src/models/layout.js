'use strict'

module.exports = {
  namespace: 'layout',
  state: {
    rows: [
      [
        { one: '1' },
        { two: '2' },
        { three: '3' }
      ],
      [
        { four: '4' },
        { five: '5' }
      ]
    ]
  },
  reducers: {
    reorder: (state, data) => {
      const { from, to } = data

      const rowsCopy = state.rows.slice()

      const fromRowCopy = rowsCopy[from.row].slice()
      const item = fromRowCopy[from.index]
      fromRowCopy.splice(from.index, 1) // remove from row
      rowsCopy[from.row] = fromRowCopy // replace 'from' row

      // If target row doesn't exist, create a new array
      const toRowCopy = rowsCopy[to.row] ? rowsCopy[to.row].slice() : []
      toRowCopy.splice(to.index, 0, item) // add to row
      rowsCopy[to.row] = toRowCopy // replace 'to' row

      return { rows: rowsCopy }
    }
  }
}
