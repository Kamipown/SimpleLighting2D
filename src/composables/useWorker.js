const useWorker = workerFunction => {
  const blob = new Blob(['self.onmessage = ', workerFunction.toString()], { type: 'text/javascript' })
  const url = URL.createObjectURL(blob)
  const worker = new Worker(url)
  return worker
}

export default useWorker
