import RGBToHSL from './RGBToHSL'
import HSLToRGB from './HSLToRGB'

const shiftHue = (hex, degree) => {
  var hsl = RGBToHSL(hex)
  hsl.h += degree
  if (hsl.h > 360)
      hsl.h -= 360
  else if (hsl.h < 0)
      hsl.h += 360
  return HSLToRGB(hsl)
}

export default shiftHue
