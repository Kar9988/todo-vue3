import {defineStore} from 'pinia'
import axios from 'axios'

if (localStorage.getItem('token')) {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token').replace(/"/g, '')}`
}
export const useAuthStore = defineStore('useAuthStore', {
    state: () => ({
        user: null
    }),
    actions: {
        getAuthUser() {
            return new Promise((resolve, reject) => {
                axios.get(`${process.env.VUE_APP_BACK_END_API}/api/user`)
                    .then((data) => {
                        this.user = data.data
                        resolve(true)
                    }).catch((e) => {
                    reject(e)
                })
            })
        },
        login(payload) {
            return new Promise((resolve, reject) => {
                axios.post(`${process.env.VUE_APP_BACK_END_API}/api/login`, payload)
                    .then(({data}) => {
                        console.log('datadata', data);
                        if (data.success) {
                            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token.replace(/"/g, '')}`;
                            localStorage.setItem('token', JSON.stringify(data.token));
                            this.user = data.user
                            resolve(data)
                        } else {
                            reject(data)
                        }
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        }
    }
})
