const test = require('tape')

const model = require('../src/models/layout')
const { reorder } = model.reducers

test('move column between rows', (t) => {
  t.plan(1)

  const state = Object.freeze({
    rows: [
      [ {a: 'a'}, {b: 'b'}, {c: 'c'} ], // move b from here
      [ {d: 'd'}, {e: 'e'} ]
    ]
  })
  const expected = {
    rows: [
      [ {a: 'a'}, {c: 'c'} ],
      [ {d: 'd'}, {b: 'b'}, {e: 'e'} ] // to here
    ]
  }
  const payload = {
    from: { row: 0, index: 1 },
    to: { row: 1, index: 1 }
  }

  const result = reorder(state, payload)
  t.deepEqual(result, expected)
})

test('move column within same row', (t) => {
  t.plan(1)

  const state = Object.freeze({
    rows: [
      [ {a: 'a'}, {b: 'b'}, {c: 'c'} ],
      [ {d: 'd'}, {e: 'e'} ]
    ]
  })
  const expected = {
    rows: [
      [ {a: 'a'}, {c: 'c'}, {b: 'b'} ],
      [ {d: 'd'}, {e: 'e'} ]
    ]
  }
  const payload = {
    from: { row: 0, index: 1 },
    to: { row: 0, index: 2 }
  }

  const result = reorder(state, payload)
  t.deepEqual(result, expected)
})

test('move column to new row', (t) => {
  t.plan(1)

  const state = Object.freeze({
    rows: [
      [ {a: 'a'}, {b: 'b'}, {c: 'c'} ],
      [ {d: 'd'}, {e: 'e'} ]
    ]
  })

  const expected = {
    rows: [
      [ {a: 'a'}, {b: 'b'} ],
      [ {d: 'd'}, {e: 'e'} ],
      [ {c: 'c'} ]
    ]
  }

  const payload = {
    from: { row: 0, index: 2 },
    to: { row: 2, index: 0 }
  }

  const result = reorder(state, payload)
  t.deepEqual(result, expected)
})

test('delete row if no columns left', (t) => {
  t.plan(1)

  const state = Object.freeze({
    rows: [
      [ {a: 'a'}, {b: 'b'} ],
      [ {c: 'c'} ]
    ]
  })

  const expected = {
    rows: [
      [ {a: 'a'}, {b: 'b'}, {c: 'c'} ]
    ]
  }

  const payload = {
    from: { row: 1, index: 0 },
    to: { row: 0, index: 2 }
  }

  const result = reorder(state, payload)
  t.deepEqual(result, expected)
})
