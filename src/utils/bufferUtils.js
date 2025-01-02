const { getTime } = require("./timeUtils");

function convertBufferToObject(packet) {
    try {
        const buffer = serializer.createPacketBuffer(packet)
        const result = deserializer.parsePacketBuffer(buffer);
        // console.log(result)
        replay = Buffer.concat([replay, hexToBuffer(padZeros(getTime(startTime).toString(16), 8)), hexToBuffer(padZeros(result.fullBuffer.length.toString(16), 8)), result.fullBuffer]);
    } catch (error) {
        console.error('Error parsing buffer:', error);
        return null;
    }
}

function hexToBuffer(str) {
    if (str.length % 2 != 0)
        throw new Error('Invalid function argument length')
    let arr = []
    for (let p = 0; p < str.length; p += 2) {
        arr.push(parseInt((str[p] + str[p + 1]), 16))
    }
    return Buffer.from(arr)
}

function padZeros(val, req) {
    while (val.length < req) val = '0' + val;
    return val;
}

module.exports = { convertBufferToObject, padZeros, hexToBuffer };
