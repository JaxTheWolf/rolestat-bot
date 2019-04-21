const { Client } = require(`discord.js`)
const conf = require(`./conf.json`)
const bot = new Client({ disabledEvents: [`GUILD_SYNC`, `GUILD_UPDATE`, `CHANNEL_CREATE`, `CHANNEL_DELETE`, `CHANNEL_UPDATE`, `TYPING_START`, `RELATIONSHIP_ADD`, `RELATIONSHIP_REMOVE`] })

bot.on(`ready`, () => {
  console.log(`ready`)
})

bot.on(`message`, (msg, client) => {
  const args = msg.content.slice(conf.prefix.length).split(' ')
  const command = args.shift().toLowerCase()

  msg.say = str => {
    msg.channel.send(str)
  }
  if (!msg.content.startsWith(conf.prefix) || msg.author.bot) return

  if (command === `count`) {
    const count = { has: 0, nohas: 0 }
    msg.guild.members.map(m => {
      if (m.roles.some(r => r.name === args.join(` `))) {
        count.has++
      } else {
        count.nohas++
      }
    })
    msg.say(`${count.has} members have this role and ${count.nohas} don't have this role
    So that means that approx. ${Math.round((100 * count.has) / msg.guild.memberCount)}% of members have it`)
  }
})

bot.login(conf.token)
