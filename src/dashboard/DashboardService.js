import Vue from 'vue'

export const getData = () => {
  return Vue.http.get('http://172.22.4.252/cgi-bin/PP00100.exe?ppopcao=55&requisicao=138&request=5&opcao=1&dataInicial=01-01-2010&dataFinal=31-12-2020')
}

export const createAllMinutesDay = () => {
  let allMinutesDay = {}
  for (let hour = 0; hour < 24; hour++) {
    for (let minutes = 0; minutes < 60; minutes++) {
      let hourMinutes = `${putZero(hour)}${putZero(minutes)}`
      allMinutesDay[hourMinutes] = 0
    }
  }
  return allMinutesDay
}

export const transformTimeline = arr => {
  return arr.reduce((acc, value) => {
    var hora = value['hora'];
    acc[prependFillWithZero(hora)] = value['times']
    return acc
  }, {})
}

export const mergeObjects = timeline => {
  let allHoursMinutesWithValue = createAllMinutesDay()
  let timelineWithValues = Object.assign(allHoursMinutesWithValue, transformTimeline(timeline))
  return Object.getOwnPropertyNames(allHoursMinutesWithValue).sort().map(time => {
    return [hourToMilli(time), timelineWithValues[time]]
  })
}


const hourToMilli = str => {
  return new Date().setHours(0, 0, 0, 0) - (3 * 60 * 60 * 1000) + parseInt((((str).substring(0,2)) * 60 * 60 * 1000)) + parseInt(((str).substring(2,4) * 60 * 1000))
}

const putZero = str => str < 10 ? '0' + str : str

const prependFillWithZero = str => {
  if(str.toString().length < 4) {
    return '0' + str;
  } 
  return str;
} 
