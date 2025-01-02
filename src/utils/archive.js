const fs = require('fs');

async function createArchiveAndShutdown(outputDir, archiveName) {
    metadata.duration = Date.now() - startTime;
    metadata.date = Date.now();
    
    const metaDataPath = `${outputDir}/metaData.json`
    const modsPath = `${outputDir}/mods.json`

    if (!archiveName) {
        archiveName = `${outputDir}/${new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19)}.mcpr`;
    } else {
        archiveName = `${outputDir}/${archiveName}`;
    }
    
    const output = fs.createWriteStream(archiveName);

    archive.pipe(output);
    fs.writeFileSync(metaDataPath, JSON.stringify(metadata));
    fs.writeFileSync(modsPath, JSON.stringify(Mods));
    archive.append(replay, { name: 'recording.tmcpr' });
    archive.file(metaDataPath, { name: "metaData.json" });
    archive.file(modsPath, { name: "mods.json" });

    await archive.finalize();
    fs.unlinkSync(metaDataPath, JSON.stringify(metadata));
    fs.unlinkSync(modsPath, JSON.stringify(Mods));
    console.log("[Replay Mod] Запись завершена. Архив создан:", archiveName);
}

module.exports = { createArchiveAndShutdown };
