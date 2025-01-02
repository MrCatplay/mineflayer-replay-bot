async function movement(bot, x, y, z, yaw, pitch, onGround) {
    if (Math.abs(player.clientX - x) > 256
        || Math.abs(player.clientY - y) > 256
        || Math.abs(player.clientZ - z) > 256) {
        const packet = {
            name: "entity_teleport",
            params: {
                entityId: bot.entity.id,
                x: x,
                y: y,
                z: z,
                yaw: yaw,
                pitch: pitch,
                onGround: onGround
            }
        }

        player.clientX = x
        player.clientY = y
        player.clientZ = z
        return packet
    } else {
        if (player.clientX != x || player.clientY != y || player.clientZ != z) {
            if (player.clientYaw != yaw || player.clientPitch != pitch) {
                const packet = {
                    name: "entity_move_look",
                    params: {
                        entityId: bot.entity.id,
                        dX: x * 32 - player.clientX * 32,
                        dY: y * 32 - player.clientY * 32,
                        dZ: z * 32 - player.clientZ * 32,
                        yaw: yaw,
                        pitch: pitch,
                        onGround: onGround
                    }
                }
                return packet
            } else {
                const packet = {
                    name: "rel_entity_move",
                    params: {
                        entityId: bot.entity.id,
                        dX: x * 32 - player.clientX * 32,
                        dY: y * 32 - player.clientY * 32,
                        dZ: z * 32 - player.clientZ * 32,
                        onGround: onGround
                    }
                }
                // console.log(packet)
                return packet
            }
        } else {
            const packet = {
                name: "rel_entity_move",
                params: {
                    entityId: bot.entity.id,
                    yaw: yaw,
                    pitch: pitch,
                    onGround: onGround
                }
            }
            return packet
        }
    }
}

module.exports = { movement };