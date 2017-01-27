# Examples

### React
```javascript
import { render } from 'react-dom'
import Home from './Home'
import About from './About'
import { match } from 'little-router'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

const { component } = match({ routes, path: '/' })

render(component, document.body)
```

### Express
```javascript
import express from 'express'
import { match } from 'little-router'

const app = express()

const routes = [
  { path: '/', body: 'Hello World!' },
  { path: '*', body: 'Not found :(' }
]

app.use((req, res) => {
  const result = match({ routes, path: req.path })
  res.send(result.body)
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
```
