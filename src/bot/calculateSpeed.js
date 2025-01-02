function calculateSpeed(bot, lastPosition) {
    if (lastPosition) {
        const currentPosition = bot.entity.position; // Текущая позиция
        const dX = currentPosition.x - lastPosition.x;
        const dY = currentPosition.y - lastPosition.y;
        const dZ = currentPosition.z - lastPosition.z;
        const distance = Math.sqrt(dX * dX + dY * dY + dZ * dZ); // Пройденное расстояние
        speed = distance; // Скорость (расстояние за секунду)
    }
    lastPosition = bot.entity.position.clone(); // Обновляем последнюю позицию
    return
}

module.exports = { calculateSpeed };