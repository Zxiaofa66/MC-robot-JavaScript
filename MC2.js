const admin_name = 'wujin520';
const mineflayer = require('mineflayer');
const pathfinder = require('mineflayer-pathfinder');
const bot = mineflayer.createBot({
  username: 'sb000',
  port: 63623,
});

bot.loadPlugin(pathfinder.pathfinder);

bot.on('chat', (username, message) => {
  if (username !== admin_name) return;

  message = message.split(' ');
  console.log(message);

  if (message[0] === "go") {
    botGo(message);
  }
});

function botGo(message) {
  const admin_entity = bot.players[admin_name]?.entity;

  if (!admin_entity) {
    bot.chat('没有找到玩家，无法跟随');
    return;
  }

  const goal_admin = new pathfinder.goals.GoalFollow(admin_entity, 1);

  switch (message[1]) {
    case "follow":
      bot.pathfinder.setGoal(goal_admin, true);
      break;
    case "stop":
      bot.pathfinder.stop();
      break;
    case "block":
      if (message.length <= 4) {
        bot.chat('输入有误，重新输入');
        return;
      }

      const x = parseInt(message[2]);
      const y = parseInt(message[3]);
      const z = parseInt(message[4]);
      const goal_block = new pathfinder.goals.GoalBlock(x, y, z);

      try {
        bot.pathfinder.setGoal(goal_block);
      } catch (e) {
        console.log(e);
        bot.chat('出现问题，请重新输入');
        return;
      }
      break;
    default:
      bot.pathfinder.setGoal(goal_admin, false);
  }
}

//启动方式MC聊天框 go follow