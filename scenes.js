const Stage = require("telegraf/stage");
const { leave } = Stage;
const startScene = require("./controllers/start");
const {
  customerFeedScene,
  customerMenuScene
} = require("./controllers/customer");
const { psyMenuScene, formScenes } = require("./controllers/psy");

const registerScenes = () => {
  const stage = new Stage();
  stage.command("cancel", leave());

  stage.register(startScene);
  stage.register(customerMenuScene);
  stage.register(customerFeedScene);
  stage.register(psyMenuScene);

  Object.values(formScenes).forEach(scene => {
    stage.register(scene);
  });

  return stage;
};

module.exports.registerScenes = registerScenes;
