const deserializer = rows => {

  return rows.data.map(d => {
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
}

export { deserializer }