/**
 * gets GuildMembers from an array of mentions
 * @param {Client} client - the discord.js client instance
 * @param {Guild} guild - the guild from which members will be selected
 * @param {string[]} ids - the array of user IDs
 * @return {GuildMember[]}
 */
exports.getMembersFromMentions = (client, guild, ids) => {
  const members = []
  ids.forEach(a => {
    const match = a.match(/^<@!?(\d+)>$/)
    if (match) {
      members.push(guild.member(client.users.get(match[1])))
    }
  })
  return [...new Set(members)]
}

/**
 * sends an action message
 * @param {Client} client - the discord.js client instance
 * @param {Message} msg - an object representing a Discord message
 * @param {string} actionMsg - the message taht gets sent
 * @param {string[]} args - args gathered from a command
 * @return {Promise}
 */
exports.sendAction = (client, msg, actionMsg, args) => {
  const members = exports.getMembersFromMentions(client, msg.guild, args)
  const authorNick = !msg.guild.member(msg.author).nickname
    ? msg.author.username
    : msg.guild.member(msg.author).nickname
  const nicknames = []
  let message
  if (Array.isArray(actionMsg)) {
    message = actionMsg[Math.floor(Math.random() * actionMsg.length)].replace(/(%author)/g, authorNick)
  } else {
    message = actionMsg.replace(`%author`, authorNick)
  }

  members.forEach(member => {
    if (!member.nickname) {
      nicknames.push(`**${member.user.username}**`)
    } else {
      nicknames.push(`**${member.nickname}**`)
    }
  })

  if (nicknames.length !== 0) {
    message = message.replace(/(%other)/g, `${nicknames.join(` and `)}`)
  }
  return msg.channel.send(message)
}
