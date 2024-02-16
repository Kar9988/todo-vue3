import {defineStore} from 'pinia'
import axios from 'axios'

export const useProjectStore = defineStore('useProjectStore', {
    state: () => ({
        projects: []
    }),
    actions: {
        getUserProjects() {
            return new Promise((resolve, reject) => {
                axios.get(`${process.env.VUE_APP_BACK_END_API}/api/projects`)
                    .then(({data}) => {
                        this.projects = data.data
                        resolve(true)
                    }).catch((e) => {
                    reject(e)
                })
            })
        },
        createProject(payload) {
            return new Promise((resolve, reject) => {
                axios.post(`${process.env.VUE_APP_BACK_END_API}/api/projects`, payload)
                    .then(({data}) => {
                        console.log(data)
                        if (data.success) {
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
