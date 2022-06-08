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

export function getCounts(data, prop) {
  let result = {}
  for (let row of data) {
    if (!result[row[prop]]) {
      result[row[prop]] = 0
    }
    result[row[prop]]++
  }
  return Object.keys(result)
    .map(prop => ({prop, count: result[prop]}))
    .sort((a, b) => b.count - a.count)
    // .slice(0, 10)
}