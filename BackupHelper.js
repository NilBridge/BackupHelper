const packhelper = require('../Utils/PackHelper');
const version = '1.0.0';

function log(str){
    NIL.Logger.info('BackupHelper',str);
}

function onStart(){
    NIL.FUNC.PLUGINS.GROUP.push(backup_helper);
    log(`BackupHelper存档备份助手-已装载  当前版本${version}`);
    log('作者：LItion   发布平台：MineBBS/Github');
    log('欲联系作者可前往MineBBS论坛或Github');
    //NIL.bot.sendMainMessage(`[NilBridge备份助手]\nBackupHelper存档备份助手-已装载  当前版本${version}\n作者：LItion   发布平台：MineBBS/Github`)
}

function onStop(){
    log('插件被卸载');
}

function backup_helper(e){
    if(e.group_id != NIL.CONFIG.GROUP_MAIN)return;
    if(NIL.CONFIG.ADMIN.indexOf(e.sender.user_id)== -1)return;
    var pt = e.raw_message.split(' ');
    switch(pt[0]){
        case "在线备份":
        case "离线备份":
            if(pt.length == 1) {
                e.reply('命令参数不足！\n用法：\n在线备份 <服务器名称>\n离线备份 <服务器名称>');
                return;
            }
            if(NIL.SERVERS[pt[1]] == undefined){
                e.reply(`没有名为${pt[1]}的服务器`,true);
                return;
            }
            backup_item(pt[1]);
            e.reply('备份已执行');
            break;
    }
}

function backup_item(ser){
    let pack = getBackupPack(ser);
    NIL.SERVERS[ser].sendPack(pack);
}

function getBackupPack(ser){
    let p = JSON.stringify({
       action: 'backuprequest',
       type:'pack',
       params:{}
    });
    return packhelper.GetEncryptPack(NIL.SERVERS[ser].k,NIL.SERVERS[ser].iv,p);
}

module.exports = {
    onStart,
    onStop
};