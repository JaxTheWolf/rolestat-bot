
/**
 * gets GuildMembers from an array of mentions
 * @param {Client} client - The client
 * @param {Guild} guild - The guild
 * @param {string[]} args - The args
 * @return {GuildMember[]}
 */

exports.getMembersFromMentions = (client, guild, args) => {
  const members = []
  args.forEach(a => {
    const match = a.match(/^<@!?(\d+)>$/)
    if (match) {
      members.push(guild.member(client.users.get(match[1])))
    }
  })
  return members
}
