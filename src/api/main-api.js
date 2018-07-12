import axios from 'axios';
import store from '../store';
import qs from 'qs';


export function getUsers(){
  return axios.get('https://5b3b45c6e7659e001496949c.mockapi.io/api/db/users')
              .then(result=> { return result.data })
}


export const addUser = (user) => {
  return axios.post('https://5b3b45c6e7659e001496949c.mockapi.io/api/db/users', qs.stringify({name: user.name, email: user.email}) )
              .then(result=> { return result.data })
}

export const sendUser = (id) => {
  return axios.put('https://5b3b45c6e7659e001496949c.mockapi.io/api/db/users/'+ id, qs.stringify({status: true}))
              .then(result=> { return result.data })
}

export const deleteUsers = (id) => {
  return axios.delete('https://5b3b45c6e7659e001496949c.mockapi.io/api/db/users/' + id)
              .then(result=> { return result.data })
}
