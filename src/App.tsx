import { Route, Routes, useNavigate } from 'react-router-dom'
import CreateNote from './components/createNote'
import { NoteData, RawNote, Tag } from './types'
import { useLocalStorage } from './useLocalStorage'
import { v4 as uuidV4 } from 'uuid'

function App() {
  const navigate = useNavigate()

  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const createNote = (data: NoteData) => {
    setNotes(prevNotes => {
      return [...prevNotes, { ...data, id: uuidV4(), tagsIds: tags.map(tag => tag.id) }]
    })
    console.log(notes)
    navigate('/')
  }

  const createTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  return (
    <>
      <div className=''>
        <Routes>
          <Route path='/' element={<h1 className='text-3xl'>Home</h1>} />
          <Route path='/new' element={<CreateNote onSubmit={createNote} onCreateTag={createTag} allTags={tags} />} />
        </Routes>
      </div>
    </>
  )
}

export default App
