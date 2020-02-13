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
* gets nicknames from an array of mentions
* @param {Client} client - the discord.js client instance
* @param {Guild} guild - the guild from which members will be selected
* @param {string[]} ids - the array of user IDs
* @return {String[]}
*/

exports.getNicksFromMentions = (client, guild, ids) => {
  const members = exports.getMembersFromMentions(client, guild, ids)
  const nicknames = []
  members.forEach(member => {
    if (!member.nickname) {
      nicknames.push(`**${member.user.username}**`)
    } else {
      nicknames.push(`**${member.nickname}**`)
    }
  })
  return nicknames
}

/**
 * sends an action message
 * @param {Client} client - the discord.js client instance
 * @param {Message} msg - an object representing a Discord message
 * @param {string} actionMsg - the message that gets sent
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

  if (nicknames) {
    message = message.replace(/(%other)/g, `${nicknames.join(` and `)}`)
  }

  const RE = require(`discord.js`).RichEmbed
  const embed = new RE()
    .setTitle(message)
    .setColor(0x00FFF0)

  members.forEach(m => {
    switch (message.includes(`brush`)) {
    case true:
      const images = {
        batto: [
          `batto.jpg`,
          `batto1.png`
        ]
      }
      if (m.user.id === `547661721930694657`) { // Skyler's ID
        embed.attachFile(`src/libs/imgs/${images.batto[Math.floor(Math.random() * images.batto.length)]}`)
      }
    }
  })
  return msg.channel.send({ embed })
}

/**
 * deletes a message if the bot has proper perms
 * @param {Client} client - the discord.js client instance
 * @param {Message} msg - an object representing a Discord message
 * @return {Promise}
 */

exports.delMsg = (client, msg) => {
  if (msg.guild.member(client.user).hasPermissions(`MANAGE_MESSAGES`)) {
    msg.delete()
  }
}

/**
 * sends and deletes a message in x ms
 * @param {Message} msg - an object representing a Discord message
 * @param {string} str - the error message that gets sent
 * @param {Number} [time = 7500] - the duration after which the message will get deleted (in ms)
 * @return {Promise}
 */

exports.sendError = (msg, str, time = 7500) => {
  return msg.channel.send(str).then(m => m.delete(time))
}
