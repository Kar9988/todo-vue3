import {defineStore} from 'pinia'
import axios from 'axios'

export const useListStore = defineStore('useListStore', {
    state: () => ({
        lists: []
    }),
    actions: {
        getProjectLists(payload) {
            return new Promise((resolve, reject) => {
                axios.get(`${process.env.VUE_APP_BACK_END_API}/api/projects/${payload}/lists`)
                    .then(({data}) => {
                        this.lists = data.data
                        resolve(true)
                    }).catch((e) => {
                    reject(e)
                })
            })
        },
        createList(payload) {
            return new Promise((resolve, reject) => {
                axios.post(`${process.env.VUE_APP_BACK_END_API}/api/projects/${payload.project_id}/lists`, payload)
                    .then(({data}) => {
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
