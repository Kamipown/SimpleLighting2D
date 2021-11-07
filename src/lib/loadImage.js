const loadImage = (src, callback) => {
  const img = new Image()
  img.addEventListener("load", () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
    const imageData = ctx.getImageData(0, 0, img.width, img.height).data
    callback({
      imageData,
      width: img.width,
      height: img.height
    })
  })
  img.src = src
}

export default loadImage
