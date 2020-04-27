const Scene = require("telegraf/scenes/base");
const Stage = require("telegraf/stage");
const User = require("../../models/User");
const keyboards = require("./psyKeyboard");
const { leave } = Stage;
const commands = require("../commands");
const feed = require("../../feedTemp.json").profiles;
const psy = new Scene("psyScene");

const greetOldUser = user => `
Hi, <b>${user.name}</b>, nice to meet you again!

<b>Your Experience: </b>${user.experience}
<b>Your Speciality: </b> ${user.speciality}
<b>Your Interests: </b> ${user.values}
<b>Your Location: </b> Discord
<b>Your Rate: </b> free

<i>${user.message}</i>
`;

psy.enter(async ctx => {
  const uid = String(ctx.from.id);
  const user = await User.findById(uid);

  console.log("ctx = ", ctx.from);
  if (user) {
    await ctx.reply("🌎🌎🌎", keyboards.edit);
    await ctx.replyWithHTML(greetOldUser(user), keyboards.edit);
    await ctx.reply("What would you like to do?", keyboards.edit);
  } else {
    ctx.reply("CREATE", keyboards.create);
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
  }
});

// psy.command(commands.CREATE_PSY, async ctx => {

// })
// psy.leave(ctx => ctx.reply("Bye"));
module.exports = psy;

// Markup.inlineKeyboard([
//   Markup.urlButton('❤️', 'http://telegraf.js.org'),
//   Markup.callbackButton('➡️ Next', 'next')
// ]).extra())
