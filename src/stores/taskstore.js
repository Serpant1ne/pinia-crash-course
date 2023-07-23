import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        isLoading: false
    }),
    getters: {
        favs() {
            return this.tasks.filter(task => task.isFavorite)
        },
        favCount(){
            return this.favs.length
        },
        totalCount(){
            return this.tasks.length
        }
    },
    actions: {
        async addTask(task) {
            this.tasks.push(task)

            const res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'}
            })

            if(res.error){
                console.log(res.error)
            }
        },
        async deleteTask(id){
            this.tasks = this.tasks.filter(task => {
                return task.id !== id
            })

            const res = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'DELETE',
            })

            if(res.error){
                console.log(res.error)
            }
        },
        async toggleFav(id){
            const task = this.tasks.find(task => task.id === id) 
            task.isFavorite = !task.isFavorite

            const res = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'PATCH',
                body: JSON.stringify({ isFavorite: task.isFavorite}),
                headers: {'Content-Type': 'application/json'}
            })

            if(res.error){
                console.log(res.error)
            }
        },
        async getTasks(){
            this.isLoading = true
            const response = await fetch('http://localhost:3000/tasks')
            const data = await response.json()
            this.tasks = data
            this.isLoading = false
        }
    }
})