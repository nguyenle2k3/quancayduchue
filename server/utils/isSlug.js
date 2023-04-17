module.exports = function isSlug(str) {
    const regex = /[^a-zA-Z0-9-]/g;
    console.log(str);
    return !regex.test(str);
};
