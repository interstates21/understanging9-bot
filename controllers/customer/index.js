const Scene = require("telegraf/scenes/base");
const keyboard = require("./customerKeyboard");
const backKeyboard = require("../backKeyboard");
const { Markup } = require("telegraf");
const commands = require("../commands");
const User = require("../../models/User");

const customerMenuScene = new Scene("customerMenuScene");
const customerFeedScene = new Scene("customerFeedScene");

const formatItem = item => `
<a href="tg://user?id=${item._id}"><b>${item.name}</b></a>

<b>Experience: </b>${item.experience}
<b>Speciality: </b> ${item.speciality}
<b>Interests: </b> ${item.values}
<b>Location: </b> Discord
<b>Rate: </b> free

<a href="tg://user?id=${item._id}">${item.message}</a>`;

customerMenuScene.enter(async ctx => {
  await ctx.reply("Welcome dear Ninja, what would you like to do?", keyboard);
});

customerMenuScene.hears(commands.FEED, async ctx => {
  ctx.scene.leave("customerMenuScene");
  ctx.scene.enter("customerFeedScene");
});

customerMenuScene.hears(commands.BACK, ctx => {
  ctx.scene.leave("customerMenuScene");
  ctx.scene.enter("startScene");
});

customerFeedScene.enter(async ctx => {
  User.find((err, users) => {
    if (err) return console.error(err);
    ctx.reply("⛩⛩⛩", backKeyboard);
    users.forEach(async u => {
      ctx.replyWithHTML(
        formatItem(u),
        Markup.inlineKeyboard([
          [
            Markup.callbackButton("⭐️", "call2"),
            Markup.callbackButton("🙅🏻‍♀️", "call3")
          ],
          [Markup.urlButton("Awesome Page", "google.com")]
        ]).extra()
      );
    });
  });
});

customerFeedScene.hears(commands.BACK, ctx => {
  ctx.scene.leave("customerFeedScene");
  ctx.scene.enter("customerMenuScene");
});

const scenes = {
  customerFeedScene,
  customerMenuScene
};
module.exports = scenes;
