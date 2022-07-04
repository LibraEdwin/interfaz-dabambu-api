const dayjs = require('dayjs')
const timezone = require('dayjs/plugin/timezone')
const utc = require('dayjs/plugin/utc')
require('dayjs/locale/es-mx')

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('es-mx')

function generateUrlName (id, text) {
  let str = text.toLowerCase()
  str = str.replace(/[-[\]{}()´`*+?.,\\^$|#\s]/g, ' ').trim()

  const characters = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;'
  const replace = 'aaaaaeeeeiiiioooouuuunc------'

  for (let i = 0; i < characters.length; i++) {
    str = str.replace(new RegExp(characters.charAt(i), 'g'), replace.charAt(i))
  }

  str = str.replace(/[^a-zA-Z0-9]/g, '-')
  str = str.replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  return `${id}-${str}`
}

function getDate (standardDate = undefined, format = null) {
  return dayjs(standardDate).tz('America/Lima').format(format)
}

const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    )
    return result
  }, {})
}

module.exports = {
  generateUrlName,
  getDate,
  groupBy
}
