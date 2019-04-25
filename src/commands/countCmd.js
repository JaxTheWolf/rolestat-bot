const { RichEmbed } = require(`discord.js`)

const round = (num, places) => {
  return Math.round(num * Math.pow(10, places)) / Math.pow(10, places)
}

const countCmd = {
  invoke: `count`,
  aliases: [`countRoles`, `roles`],
  desc: `Get the % of people that have a certain role`,
  help: `<roleName> (Case sensitive!)`,
  type: `info`,
  cmdFunc: (msg, args, client) => {
    const count = { has: 0, nohas: 0 }
    const roleName = args.join(` `)
    msg.guild.members.map(m => {
      if (m.roles.some(r => r.name === roleName)) {
        count.has++
      } else {
        count.nohas++
      }
    })
    const eb = new RichEmbed()
      .setColor(0x00FFF0)
      .setAuthor(`Here are the statistics of the ${roleName} role:`, client.user.displayAvatarURL)
      .addField(`Amount of users that have this role`, count.has, true)
      .addField(`amount of users that don't have this role`, count.nohas, true)
      .addField(`Percentage of users that have it`, `${round((100 * count.has) / msg.guild.memberCount, 2)}%`, true)
      .setTimestamp()
    return msg.channel.send(eb)
  }
}

exports.countCmd = countCmd
