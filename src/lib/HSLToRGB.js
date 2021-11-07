import RGBToHex from './RGBToHex'

const normalizeRGB = (color, m) => {
  color = Math.floor((color + m) * 255)
  if (color < 0)
      color = 0
  return color
}

const HSLToRGB = (hsl) => {
  let h = hsl.h,
      s = hsl.s,
      l = hsl.l,
      c = (1 - Math.abs(2*l - 1)) * s,
      x = c * ( 1 - Math.abs((h / 60 ) % 2 - 1 )),
      m = l - c/ 2,
      r, g, b

  if (h < 60) {
    r = c
    g = x
    b = 0
  }
  else if (h < 120) {
    r = x
    g = c
    b = 0
  }
  else if (h < 180) {
    r = 0
    g = c
    b = x
  }
  else if (h < 240) {
    r = 0
    g = x
    b = c
  }
  else if (h < 300) {
    r = x
    g = 0
    b = c
  }
  else {
    r = c
    g = 0
    b = x
  }

  r = normalizeRGB(r, m)
  g = normalizeRGB(g, m)
  b = normalizeRGB(b, m)

  return RGBToHex(r, g, b)
}

export default HSLToRGB
