export function text(value, language = 'pt') {
  return typeof value === 'string' ? value : value?.[language] ?? value?.pt ?? ''
}
export function validHttpUrl(value) {
  if (!value) return false
  try { return ['http:', 'https:'].includes(new URL(value).protocol) } catch { return false }
}
export function sortedProjects(projects) {
  return [...projects].sort((a, b) => {
    const da = Date.parse(a.date), db = Date.parse(b.date)
    return (Number.isNaN(da) ? Infinity : da) - (Number.isNaN(db) ? Infinity : db)
  })
}
export function validateContact(values, language) {
  const pt = language === 'pt'
  const errors = {}
  if (values.name.trim().length < 2 || values.name.trim().length > 100) errors.name = pt ? 'Informe um nome entre 2 e 100 caracteres.' : 'Enter a name with 2–100 characters.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) || values.email.length > 254) errors.email = pt ? 'Informe um e-mail válido.' : 'Enter a valid email address.'
  if (values.message.trim().length < 10 || values.message.trim().length > 5000) errors.message = pt ? 'Escreva uma mensagem entre 10 e 5.000 caracteres.' : 'Write a message with 10–5,000 characters.'
  return errors
}

export function assetUrl(value) {
  if (!value) return ''
  if (validHttpUrl(value)) return value
  return `${import.meta.env.BASE_URL}${value.replace(/^\/+/, '')}`
}
