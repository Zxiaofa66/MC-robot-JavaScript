const mineflayer=require('mineflayer');
const bot=mineflayer.createBot({
    username:'sb000',
    port:63623
})

function sayHello(){
    bot.chat('hello 小凡')
}

bot.once('spawn',sayHello)