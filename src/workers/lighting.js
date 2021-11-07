const lighting = ({ data: { ambiantLight, pointLights, colorMap, lightMap } }) => {
  const results = new Uint8ClampedArray(colorMap.imageData.length)

  const ambiantLightContribution = (() => {
    const ambiantLightIntensityNormalized = ambiantLight.intensity / 100 / 255
    return {
      r: ambiantLight.color.r * ambiantLightIntensityNormalized,
      g: ambiantLight.color.g * ambiantLightIntensityNormalized,
      b: ambiantLight.color.b * ambiantLightIntensityNormalized,
    }
  })()

  const pointLightsNormalized = pointLights.map(light => {
    const pointLightsIntensityNormalized = light.intensity / 100
    return {
      r: light.color.r * pointLightsIntensityNormalized,
      g: light.color.g * pointLightsIntensityNormalized,
      b: light.color.b * pointLightsIntensityNormalized,
    }
  })

  let x, y, i, progress, pointLightContributions, dx, dy, d, power
  const p0 = { r: 0, g: 0, b: 0 }
  for (y = 0; y < colorMap.height; ++y) {
    for (x = 0; x < colorMap.width; ++x) {
      i = x * 4 + colorMap.width * y * 4
      
      if (progress < parseInt(i / results.length * 100)) {
        self.postMessage({
          type: 'progress',
          value: ++progress
        })
      }

      pointLightContributions = pointLights.map((light, lightIndex) => {
        dx = x - light.x
        dy = y - light.y
        d = Math.sqrt(dx * dx + dy * dy)
        
        if (d <= light.radius) {
          power = (1 - d / light.radius) * lightMap.imageData[i] / 255
          return {
            r: pointLightsNormalized[lightIndex].r * power,
            g: pointLightsNormalized[lightIndex].g * power,
            b: pointLightsNormalized[lightIndex].b * power
          }
        }
        else {
          return p0
        }
      }).reduce((acc, next) => ({
        r: acc.r + next.r,
        g: acc.g + next.g,
        b: acc.b + next.b
      }), p0)

      results[i] = colorMap.imageData[i] * ambiantLightContribution.r + pointLightContributions.r
      results[i + 1] = colorMap.imageData[i + 1] * ambiantLightContribution.g + pointLightContributions.g
      results[i + 2] = colorMap.imageData[i + 2] * ambiantLightContribution.b + pointLightContributions.b
      results[i + 3] = colorMap.imageData[i + 3]
      
    }
  }

  self.postMessage({
    type: 'end',
    value: results
  })
}

export default lighting;
