const { RichEmbed } = require(`discord.js`)

const embedCmd = {
  invoke: `embed`,
  aliases: [],
  desc: `Embeds a message`,
  help: `embed <message>`,
  type: `util`,
  cmdFunc: async (msg, args) => {
    if (args.length !== 0) {
      const message = args.join(` `)
      const embed = new RichEmbed()
        .setAuthor(`${msg.author.username} says:`, msg.author.displayAvatarURL)
        .setColor(0x0FF0F0)
        .setDescription(message)
      await msg.delete()
      return msg.channel.send(embed)
    }
  }
}

exports.embedCmd = embedCmd
