import { parse, stringify } from 'query-string'

export default input => {
  let hash
  let query
  let search
  let pathname

  if (typeof input === 'string') {
    [pathname, search, hash] = input.match(/([^?]*)(\?[^#]+)?(#.+)?/).slice(1)
  } else {
    ({ pathname, search, query, hash } = input)
  }

  hash = hash || ''
  search = search || (query ? `?${stringify(query)}` : '')
  pathname = pathname || ''

  return {
    hash,
    search,
    pathname,
    query: query || (search ? parse(search) : {}),
    href: `${pathname}${search}${hash}`,
  }
}
