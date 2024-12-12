import { Route, Routes, useNavigate } from 'react-router-dom'
import CreateNote from './components/createNote'
import { NoteData, RawNote, Tag } from './types'
import { useLocalStorage } from './useLocalStorage'
import { v4 as uuidV4 } from 'uuid'
import NotesList from './components/notesList'
import { useMemo } from 'react'
import { NoteLayout } from './components/noteLayout'
import Note from './components/note'
import NoteEdit from './components/noteEdit'

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

  const editNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id == id) {
          return { ...note, ...data, tagsIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
    navigate('/')
  }

  const deleteNote = (id: string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  const createTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  function editTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <>
      <div className=''>
        <Routes>
          <Route
            path='/'
            element={<NotesList notes={notesWithTags} allTags={tags} onEditTag={editTag} onDeleteTag={deleteTag} />}
          />
          <Route path='/new' element={<CreateNote onSubmit={createNote} onCreateTag={createTag} allTags={tags} />} />
          <Route path='/:id' element={<NoteLayout notes={notesWithTags} />}>
            <Route index element={<Note onDeleteNote={deleteNote} />} />
            <Route path='edit' element={<NoteEdit onSubmit={editNote} onCreateTag={createTag} allTags={tags} />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
