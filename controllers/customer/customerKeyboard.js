const { Markup } = require("telegraf");
const commands = require("../commands");

const markup = Markup.keyboard([
  [commands.FEED],
  [commands.BACK]
])
  .oneTime()
  .resize()
  .extra();

module.exports = markup;
