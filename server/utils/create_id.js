const string_to_slug = function (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = 'àáãạảăẵặắằẳâấầẩẫậäđèéẽẻẹëêếềểễệìíĩỉịïîòóỏõọöôốồổỗộơớờởỡợùúủũụưứừửữựüûñç·/_,:;';
    var to = 'aaaaaaaaaaaaaaaaaadeeeeeeeeeeeeiiiiiiioooooooooooooooooouuuuuuuuuuuuunc      ';
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str
        .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '') // collapse whitespace and replace by -
        .replace(/-+/g, '') // collapse dashes
        .replace(/^\s+|\s+$/g, ''); // trim

    return str;
};

module.exports = {
    string_to_slug,
};
