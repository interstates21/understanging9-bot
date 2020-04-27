const Scene = require("telegraf/scenes/base");
const User = require("../../models/User");
const backKeyboard = require("../backKeyboard");
const commands = require("../commands");

const formInit = new Scene("formInit");
const formSpeciality = new Scene("formSpeciality");
const formExperience = new Scene("formExperience");
const formValues = new Scene("formValues");
const formRate = new Scene("formRate");
const formLocation = new Scene("formLocation");
const formMessage = new Scene("formMessage");
const formVerified = new Scene("formVerified");

/* #init */

formInit.enter(async ctx => {
  ctx.session.newUser = {
    entered_name: "",
    speciality: "",
    experience: "",
    values: "",
    message: "",
    rate: "",
    location: "",
    verified: false
  };
  const message = `<b> Step 1/7.</b> Type the name you'd like to be called
  
  <code>Dr. Richard P. Feynman </code>
`;

  await ctx.replyWithHTML(message, backKeyboard);
});
formInit.hears(commands.BACK, ctx => {
  ctx.scene.leave("formInit");
  ctx.scene.enter("psyMenuScene");
});

formInit.on("text", async ctx => {
  ctx.session.newUser.entered_name = ctx.message.text;
  ctx.scene.enter("formSpeciality");
});

/* #speciality */

formSpeciality.enter(async ctx => {
  const message = `<b> Step 2/7.</b> Type a field of your interest/specialization.
  
  <code> Social Engineering, Teenagers, Addictions </code>
`;

  await ctx.replyWithHTML(message, backKeyboard);
});
formSpeciality.hears(commands.BACK, ctx => {
  ctx.scene.leave("formSpeciality");
  ctx.scene.enter("formInit");
});

formSpeciality.on("text", async ctx => {
  ctx.session.newUser.speciality = ctx.message.text;
  ctx.scene.leave("formSpeciality");
  ctx.scene.enter("formExperience");
});

/* #experience */

formSpeciality.enter(async ctx => {
  const message = `<b> Step 3/7.</b> Type a field of your interest/specialization.
  
  <code>Social Engineering, Teenagers, Addictions </code>
`;

  await ctx.replyWithHTML(message, backKeyboard);
});
formSpeciality.hears(commands.BACK, ctx => {
  ctx.scene.leave("formSpeciality");
  ctx.scene.enter("formInit");
});

formSpeciality.on("text", async ctx => {
  ctx.session.newUser.speciality = ctx.message.text;
  ctx.scene.leave("formSpeciality");
  ctx.scene.enter("formExperience");
});

const scenes = {
  formInit,
  formSpeciality,
  formExperience,
  formValues,
  formRate,
  formLocation,
  formMessage,
  formVerified
};

module.exports = scenes;
