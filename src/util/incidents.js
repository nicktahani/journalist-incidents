import { DateTime } from 'luxon';

export function deserializer(rows) {
  const updatedAt = DateTime.fromISO(rows.meta.createdOn).toFormat('cccc ff ZZZZ')

  const incidents = rows.data.map(d => {
    const entries = Object.assign(...d.entries)
    // return Object.assign(d, entries)
    return {
      id: d.id,
      name: d.fullName,
      gender: d.gender,
      title: d.type,
      page: d.mtpage,
      ...entries,
      year: entries.startDisplay.split(',').map(d => d.trim())[1]
    }
  })

  return {
    updatedAt, 
    incidents
  }
}

export function getCountryCounts(data) {
  let result = {}
  for (let row of data) {
    if (!result[row.country]) {
      result[row.country] = 0
    }
    result[row.country]++
  }
  return Object.keys(result)
    .map(country => ({country, count: result[country]}))
    .sort((a, b) => b.count - a.count)
    // .slice(0, 10)
}