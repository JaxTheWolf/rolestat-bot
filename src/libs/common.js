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
  return members
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
  const authorNick = msg.guild.member(msg.author).nickname
  const nicknames = []
  let message = actionMsg.replace(`%author`, `${authorNick}`)

  for (let i = 0; i < members.length; i++) {
    if (members[i].nickname === null) {
      nicknames.push(`**${members[i].user.username}**`)
    } else {
      nicknames.push(`**${members[i].nickname}**`)
    }
  }

  if (nicknames.length !== 0) {
    switch (message.includes(`%other's`)) {
    case true:
      message = message.replace(`%other's`, `${nicknames.join(` and `)}'s`)
      break
    case false:
      message = message.replace(`%other`, `${nicknames.join(` and `)}`)
      break
    }
  } else {
    switch (message.includes(`%other's`)) {
    case true:
      message = message.replace(`%other's`, `their`)
      break
    case false:
      message = message.replace(`%other`, `themselves`)
      break
    }
  }
  return msg.channel.send(message)
}
