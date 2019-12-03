const { getNicksFromMentions } = require(`../libs/common`)

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

    try {
      const nicknames = getNicksFromMentions(client, msg.guild, args)
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

      return msg.channel.send(`**${cheshNick}** loves ${nicknames}. Even you, **${random()}**.`)
    } catch (e) {
      console.log(e)
      return msg.channel.send(`**${cheshNick}** loves all of you!`)
    }

    /*    if (!nicknames) {
      return msg.channel.send(`${cheshNick} loves all of you!`)
    } else {
      const random = (msg, members) => {
        const random = members.random()
        let toRet
        if (!random.nickname) {
          toRet = client.users.get(random.user.username)
        } else {
          toRet = random.nickname
        }
        return toRet
      }

      return msg.channel.send(`${cheshNick} loves ${nicknames}. Even you, ${random(msg, gmembers)}`)
    } */
  }
}
exports.cheshLoveCmd = cheshLoveCmd
