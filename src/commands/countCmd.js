const round = (num, places) => {
  return Math.round(num * Math.pow(10, places)) / Math.pow(10, places)
}

const countCmd = {
  invoke: `count`,
  aliases: [`countRoles`, `roles`],
  desc: `Get the % of people that have a certain role`,
  help: `count <roleName> (Case sensitive!)`,
  type: `info`,
  cmdFunc: (msg, args) => {
    const count = { has: 0, nohas: 0 }
    msg.guild.members.map(m => {
      if (m.roles.some(r => r.name === args.join(` `))) {
        count.has++
      } else {
        count.nohas++
      }
    })
    return msg.channel.send(`${count.has} members have this role and ${count.nohas} don't have this role\nSo that means that approx. ${round((100 * count.has) / msg.guild.memberCount, 2)}% of members have it`)
  }
}

exports.countCmd = countCmd
