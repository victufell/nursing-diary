import * as axios from 'axios';

const baseAPI = `https://diario-de-enfermagem-default-rtdb.firebaseio.com/Table`

const services = {
  getPatients: () => {
    return axios.get(`${baseAPI}/Pacientes/.json?orderBy="CPF"&EqualTo="37746415962"`)
  },
  getSchedule: () => {
    return axios.get(`${baseAPI}/Agenda/poxRSSHRqcdkfVYLConkCGX184G2.json`)
  },
  postScheduleItem: ({ data }) => {
    return axios.post(`${baseAPI}/Agenda/poxRSSHRqcdkfVYLConkCGX184G2.json`, data)
  },
  // deleteScheduleItem: () => {
  //   return axios.delete(`${baseAPI}/Table/poxRSSHRqcdkfVYLConkCGX184G2.json`)
  // },

}

export default services