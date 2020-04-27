const { Markup } = require("telegraf");
const commands = require("../commands");

const keyboards = {
  edit: Markup.keyboard([[commands.EDIT_PSY], [commands.BACK]])
    .oneTime()
    .resize()
    .extra(),
  create: Markup.keyboard([[commands.CREATE_PSY], [commands.BACK]])
    .oneTime()
    .resize()
    .extra()
};

module.exports = keyboards;
