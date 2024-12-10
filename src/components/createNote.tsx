import { NoteData } from '../types'
import NoteForm from './noteForm'

type NewNoteProps = {
  onSubmit: (data: NoteData) => void
}

const CreateNote = ({ onSubmit }: NewNoteProps) => {
  return (
    <>
      <div className='justify-start m-3'>
        <h1 className='text-5xl'>New Note</h1>
      </div>
      <NoteForm onSubmit={onSubmit} />
    </>
  )
}

export default CreateNote
