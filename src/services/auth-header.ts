export default function authHeader(): Record<string, unknown> {
  const storedUser = localStorage.getItem('user')
  const user = JSON.parse(storedUser ? storedUser : '')

  if (user && user.idToken) {
    return { Authorization: user.idToken }
  } else {
    return {}
  }
}
