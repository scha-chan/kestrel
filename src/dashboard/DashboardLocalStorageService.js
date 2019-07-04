//TODO IMPLEMENTAR NO VUEX


export const saveToLocalStorage = data => {
  localStorage.queue =  JSON.stringify(data.queue)
  localStorage.response =  JSON.stringify(data.response)
  localStorage.running =  JSON.stringify(data.running)
  localStorage.tables =  JSON.stringify(data.tables)
  localStorage.timelineEnvio =  JSON.stringify(data.timelineEnvio)
  localStorage.timelineFila =  JSON.stringify(data.timelineFila)
}

export const getFromLocalStorage = () => {
  return {
    queue: localStorage.queue ? JSON.parse(localStorage.queue) : {},
    response: localStorage.response ? JSON.parse(localStorage.response) : {},
    running: localStorage.running ? JSON.parse(localStorage.running) : false,
    tables: localStorage.tables ? JSON.parse(localStorage.tables) : [],
    timelineEnvio: localStorage.timelineEnvio ? JSON.parse(localStorage.timelineEnvio) : [],
    timelineFila: localStorage.timelineFila ? JSON.parse(localStorage.timelineFila) : []
  }
}
