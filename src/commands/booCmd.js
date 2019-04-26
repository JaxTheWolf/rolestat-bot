const { getMembersFromMentions } = require(`../libs/common`)

const booCmd = {
  invoke: `boo`,
  aliases: [`spook`],
  desc: `Spooks a user/multiple users!`,
  help: `<user>/<users>`,
  type: `action`,
  cmdFunc: (msg, args, client) => {
    const members = getMembersFromMentions(client, msg.guild, args)
    const nicknames = []
    let message

    for (let i = 0; i < members.length; i++) {
      if (members[i].nickname === null) {
        nicknames.push(`**${members[i].user.username}**`)
      } else {
        nicknames.push(`**${members[i].nickname}**`)
      }
    }

    if (nicknames.length !== 0) {
      message = `**${!msg.guild.member(msg.author).nickname
        ? msg.author.username
        : msg.guild.member(msg.author).nickname}** scares ${nicknames.join(` and `)}! BOO!`
    } else {
      message = `**${!msg.guild.member(msg.author).nickname
        ? msg.author.username
        : msg.guild.member(msg.author).nickname}** scares themselves..?`
    }
    return msg.channel.send(message)
  }
}
exports.booCmd = booCmd
