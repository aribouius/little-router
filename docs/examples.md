# Examples

### React
```javascript
import { render } from 'react-dom'
import Home from './Home'
import NotFound from './NotFound'
import { match } from 'little-router'

const routes = [
  { path: '/', component: Home },
  { path: '*', component: NotFound }
]

const { route } = match({ routes, path: '/' })

render(route.component, document.body)
```

### Express
```javascript
import express from 'express'
import { match } from 'little-router'

const app = express()

const routes = [
  { path: '/', body: 'Hello World!' },
  { path: '*', body: 'Sorry, this page does not exist!' }
]

app.use((req, res) => {
  const { route } = match({ routes, path: req.path })
  res.send(route.body)
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
```
