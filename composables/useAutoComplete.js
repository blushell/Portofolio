export const useAutoComplete = (commands) => {
  const findClosestMatch = (input) => {
    if (!input) return ''
    const availableCommands = Object.keys(commands)
    const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()))
    return matches.length > 0 ? matches[0] : input
  }

  const handleTabComplete = (input) => {
    return findClosestMatch(input)
  }

  return {
    handleTabComplete
  }
}