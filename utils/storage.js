
const Storage = {
	get: (key) => {
        const data = localStorage.getItem(key)
        return data ? JSON.parse(data) : null
    },
	set: (key, data) => {
        localStorage.setItem(key, JSON.stringify(data))
    }
}

export default Storage