import Vue from 'vue'

export const getData = () => {
  return Vue.http.get('http://172.22.4.252/cgi-bin/PP00100.exe?ppopcao=55&requisicao=138&request=5&opcao=1&dataInicial=01-01-2010&dataFinal=31-12-2020')
}

const cleanOb = arr => {
  if(arr.includes("__ob__")) {
    arr.pop()
  }
}

const putZero = str => str < 10 ? '0' + str : str

const prependFillWithZero = str => str.length < 4 ? `${prependFillWithZero('0' + str)}` : str

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


export const zippedObjToArray = arr => {
  if(arr.length == 0) return
  let fields = Object.getOwnPropertyNames(arr[0])
  cleanOb(fields) // vue adds a __ob__ field for reactivity
  let newArr = arr.map(obj => fields.map(field => obj[field]))
  transformIndex(newArr, 0, hourToMilli)
  return newArr
}

export const transformIndex = (arr, index, fn) => {
  arr.forEach(obj => {
    obj[index] = fn(obj[index])
  })
}

export const hourToMilli = str => {
  return new Date("11/21/1987 00:00:00").getTime() + (((""+str).substring(0,2) - 2) * 60 * 60 * 1000) + ((""+str).substring(2,4) * 60 * 1000)
}

export const unzipObj = arr => {
  if(arr.length == 0) return
  let fields = Object.getOwnPropertyNames(arr[0])
  cleanOb(fields) // vue adds a __ob__ field for reactivity
  let newArr = Array.from({length: fields.length}, () => [])
  arr.forEach(obj => {
    fields.forEach((field, index) => {
      newArr[index].push("" + obj[field])
    })
  })
  console.log(newArr)
  return newArr
}
