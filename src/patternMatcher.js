import pathToRegexp from 'path-to-regexp'

export default function patternMatcher() {
  const cache = {}

  return function matchPattern(pattern, path, { exact, strict = true } = {}) {
    const end = exact
    const key = `${pattern}|${end === false ? 0 : 1}`

    let matcher = cache[key]
    if (!matcher) {
      const keys = []
      matcher = { keys, regex: pathToRegexp(pattern, keys, { end, strict }) }
      cache[key] = matcher
    }

    const matches = matcher.regex.exec(path)
    if (!matches) return null

    const params = {}
    const pathname = matches.shift()

    matches.forEach((value, index) => {
      params[matcher.keys[index].name] = value ? decodeURIComponent(value) : value
    })

    return { params, path: pathname }
  }
}
