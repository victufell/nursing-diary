import * as axios from 'axios';

const baseAPI = `https://diario-de-enfermagem-default-rtdb.firebaseio.com/Table`

const services = {
  getSchedule: () => {
    return axios.get(`${baseAPI}/Agenda/poxRSSHRqcdkfVYLConkCGX184G2.json`)
  }

}

export default services