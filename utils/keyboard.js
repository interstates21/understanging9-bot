const { Markup, ContextMessageUpdate } = require("telegraf");

const getMainKeyboard = ctx => {
  const feedCommand = "Feed";
  const ProfileCommand = "Profile";
  let mainKeyboard = Markup.keyboard([[feedCommand], [ProfileCommand]]);
  mainKeyboard = mainKeyboard.resize().extra();
  return;
  mainKeyboard;
};

module.exports = getMainKeyboard;
