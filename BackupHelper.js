const packhelper = require('../Utils/PackHelper');
const version = '1.1.2';

function log(str) {
    NIL.Logger.info('BackupHelper', str);
}

function onStart() {
    NIL.NBCMD.regUserCmd("backup", (arg) => {
        if (NIL.SERVERS[arg[0]] == undefined) {
            return `没有名为${arg[0]}的服务器`;
        }
        backup_item(arg[0]);
        return '备份已执行';
    });

    log(`BackupHelper存档备份助手-已装载  当前版本${version}`);
    log('作者：LItion   发布平台：MineBBS/Github');
    log('欲联系作者可前往MineBBS论坛或Github');
    //NIL.bot.sendMainMessage(`[NilBridge备份助手]\nBackupHelper存档备份助手-已装载  当前版本${version}\n作者：LItion   发布平台：MineBBS/Github`)
}

function onStop() {
    NIL.NBCMD.remUserCmd("backup");
    log('插件被卸载');
}


function backup_item(ser) {
    let pack = getBackupPack(ser);
    NIL.SERVERS[ser].sendPack(pack);
}

function getBackupPack(ser) {
    let p = JSON.stringify({
        action: 'backuprequest',
        type: 'pack',
        params: {}
    });
    return packhelper.GetEncryptPack(NIL.SERVERS[ser].k, NIL.SERVERS[ser].iv, p);
}

module.exports = {
    onStart,
    onStop
};
