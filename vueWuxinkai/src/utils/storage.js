//封装操作localstorage本地存储 封装方法
//在toduList.vue 应用到
let storage = {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    get(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    remove(key) {
        localStorage.removeItem(key)
    }
}
export default storage;