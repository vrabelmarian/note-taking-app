import { Note } from '../types'
import NoteCard from './noteCard'

type NotesListProps = {
  notes: Note[]
}

const NotesList = ({ notes }: NotesListProps) => {
  console.log('Notes received by NotesList:', notes)

  return (
    <div className='m-3'>
      <div className='flex justify-between items-center flex-col md:flex-row mb-4'>
        <h1 className='text-3xl mb-2 md:mb-1'>Notes</h1>
        <div className='flex space-x-4'>
          <button className='bg-green-500 px-4 rounded py-2 font-bold border-green-500 border-2'>Create</button>
          <button className='px-4 rounded py-2 font-bold border-gray-600 border-2'>Back</button>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {notes.map(note => (
          <NoteCard key={note.id} title={note.title} tags={note.tags} id={note.id} />
        ))}
      </div>
    </div>
  )
}

export default NotesList
