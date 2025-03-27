const toDataURL = async (url: string): Promise<string | ArrayBuffer | null> => {
  return await fetch(`/${url}`)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
    )
}

const dataURLtoFile = (dataURL: string, filename: string): File => {
  const arr = dataURL.split(',')
  const mime = arr[0]?.match(/:(.*?);/)?.[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

export const imgSrcToFile = async (url: string): Promise<File> => {
  try {
    const dataUrl = await toDataURL(url)
    if (typeof dataUrl !== 'string') {
      console.log('dataUrl is not a string')
      throw new Error('dataUrl is not a string')
    }
    return dataURLtoFile(dataUrl, 'imageName.jpg')
  } catch (error) {
    throw error
  }
}
