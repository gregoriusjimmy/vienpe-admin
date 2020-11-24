export const fetchRead = async (source) => {
  const response = await fetch(source)
  if (response.status === 400) {
    alert('Failed to fetch')
    return null
  }
  const data = await response.json()

  return data
}

export const fetchDelete = async (source, dataSend) => {
  const response = await fetch(source, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataSend),
  })
  if (response.status === 400) {
    alert('Failed to delete')
  }
  return response.status
}

export const fetchAdd = async (source, dataSend) => {
  const response = await fetch(source, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataSend),
  })

  if (response.status === 400) {
    alert('Failed to add')
  }
  return response.status
}

export const fetchUpdate = async (source, dataSend) => {
  const response = await fetch(source, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataSend),
  })

  if (response.status === 400) {
    alert('Failed to add')
  }
  return response.status
}
