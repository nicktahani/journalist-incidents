export function getCountsByYear(data) {
  const counts = data.reduce((c, { year, country }) => {
    if (!c[year]) c[year] = {}        
    if (!c[year][country]) c[year][country] = {country, count: 0}
    c[year][country].count++

    return c
  }, {})

  return counts
}

export function countryCountsByYear(data) {
  const counts = data.reduce((c, { year, country }) => {
    if (!c[year]) c[year] = {}        
    if (!c[year][country]) c[year][country] = 0
    c[year][country]++

    return c
  }, {})

  return counts
}

export function filterBySelection(data, selected, year) {
  return data
    .filter(d => d.year === year)
    .filter(d => d.country === selected)
}