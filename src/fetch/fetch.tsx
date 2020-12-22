export const fetchRead = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    alert('Failed to fetch')
    return null
  }
  const data = await response.json()

  return data
}

export const fetchDelete = async (url, dataSend) => {
  const response = await fetch(url, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataSend),
  })
  if (response.status === 400) {
    alert('Failed to delete')
  }
  return response.status
}

export const fetchAdd = async (url, dataSend) => {
  const response = await fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataSend),
  })
  return response
}

export const fetchUpdate = async (url, dataSend) => {
  const response = await fetch(url, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataSend),
  })

  return response
}

export const handleErrors = (response) => {
  // multiple promises
  if (Array.isArray(response)) {
    response.forEach((promise) => {
      if (!promise.ok) {
        throw Error(promise.statusText)
      }
    })
  } else {
    if (!response.ok) {
      throw Error(response.statusText)
    }
  }
  return response
}
