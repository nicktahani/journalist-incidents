import { DateTime } from 'luxon';

const deserializer = rows => {
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
    updated: updatedAt, 
    incidents
  }
}

export { deserializer }