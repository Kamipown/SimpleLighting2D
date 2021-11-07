const hexToRGB = s => (v => ({
  r: (v >> 16) & 255,
  g: (v >> 8) & 255,
  b:  v & 255
}))(parseInt(s.substring(1), 16))

export default hexToRGB
