const {Collection} = require("discord.js"),
      {readdirSync} = require("fs")
var clc = require("cli-color");
module.exports = (client, interaction) => {
  client.commands = new Collection() 
  var files = readdirSync("./src/commands")
  var props;
  for(var file in files) {
    props = require("../commands/" + files[file])
    client.commands.set(props.name, props)
    console.log(`${props.name} Loaded!`) 
  }
  var allFiles = client.commands.map(a => {
    return {name: a.name, description: a.description, options: a.options}
  })
  client.on("ready", async() => {
client.application.commands.set(allFiles) 
    console.log("[Bot]: Slash command loaded for " + client.guilds.cache.size + ".")
    console.log("[Bot]: Slash commands loaded successfully.")
	console.log(`[Bot]: Logged in as ${clc.green(client.user.tag)}!`);
   client.user.setPresence({ activities: [{ name: 'vsldev.tk' }], status: 'idle' });
}) 
  client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return;
    if (!client.commands.get(interaction.commandName)) return
    interaction.selectedValue = (interaction.options._hoistedOptions[0]) ? interaction.options._hoistedOptions[0].value : undefined
    const komut = client.commands.get(interaction.commandName)
    komut.run(client, interaction)
  })
} 