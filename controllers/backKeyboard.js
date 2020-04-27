const { Markup } = require("telegraf");
const commands = require("./commands");

const markup = Markup.keyboard([[commands.BACK]])
  .oneTime()
  .resize()
  .extra();

module.exports = markup;
