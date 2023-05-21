
import { makeAutoObservable, computed } from 'mobx'
class TaskStore {
  list = [
    {
      id: 1,
      name: '学习react',
      isDone: true
    },
    {
      id: 2,
      name: '搞定mobx',
      isDone: true
    }
  ]
  constructor() {
    makeAutoObservable(this, {
      filterDone: computed,
      isAll: computed
    })
  }
  changeItemAll (falg) {
    this.list.forEach(item => item.isDone = !falg)
  }
  changeItem (id) {
    const item = this.list.find(item => item.id === id)
    item.isDone = !item.isDone
  }
  deleteItem (id) {
    this.list = this.list.filter(item => item.id !== id)
  }
  addItem(item){
    this.list.unshift(item)
  }
  get filterDone () {
    return this.list.filter(item => item.isDone).length
  }
  get isAll () {
    return this.list.every(item => item.isDone)
  }
}
export default TaskStore
