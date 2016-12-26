const choo = require('choo')

const app = choo()

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-log')())
}

app.model(require('./models/configure'))
app.model(require('./models/layout'))

app.router([
  ['/', require('./views/layout')],
  ['/configure', require('./views/configure')]
])

const tree = app.start()
document.body.appendChild(tree)
