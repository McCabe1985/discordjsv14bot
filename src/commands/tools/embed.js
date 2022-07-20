const {
    SlashCommandBuilder,
    EmbedBuilder,
    Embed
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Returns an embed'),

    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`This is an Embed`)
            .setDescription('This is a very cool description!')
            .setColor(0x18e1ee)
            .setImage(client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setAuthor({
                url: `https://www.patrick-mccabe.org.uk/`,
                iconURL: interaction.user.displayAvatarURL(),
                name: interaction.user.tag
            })
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: client.user.tag
            })
            .setURL(`https://www.patrick-mccabe.org.uk/`)
            .addFields([{
                    name: `Field 1`,
                    value: `Field Value 1`,
                    inline: true
                },
                {
                    name: `Field 2`,
                    value: `Field Value 2`,
                    inline: true
                }
            ]);
            await interaction.reply({
                embeds:[embed]
            });
    }
}