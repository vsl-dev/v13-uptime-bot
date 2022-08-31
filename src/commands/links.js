const Discord = require("discord.js")  
const { MessageEmbed } = require("discord.js") 

module.exports = { 
  name: "links", 
    description: 'Show your links.',
    run: async (client, interaction, args) => {
        var links = Object.values(client.db.fetch('links'))
        const newEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setURL('https://vsldev.tk')
        .setTitle('Your Links')
        .setDescription(links.filter(a => a.userId === interaction.user.id).map(x => x.link).join("\n") || "You don't have any links.")
        .setFooter({ text: 'vsldev.tk' })
        .setTimestamp()
        interaction.reply({ ephemeral: true, embeds: [newEmbed] })
    }
}