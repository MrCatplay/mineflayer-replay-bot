function getTime(start) {
    let timeMStotal = new Date().getTime();
    return timeMStotal - start;
}

module.exports = { getTime };
