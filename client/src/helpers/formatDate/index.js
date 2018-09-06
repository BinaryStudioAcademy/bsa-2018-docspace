export default function formatDate (date) {
  if (typeof date === 'string') {
    date = new Date(date)
  }
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let day = date.getDate()
  let month = date.getMonth() + 1
  const year = date.getFullYear()

  if (hours < 10) {
    hours = `0${hours}`
  }
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  if (day < 10) {
    day = `0${day}`
  }
  if (month < 10) {
    month = `0${month}`
  }

  return `${hours}:${minutes} ${day}/${month}/${year}`
}
