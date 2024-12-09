import NoteForm from './noteForm'

const CreateNote = () => {
  return (
    <>
      <div className='justify-start m-3'>
        <h1 className='text-5xl'>New Note</h1>
      </div>
      <NoteForm />
    </>
  )
}

export default CreateNote
