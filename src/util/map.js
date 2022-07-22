export function getCountsByYear(data) {
  const counts = data.reduce((c, { year, country }) => {
    if (!c[year]) c[year] = {}        
    if (!c[year][country]) c[year][country] = {country, count: 0}
    c[year][country].count++

    return c
  }, {})

  const { undefined, ...filtered } = counts

  return filtered
}

export function countryCountsByYear(data) {
  const counts = data.reduce((c, { year, country }) => {
    if (!c[year]) c[year] = {}        
    if (!c[year][country]) c[year][country] = 0
    c[year][country]++

    return c
  }, {})

  const { undefined, ...filtered } = counts

  return filtered
}