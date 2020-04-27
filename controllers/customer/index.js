const Scene = require("telegraf/scenes/base");
const Stage = require("telegraf/stage");
const keyboard = require("./customerKeyboard");
const backKeyboard = require("../backKeyboard");
const { Markup } = require("telegraf");
const { leave } = Stage;
const commands = require("../commands");
const customer = new Scene("customerScene");
const User = require("../../models/User");
{
  /* <u>underline</u>
<s>strikethrough</s> */
}

const formatItem = item => `
<a href="tg://user?id=${item._id}"><b>${item.name}</b></a>

<b>Experience: </b>${item.experience}
<b>Speciality: </b> ${item.speciality}
<b>Interests: </b> ${item.values}
<b>Location: </b> Discord
<b>Rate: </b> free

<a href="tg://user?id=${item._id}">${item.message}</a>`;

customer.enter(async ctx => {
  await ctx.reply("Welcome dear Ninja, what would you like to do?", keyboard);
});
customer.hears(commands.FEED, async ctx => {
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
module.exports = customer;
