const { Client } = require(`discord.js`)
const conf = require(`./conf.json`)
const { CommandParser } = require(`./CommandParser`)
const bot = new Client({ disabledEvents: [`GUILD_SYNC`, `GUILD_UPDATE`, `CHANNEL_CREATE`, `CHANNEL_DELETE`, `CHANNEL_UPDATE`, `TYPING_START`, `RELATIONSHIP_ADD`, `RELATIONSHIP_REMOVE`] })
const cmds = new CommandParser(bot, conf.prefix)

const round = (num, places) => {
  return Math.round(num * Math.pow(10, places)) / Math.pow(10, places)
}

bot.on(`ready`, () => {
  bot.user.setActivity(`Try ${conf.prefix}help!`)
  console.log(`ready`)
})

const countFunc = (msg, args) => {
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
cmds.register(countFunc, `count`, [`countRoles`, `roles`], `Get the % of people that have a certain role`, `${conf.prefix}count <roleName> (Case sensitive!)`, `info`)

bot.login(conf.token)
