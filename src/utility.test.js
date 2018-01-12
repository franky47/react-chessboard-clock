const secondsToString = (seconds) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds - h * 3600) / 60)
  const s = Math.floor((seconds - h * 3600 - m * 60))
  const pad = x => (x < 10 ? '0' : '') + x.toString(10)
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

const countBits = (str) => {
  const count = str
    .split('')                                        // Separate characters
    .map(c => (c.charCodeAt(0) & 0x0f).toString(2))   // Convert to binary ASCII, drop 4 first bits
    .join('')                                         // Merge bytes
    .split('')                                        // Split into array of bits
    .filter((c) => c === '1')                         // Keep only the ones
    .length
  if (count > 16) {
    console.log(str, count, str.split('').map(c => (c.charCodeAt(0) & 0x0f).toString(2)).filter(c => c).join(''))
  }
  return count
}

test('all times should fit into 16 pieces', () => {
  for (let i = 0; i < 86400; ++i) {
    countBits(secondsToString(i))
  }
})
