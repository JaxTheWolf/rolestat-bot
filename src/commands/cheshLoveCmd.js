const { getNicksFromMentions } = require(`../libs/common`)
const { RichEmbed } = reuire(`discord.js`)

const cheshLoveCmd = {
  invoke: `cheshire`,
  aliases: [`cheshlove`],
  desc: `Cheshire loves us all! Congrats on 1st place in the fall photo competition!`,
  help: `<user>/<users>`,
  type: `reward`,
  cmdFunc: (msg, args, client) => {
    const ID = `398632503935631361`
    const gmembers = msg.guild.members
    const chesh = gmembers.get(ID)
    const cheshNick = !chesh.nickname ? chesh.user.username : chesh.nickname
    const emb = new RichEmbed()
      .setColor(0x00FFF0)
    let resp
    const nicknames = getNicksFromMentions(client, msg.guild, args)
    if (nicknames.length > 0) {
      const random = () => {
        const random = gmembers.random()
        let toRet
        if (!random.nickname) {
          toRet = client.users.get(random.user.id).username
        } else {
          toRet = random.nickname
        }
        return toRet
      }
      resp = `**${cheshNick}** loves ${nicknames.join(` and `)}. Even you, **${random()}**.`
    } else {
      resp = `**${cheshNick}** loves **all of you**!`
    }
    emb.setTitle(resp)
    return msg.channel.send(emb)
  }
}
exports.cheshLoveCmd = cheshLoveCmd
