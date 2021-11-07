const bytes = (value, decimals, kib, maxunit) => {
  kib = kib || false
  if (value === 0) return '0 B'
  if (isNaN(parseFloat(value)) && !isFinite(value)) return 'Not an number'
  const k = kib ? 1024 : 1000
  const dm = decimals != null && !isNaN(decimals) && decimals >= 0 ? decimals : 2
  const sizes = kib ? ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB', 'BiB'] : ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB']
  var i = Math.floor(Math.log(value) / Math.log(k))
  if (maxunit != undefined) {
    const index = sizes.indexOf(maxunit)
    if (index != -1) i = index
  }
  return parseFloat((value / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export default bytes
