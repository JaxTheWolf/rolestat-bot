const emojiCmd = {
  invoke: `emoji`,
  aliases: [],
  desc: `Sends a custom emoji`,
  help: `<emoji name>`,
  type: `util`,
  cmdFunc: (msg, args, client) => {
    /* const emoji = client.emojis.map()
    console.log(emoji)
    return msg.channel.send('emoji') */

    if (args.length === 1) {
      const emoji = client.emojis.find(val => val.name === args[0])
      const member = msg.guild.member(msg.author)

      return msg.delete.then(msg.channel.send(`${!member.nickname ? msg.user.username : member.nickname}: ${emoji}`))
      /*    } else {
      const send = (msg, str) => {
        if (msg.guild.member(client.user).hasPermissions(`MANAGE_MESSAGES`)) {
          return msg.channel.send(str).then(m => m.delete(1500)).then(msg.delete())
        } else {
          return msg.channel.send(str).then(m => m.delete(1500))
        }
      }
      if (args.length > 1) {
        return send(`Too many arguments!`)
      } else {
        return send(`Too few arguments!`)
      } */
    }
  }
}

exports.emojiCmd = emojiCmd
