const Discord = require("discord.js")  
const { MessageEmbed } = require("discord.js") 
const moment = require('moment')

module.exports = { 
  name: "uptime", 
    description: 'Uptime system.',
	options: [
		{
			name: "type",
			description: "Select type",
			type: 3,
			required: true,
			choices: [
				{ name: 'Add', value: 'add' }, { name: 'Delete', value: 'delete' }, { name: 'Info', value: 'info' }
			]
		},
        {
            name: "link",
            description: 'Add link for progress',
            type: 3,
            required: true
        }
	],
    run: async (client, interaction, args) => {
		const link = interaction.options.getString('link')
		const opt = interaction.options.getString('type')
		const checkLink = Object.values(client.db.fetch('links')).filter(x => x.userId === interaction.user.id).find(x => x.link === link)
		if(opt === 'add') {
			const checkUrl = link.startsWith('https://')
			if(!checkUrl) return interaction.reply('This is not a link!') // Only https:// links
			if((checkLink == null) == false) return interaction.reply({ content: 'This link already exists in the database!', ephemeral: true })
			var id = randomstring(30)
			var Data = {
				userId: interaction.user.id,
				link: link,
				id: id,
				added: Date.now()
			}
			client.db.set(`links.${id}`, Data)
			const newEmbed = new MessageEmbed()
			.setColor('GREEN')
			.setTitle('Link succesfulfy added!')
			.setDescription('Your link successfully added to database!')
			.setTimestamp()
			interaction.reply({ ephemeral: true, embeds: [newEmbed] })
		} else if(opt === 'delete') {
			if(checkLink == null) return interaction.reply({ content: 'Link not found!', ephemeral: true })
			client.db.delete(`links.${checkLink.id}`)
			const newEmbed = new MessageEmbed()
			.setColor('RED')
			.setTitle('Link successfully deleted!')
			.setDescription('Your link successfully deleted from database!')
			.setTimestamp()
			interaction.reply({ ephemeral: true, embeds: [newEmbed] })
		} else if(opt === 'info') {
			if(checkLink == null) return interaction.reply({ content: 'Link not found!', ephemeral: true })
			const newEmbed = new MessageEmbed()
			.setColor('GREEN')
			.setTitle('Link information!')
			.setDescription(`Link Owner: <@${interaction.user.id}> \n Link Id: \`${checkLink.id}\` \n When Added: ${moment(checkLink.added).from()} \n Link: || ${checkLink.link} ||`)
			.setTimestamp()
			interaction.reply({ ephemeral: true, embeds: [newEmbed] })
		}
    }
}

 function randomstring(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() *
			charactersLength));
	}
	return result;
} 