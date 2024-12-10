export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type NoteData = {
  title: string
  body: string
  tags: Tag[]
}

// get the tag data from local storage with the id
// if the tag was changed i dont have to update all the notes
export type RawNoteData = {
  title: string
  body: string
  tagsIds: string[]
}

export type Tag = {
  id: string
  label: string
}
