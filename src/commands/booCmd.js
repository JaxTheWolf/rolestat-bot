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

    for (let i = 0; i < members.length; i++) {
      nicknames.push(`**${members[i].nickname}**`)
    }
    return msg.channel.send(`**${msg.guild.member(msg.author).nickname}** scares ${nicknames.join(` and `)}! BOO!`)
  }
}
exports.booCmd = booCmd
