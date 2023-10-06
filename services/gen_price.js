require('dotenv').config()
const baseKey = process.env.BASEKEY_API;

function generatePrice(req, res) {
    let api_key = req.headers['api_key'];

    if (api_key === baseKey) {
        const price_1st = Math.floor(Math.random() * 1000)
        const price_1st_minus = price_1st - 1;
        const price_1st_plus = price_1st + 1;
        const price_2nd_1 = Math.floor(Math.random() * 1000)
        const price_2nd_2 = Math.floor(Math.random() * 1000)
        const price_2nd_3 = Math.floor(Math.random() * 1000)
        const price_last_two = Math.floor(Math.random() * 100)

        let validateDuplicate = (value, pattern, pattern_minus, pattern_plus, ...morePattern) => {
            if (value === pattern || value === pattern_minus || value === pattern_plus || value === morePattern) {
                const newPrice = Math.floor(Math.random() * 1000)
                return newPrice
            }
            return value
        }

        let validateHundred = (value, len) => {
            const valueString = value.toString()
            if (valueString.length < len) {
                const newValue = '0' + valueString
                return newValue
            }
            return value
        }

        const duplicate_2nd_1 = validateDuplicate(price_2nd_1, price_1st, price_1st_minus, price_1st_plus)
        const duplicate_2nd_2 = validateDuplicate(price_2nd_2, price_1st, price_1st_minus, price_1st_plus, price_2nd_1)
        const duplicate_2nd_3 = validateDuplicate(price_2nd_3, price_1st, price_1st_minus, price_1st_plus, price_2nd_1, price_2nd_2)

        const validated_1st = validateHundred(price_1st, 3)
        const validated_1st_minus = validateHundred(price_1st_minus, 3)
        const validated_1st_plus = validateHundred(price_1st_plus, 3)
        const validated_2nd_1 = validateHundred(duplicate_2nd_1, 3)
        const validated_2nd_2 = validateHundred(duplicate_2nd_2, 3)
        const validated_2nd_3 = validateHundred(duplicate_2nd_3, 3)
        const validated_last_two = validateHundred(price_last_two, 2)

        res.send({
            success: true,
            data: {
                all_prices: `${validated_1st}, ${validated_1st_minus}, ${validated_1st_plus}, ${validated_2nd_1}, ${validated_2nd_2}, ${validated_2nd_3}, ${validated_last_two}`,
                lists: {
                    'first_price': `${validated_1st}`,
                    'first_price_minus': `${validated_1st_minus}`,
                    'first_price_plus': `${validated_1st_plus}`,
                    'second_price_1': `${validated_2nd_1}`,
                    'second_price_2': `${validated_2nd_2}`,
                    'second_price_3': `${validated_2nd_3}`,
                    'last_two': `${validated_last_two}`
                }
            }
        });
    }

    if (api_key !== baseKey) {
        return res.sendStatus(402)
    }
}

module.exports = { generatePrice };