const Telegraf = require("telegraf");
const config = require("config");
const session = require("telegraf/session");
const mongoose = require("mongoose");
const debug = require("./utils/debug");
const getKeyboard = require("./utils/keyboard");
const bot = new Telegraf(config.get("TELEGRAM_TOKEN"));
const Stage = require("telegraf/stage");
const { leave } = Stage;
const mongoURI = config.get("MONGO_URI");
const commands = require("./controllers/commands");

const start = require("./controllers/start");
const customerScene = require("./controllers/customer");
const psyScene = require("./controllers/psy");

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB connected");
  // Create scene manager
  const stage = new Stage();
  stage.command("cancel", leave());

  // Scene registration
  stage.register(start);
  stage.register(customerScene);
  stage.register(psyScene);

  bot.use(session());
  bot.use(stage.middleware());

  bot.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log("Response time: %sms", ms);
  });

  bot.start(ctx => ctx.scene.enter("start"));
  bot.hears(commands.CUSTOMER, ctx => ctx.scene.enter("customerScene"));
  bot.hears(commands.PSY, ctx => ctx.scene.enter("psyScene"));
  bot.hears(commands.BACK, ctx => ctx.scene.enter("start"));

  bot.startPolling();
  bot.launch();
});
