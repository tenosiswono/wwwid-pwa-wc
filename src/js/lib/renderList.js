export default (items, generator) => items.length > 2 ? items.reduce((p, i, index) => (index > 1 ? p : generator(p)) + generator(i)) : generator(items[0])
