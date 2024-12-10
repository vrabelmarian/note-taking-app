import { Route, Routes, useNavigate } from 'react-router-dom'
import CreateNote from './components/createNote'
import { NoteData, RawNote, Tag } from './types'
import { useLocalStorage } from './useLocalStorage'
import { v4 as uuidV4 } from 'uuid'
import NotesList from './components/notesList'
import { useMemo } from 'react'

function App() {
  const navigate = useNavigate()

  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      const mappedTags = tags.filter(tag => note.tagsIds.includes(tag.id))
      return { ...note, tags: mappedTags }
    })
  }, [notes, tags])

  const createNote = (data: NoteData) => {
    setNotes(prevNotes => {
      return [...prevNotes, { ...data, id: uuidV4(), tagsIds: data.tags.map(tag => tag.id) }]
    })
    navigate('/')
  }

  const createTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  return (
    <>
      <div className=''>
        <Routes>
          <Route path='/' element={<NotesList notes={notesWithTags} />} />
          <Route path='/new' element={<CreateNote onSubmit={createNote} onCreateTag={createTag} allTags={tags} />} />
        </Routes>
      </div>
    </>
  )
}

export default App
