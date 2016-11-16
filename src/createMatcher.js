import pathToRegexp from 'path-to-regexp'

export default function createMatcher() {
  const cache = {}

  return function matchPattern(pattern, location, options = {}) {
    const end = options.exact
    const key = `${pattern}|${end === false ? 0 : 1}`

    let matcher = cache[key]
    if (!matcher) {
      const keys = []
      matcher = { keys, regex: pathToRegexp(pattern, keys, { end, strict: true }) }
      cache[key] = matcher
    }

    const matches = matcher.regex.exec(location.pathname)
    if (!matches) {
      return null
    }

    const params = {}
    const pathname = matches.shift()

    matches.forEach((value, index) => {
      params[matcher.keys[index].name] = decodeURIComponent(value)
    })

    return { pathname, params }
  }
}
