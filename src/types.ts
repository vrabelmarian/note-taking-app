export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string
  body: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}
