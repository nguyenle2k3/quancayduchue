const checkPrice = function (price) {
    if (price === '' || price.length < 1 || price.length > 5 || price === '0') return false;
    var letter;
    for (var i = 0, l = str.length; i < l; i++) {
        letter = str.charAt(i);
        if (letter === ' ' || letter < 48 || letter > 57) return false;
    }
    return true;
};

const delZeroInFirst = function (price) {
    var newPrice = price;
    while (newPrice.startsWith('0')) {
        newPrice = newPrice.slice(1); // remove first character from the string until it's not '0'
    }
    return newPrice;
};

module.exports = {
    checkPrice,
    delZeroInFirst,
};
