const { delMsg, sendError } = require(`../libs/common`)

const emojiCmd = {
  invoke: `emoji`,
  aliases: [],
  desc: `Sends a custom emoji`,
  help: `<emoji name>`,
  type: `util`,
  cmdFunc: (msg, args, client) => {
    if (args.length === 1) {
      const emoji = client.emojis.find(val => val.name === args[0])

      if (emoji === null) {
        return sendError(msg, `This emoji doesn't exist`)
      } else {
        const member = msg.guild.member(msg.author)
        return msg.channel.send(`**${!member.nickname ? member.user.username : member.nickname}:**`)
          .then(msg.channel.send(`${emoji}`))
          .then(delMsg(client, msg))
      }
    } else if (args.length > 1) {
      return sendError(msg, `Too many arguments!`)
    } else {
      return sendError(msg, `Too few arguments!`)
    }
  }
}

exports.emojiCmd = emojiCmd
