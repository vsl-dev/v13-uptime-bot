const Discord = require("discord.js")  
const { MessageEmbed } = require("discord.js") 

module.exports = { 
  name: "link-count", 
    description: 'Show how much links in database.',
    run: async (client, interaction, args) => {
        var links = Object.values(client.db.fetch('links')).length
        interaction.reply({ ephemeral: true, content: links + ' link in database!' })
    }
}