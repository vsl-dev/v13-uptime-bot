const Discord = require("discord.js")  
const { MessageEmbed } = require("discord.js") 

module.exports = { 
  name: "help", 
    description: 'Just help page.',
    run: async (client, interaction, args) => {
        const helpEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setURL('https://vsldev.tk')
        .setTitle('BOTNAME Help')
        .setDescription(`> **How add links to system?** \n > You can add the link to the uptime system by typing \`/uptime add {link}\` with very simple slash commands!`)
        .setFooter({ text: 'vsldev.tk' })
        .setTimestamp()
        interaction.reply({ embeds: [helpEmbed] })
    }
}