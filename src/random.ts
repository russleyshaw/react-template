export function randomInt(min: number, max: number) {
    const tMin = Math.ceil(min);
    const tMax = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function randomChoice<T>(items: T[]): T {
    return items[randomInt(0, items.length)];
}
