import { NoteData, Tag } from '../types'
import NoteForm from './noteForm'

type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onCreateTag: (tag: Tag) => void
  allTags: Tag[]
}

const CreateNote = ({ onSubmit, onCreateTag, allTags }: NewNoteProps) => {
  return (
    <>
      <div className='justify-start m-3'>
        <h1 className='text-5xl'>New Note</h1>
      </div>
      <NoteForm onSubmit={onSubmit} onCreateTag={onCreateTag} allTags={allTags} />
    </>
  )
}

export default CreateNote
