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
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
    try {
      setNotes(prevNotes => {
        return [...prevNotes, { ...data, id: uuidV4(), tagsIds: data.tags.map(tag => tag.id) }]
      })
      toast.success('Note created successfully!')
      navigate('/')
    } catch (error) {
      toast.error('Failed to create note. ' + error)
    }
  }

  const editNote = (id: string, { tags, ...data }: NoteData) => {
    try {
      setNotes(prevNotes => {
        return prevNotes.map(note => {
          if (note.id === id) {
            return { ...note, ...data, tagsIds: tags.map(tag => tag.id) }
          } else {
            return note
          }
        })
      })
      toast.success('Note updated successfully!')
      navigate('/')
    } catch (error) {
      toast.error('Failed to update note. ' + error)
    }
  }

  const deleteNote = (id: string) => {
    try {
      setNotes(prevNotes => {
        return prevNotes.filter(note => note.id !== id)
      })
      toast.success('Note deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete note. ' + error)
    }
  }

  const createTag = (tag: Tag) => {
    try {
      setTags(prev => [...prev, tag])
      toast.success('Tag created successfully!')
    } catch (error) {
      toast.error('Failed to create tag. ' + error)
    }
  }

  function editTag(id: string, label: string) {
    try {
      setTags(prevTags => {
        return prevTags.map(tag => {
          if (tag.id === id) {
            return { ...tag, label }
          } else {
            return tag
          }
        })
      })
      toast.success('Tag updated successfully!')
    } catch (error) {
      toast.error('Failed to update tag. ' + error)
    }
  }

  function deleteTag(id: string) {
    try {
      setTags(prevTags => {
        return prevTags.filter(tag => tag.id !== id)
      })
      toast.success('Tag deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete tag. ' + error)
    }
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
        <ToastContainer
          position='bottom-left'
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable
          icon={false}
          theme='light'
        />
      </div>
    </>
  )
}

export default App
