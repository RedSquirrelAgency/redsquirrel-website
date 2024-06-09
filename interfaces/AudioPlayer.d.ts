interface ISound {
  src: string
  transcription: ITranscriptionItem[]
  name?: string
}

interface ITranscriptionItem {
  start: number
  end: number
  text: string
}
