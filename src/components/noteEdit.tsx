import { NoteData, Tag } from '../types'
import NoteForm from './noteForm'
import { useNote } from './noteLayout'

type NoteEditProps = {
  onSubmit: (id: string, data: NoteData) => void
  onCreateTag: (tag: Tag) => void
  allTags: Tag[]
}

const NoteEdit = ({ onSubmit, onCreateTag, allTags }: NoteEditProps) => {
  const note = useNote()
  return (
    <>
      <div className='mb-4'>Edit Note</div>
      <NoteForm
        title={note.title}
        body={note.body}
        tags={note.tags}
        onSubmit={data => onSubmit(note.id, data)}
        onCreateTag={onCreateTag}
        allTags={allTags}
      />
    </>
  )
}

export default NoteEdit
