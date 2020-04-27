const Scene = require("telegraf/scenes/base");
const User = require("../../models/User");
const keyboards = require("./psyKeyboard");
const commands = require("../commands");

const psyMenuScene = new Scene("psyMenuScene");
const formScenes = require("./form");

const greetOldUser = user => `
Hi, <b>${user.name}</b>, nice to meet you again!

<b>Your Experience: </b>${user.experience}
<b>Your Speciality: </b> ${user.speciality}
<b>Your Interests: </b> ${user.values}
<b>Your Location: </b> Discord
<b>Your Rate: </b> free

<i>${user.message}</i>
`;

const createUser = ctx => {
  const now = new Date().getTime();

  const newUser = new User({
    _id: uid,
    created: now,
    username: ctx.from.username,
    name: ctx.from.first_name + " " + ctx.from.last_name,
    message: "Nice to meet you young ninja, let's help each other",
    speciality: "Positive Psychology",
    experience: "PHD in Cambridge",
    values: "Punk Rock, Peace, Love and Understanding, Running, Freedom"
  });

  newUser.save();
  ctx.reply(`New user added ${uid}`);
};

psyMenuScene.enter(async ctx => {
  const uid = String(ctx.from.id);
  const user = await User.findById(uid);

  if (user) {
    await ctx.reply("Welcome home!", keyboards.edit);
    await ctx.replyWithHTML(greetOldUser(user), keyboards.edit);
    await ctx.reply("What would you like to do?", keyboards.edit);
  } else {
    const message = `Happy to see you on our side, <b> ${ctx.from.first_name}</b>! We'd like to invite you for creating a <b> Psychology Master </b> account. Let's go?`;
    ctx.replyWithHTML(message, keyboards.create);
  }
});

psyMenuScene.hears(commands.CREATE_PSY, async ctx => {
  ctx.scene.leave("psyMenuScene");
  ctx.scene.enter("formInit");
});
psyMenuScene.hears(commands.BACK, ctx => {
  ctx.scene.leave("psyMenuScene");
  ctx.scene.enter("startScene");
});

module.exports = { psyMenuScene, formScenes };
