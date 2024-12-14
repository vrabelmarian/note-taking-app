import { useMemo, useState } from 'react'
import { Note, Tag } from '../types'
import NoteCard from './noteCard'
import ReactSelect from 'react-select/creatable'
import { useNavigate } from 'react-router-dom'
import EditTagsModal from './editTagsModal'

type NotesListProps = {
  notes: Note[]
  allTags: Tag[]
  onDeleteTag: (id: string) => void
  onEditTag: (id: string, label: string) => void
}

const NotesList = ({ notes, allTags, onDeleteTag, onEditTag }: NotesListProps) => {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<Tag[]>([])
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)

  const navigate = useNavigate()

  //filter notes to those that include the searched title as note.title
  //and has every searched tag as note.tags (compare with ids)
  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        (title === '' || note.title.toLowerCase().includes(title.toLowerCase())) &&
        (tags.length === 0 || tags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
      )
    })
  }, [title, tags, notes])

  return (
    <div className='m-3'>
      <div className='flex justify-between items-center flex-col md:flex-row mb-4'>
        <h1 className='text-3xl mb-2 md:mb-1'>Notes</h1>
        <div className='flex space-x-4'>
          <button
            className='bg-green-500 px-4 rounded py-2 font-bold border-green-500 border-2'
            onClick={() => navigate('/new')}
          >
            Create
          </button>
          <button
            className='px-4 rounded py-2 font-bold border-gray-600 border-2'
            onClick={() => setEditTagsModalIsOpen(true)}
          >
            Edit Tags
          </button>
        </div>
      </div>
      <div className='w-full flex flex-col md:flex-row justify-evenly gap-6 mb-8'>
        <div className='flex flex-col w-full md:w-1/2 gap-2'>
          <h3 className='text-xl'>Title</h3>
          <input
            type='text'
            className='border-black border-2 rounded-md h-10 focus:outline-none focus:border-blue-500 focus:border-4 p-2 focus:p-1'
            required
            placeholder='Search'
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className='flex flex-col w-full md:w-1/2 gap-2'>
          <h3 className='text-xl'>Tags</h3>
          <ReactSelect
            isMulti
            value={tags.map(tag => {
              return { label: tag.label, value: tag.id }
            })}
            options={allTags.map(tag => {
              return { label: tag.label, value: tag.id }
            })}
            onChange={tags => {
              setTags(
                tags.map(tag => {
                  return { label: tag.label, id: tag.value }
                }),
              )
            }}
            styles={{
              control: base => ({
                ...base,
                borderColor: 'black',
                borderWidth: '2px',
                borderRadius: '0.375rem',
              }),
            }}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:ml-6 md:mr-6 ml-3 mr-3'>
        {filteredNotes.map(note => (
          <NoteCard key={note.id} title={note.title} tags={note.tags} id={note.id} />
        ))}
      </div>
      <EditTagsModal
        onEditTag={onEditTag}
        onDeleteTag={onDeleteTag}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        allTags={allTags}
      />
    </div>
  )
}

export default NotesList
