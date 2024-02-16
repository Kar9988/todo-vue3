import {defineStore} from 'pinia'
import axios from 'axios'

export const useCardStore = defineStore('useCardStore', {
    state: () => ({
        card: {}
    }),
    actions: {
        getCard(payload) {
            return new Promise((resolve, reject) => {
                axios.get(`${process.env.VUE_APP_BACK_END_API}/api/cards/${payload.id}`)
                    .then(({data}) => {
                        this.projects = data.data
                        resolve(true)
                    }).catch((e) => {
                    reject(e)
                })
            })
        },
        startTimer(payload) {
            return new Promise((resolve, reject) => {
                axios.post(`${process.env.VUE_APP_BACK_END_API}/api/cards/${payload}/timer/on`, payload)
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
        },
        endTimer(payload) {
            return new Promise((resolve, reject) => {
                axios.post(`${process.env.VUE_APP_BACK_END_API}/api/cards/${payload}/timer/off`, payload)
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
        },
        createCard(payload) {
            return new Promise((resolve, reject) => {
                axios.post(`${process.env.VUE_APP_BACK_END_API}/api/cards`, payload)
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
