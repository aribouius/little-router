import match from './match'

export default ({ routes, context = {} }) => ({
  match: path => match({
    path,
    routes,
    context,
  }),
})
