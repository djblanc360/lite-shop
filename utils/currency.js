
const Currency = {
    format: (amount) => {
        // type check float
        const isFloat = parseFloat(amount)
        if (isNaN(isFloat)) {
            return 'Invalid price'
        }
        if (Number.isInteger(isFloat)) {
            amount = isFloat / 100
        }
        return `$${amount.toFixed(2)}`
    },
    convert: (price) => {
        return Math.round(parseFloat(price) * 100)
    }
}

export default Currency