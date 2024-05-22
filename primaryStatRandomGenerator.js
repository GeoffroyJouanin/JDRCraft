import {lancerDe6} from "./randomDice.js";

export function standardMethod()
{
    const stats = [];
    for (let j = 0; j < 6; j++)
    {
        const values = [];
        for (let i = 0; i < 4; i++)
        {
            values.push(lancerDe6());
        }
        values.splice(values.indexOf(Math.min(...values)), 1);
        const sum = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        stats.push(sum);
    }
    return stats;
}

export function standardMethodPair()
{
    const stats = standardMethod();
    return stats.map(value => {
        if (value % 2 === 1)
        {
            const random = Math.floor(Math.random() * 2) + 1;
            const diff = (-1)**random;
            return value + diff;
        }
        return value;
    });
}

