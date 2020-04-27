const Telegraf = require("telegraf");
const config = require("config");
const session = require("telegraf/session");
const mongoose = require("mongoose");
const debug = require("./utils/debug");
const getKeyboard = require("./utils/keyboard");
const bot = new Telegraf(config.get("TELEGRAM_TOKEN"));
const mongoURI = config.get("MONGO_URI");
const commands = require("./controllers/commands");
const { registerScenes } = require("./scenes");

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB connected");

  const stage = registerScenes();

  bot.use(session());
  bot.use(stage.middleware());

  bot.start(ctx => ctx.scene.enter("startScene"));

  bot.startPolling();
  bot.launch();
});
