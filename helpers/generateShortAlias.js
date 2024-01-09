function generateAlias(length = 5) {
    const combinations = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let alias = '';
    for (let i=0; i<length; i++) {
        alias += combinations[Math.floor(Math.random() * combinations.length)];
    }
    return alias;
}

module.exports = generateAlias;