const { hexToBuffer, padZeros, convertBufferToObject } = require('../utils/bufferUtils');
const { getTime } = require('../utils/timeUtils');

async function convertor(bot, data, metadata, buff, fullBuffer) {
    if (metadata.name == 'compress') return
    // console.log('server:')
    // console.log(data)
    // console.log(fullBuffer)
    if (metadata.name == 'spawn_position') {
        if (!player.spawned) {
            player.clientX = data.location.x
            player.clientY = data.location.y
            player.clientZ = data.location.z
        }
    } else if (metadata.name == 'player_info') {
        setTimeout(() => {
            if (data.action == 0 && !player.spawned) {
                player.clientUUID = data.data[0].UUID
                player.spawned = true
                const packetplayerinfo = {
                    name: "player_info",
                    params: {
                        action: 0,
                        data: [
                            {
                                UUID: data.data[0].UUID,
                                name: bot.username,
                                properties: [],
                                gamemode: 2,
                                ping: 0
                            }
                        ]
                    }
                }
    
                const packetdata = {
                    name: "named_entity_spawn",
                    params: {
                        entityId: bot.entity.id,
                        playerUUID: data.data[0].UUID,
                        x: player.clientX,
                        y: player.clientY,
                        z: player.clientZ,
                        yaw: player.clientYaw,
                        pitch: player.clientPitch,
                        currentItem: bot.quickBarSlot
                    }
                }
    
                const packetentitymetadata = {
                    name: "entity_metadata",
                    params: {
                        entityId: bot.entity.id,
                        metadata:
                        {
                            key: 9,
                            type: 2,
                            value: 20
                        }
                    }
                };
    
                convertBufferToObject(packetplayerinfo)
                convertBufferToObject(packetdata)
                convertBufferToObject(packetentitymetadata)
                return
            }
        }, 250)
    }
    
    replay = Buffer.concat([replay, hexToBuffer(padZeros(getTime(startTime).toString(16), 8)), hexToBuffer(padZeros(fullBuffer.length.toString(16), 8)), fullBuffer]);
       
}

module.exports = { convertor };