const { Markup } = require("telegraf");
const commands = require("../commands");

const markup = Markup.keyboard([
  [commands.PSY, commands.CUSTOMER] // Row1 with 2 buttons
])
  .oneTime()
  .resize()
  .extra();

module.exports = markup;
