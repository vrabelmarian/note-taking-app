import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { Note } from '../types'

type NoteLayoutProps = {
  notes: Note[]
}

export const NoteLayout = ({ notes }: NoteLayoutProps) => {
  const { id } = useParams()
  const note = notes.find(n => n.id === id)

  if (note == null) return <Navigate to='/' replace />

  return <Outlet context={note} />
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNote = () => {
  return useOutletContext<Note>()
}
