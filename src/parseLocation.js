import { parse, stringify } from 'query-string'

export default input => {
  let query
  let search
  let pathname

  if (typeof input === 'string') {
    [pathname, search] = input.match(/([^?]*)(\?[^#]+)?(#.+)?/).slice(1)
  } else {
    ({ pathname, search, query } = input)
  }

  search = search || (query ? `?${stringify(query)}` : '')
  pathname = pathname || ''

  return {
    search,
    pathname,
    query: query || (search ? parse(search) : {}),
    href: `${pathname}${search}`,
  }
}
