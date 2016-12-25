const choo = require('choo')

const app = choo()

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-log')())
}

app.model(require('./model'))
app.model(require('./models/layout'))

app.router([
  ['/', require('./views/configure')],
  ['/layout', require('./views/layout')]
])

const tree = app.start()
document.body.appendChild(tree)
