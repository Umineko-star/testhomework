import Axios from 'axios'
const configBaseUrl = 'http://localhost:8888';
const Servcer = Axios.create({
    baseURL:configBaseUrl,
    timeout:60000
})
 // Servcer.defaults.headers.post['Content-Type'] = 'application/json'
export default Servcer