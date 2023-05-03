const isPhoneNumber = function (str) {
    if (str.length < 5 || str.length > 15) return false;
    for (var i = 0, l = str.length; i < l; i++) {
        if (str.charAt(i) === ' ' || str.charAt(i) < '0' || str.charAt(i) > '9') return false;
    }
    return true;
};

module.exports = {
    isPhoneNumber,
};
