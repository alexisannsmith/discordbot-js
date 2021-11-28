const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { getPost } = require('random-reddit');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Dank maymays.'),

        async execute(interaction) {
                const post = await getPost(['memes', 'dankmemes', 'bikinibottomtwitter'])
                let upvotes = post.ups
                let downvotes = post.downs
                let comments = post.num_comments
                let title = post.title
                let link = post.permalink
                let url = `https://www.reddit.com${link}`
                let author = post.author


                const memeEmbed = new MessageEmbed()
                    .setColor('RED')
                    .setTitle(title)
                    .setURL(url)
                    .setImage(`${post.url}`)
                    .setAuthor(author)
                    .setFooter(`👍 ${ upvotes} | 👎 ${ downvotes} | 💬 ${comments}`)

                interaction.reply({embeds: [memeEmbed]});
    }
}