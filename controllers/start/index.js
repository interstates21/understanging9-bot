const keyboard = require("./startKeyboard");
const commands = require("../commands");
const Scene = require("telegraf/scenes/base");
const picture =
  "https://www.msnbc.com/sites/msnbc/files/styles/ratio--3-2--1_5x-768x512/public/h_14382099.jpg?itok=lNWNTw7e";

const startScene = new Scene("startScene");

const text =
  "Beginning with the U.S. Privacy Act of 1974, which only applied to federal agencies, and the internationally-recognized Fair Information Practice Principles (FIPPs), a legal model known as “notice and choice” emerged — the premise was that, with sufficient information about the purposes and nature of data collection and use, individuals could make informed decisions and consent to that collection and use. Its application was guided by core principles like transparency, individual control, use limitation, data minimization, data integrity, security, and accountability";
startScene.enter(async ctx => {
  await ctx.reply(text);
  await ctx.replyWithPhoto({ url: picture });
  await ctx.reply("Please, choose your role!", keyboard);
});

startScene.hears(commands.CUSTOMER, ctx => {
  ctx.scene.leave("startScene");
  ctx.scene.enter("customerMenuScene");
});
startScene.hears(commands.PSY, ctx => {
  ctx.scene.leave("startScene");
  ctx.scene.enter("psyMenuScene");
});

module.exports = startScene;
