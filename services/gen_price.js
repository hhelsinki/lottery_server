require('dotenv').config()
const baseKey = process.env.BASEKEY_API;

function generatePrice (req, res) {
    let api_key = req.headers['api_key'];

    if (api_key === baseKey) {
        const price_1st = Math.floor(Math.random() * 1000)
        const price_1st_minus = price_1st - 1;
        const price_1st_plus = price_1st + 1;
        const price_2nd_1 = Math.floor(Math.random() * 1000)
        const price_2nd_2 = Math.floor(Math.random() * 1000)
        const price_2nd_3 = Math.floor(Math.random() * 1000)
        const price_last_two = Math.floor(Math.random() * 100)

        let validateSecondPrice = (value, pattern, pattern_minus, pattern_plus, ...morePattern) => {
            if (value === pattern || value === pattern_minus || value === pattern_plus || value === morePattern) {
                const newPrice = Math.floor(Math.random() * 10)
                return newPrice
            }
            return value
        }

        const validated_2nd_1 = validateSecondPrice(price_2nd_1, price_1st, price_1st_minus, price_1st_plus)
        const validated_2nd_2 = validateSecondPrice(price_2nd_2, price_1st, price_1st_minus, price_1st_plus, price_2nd_1)
        const validated_2nd_3 = validateSecondPrice(price_2nd_3, price_1st, price_1st_minus, price_1st_plus, price_2nd_1, price_2nd_2)
        
        res.send({ 
            success: true,
            data: {
                all_prices: `${price_1st}, ${price_1st_minus}, ${price_1st_plus}, ${validated_2nd_1}, ${validated_2nd_2}, ${validated_2nd_3}, ${price_last_two}`,
                lists: {
                    '1st_price': price_1st,
                    '1st_price_minus': price_1st_minus,
                    '1st_price_plus': price_1st_plus,
                    '2nd_price_1': validated_2nd_1,
                    '2nd_price_2': validated_2nd_2,
                    '2nd_price_3': validated_2nd_3,
                    'last_two': price_last_two
                }
            }
        });
    }
    
    if (api_key !== baseKey) {
        return res.sendStatus(402)
    }
}

module.exports = { generatePrice };