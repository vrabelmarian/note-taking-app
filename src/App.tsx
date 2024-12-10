import { Route, Routes, useNavigate } from 'react-router-dom'
import CreateNote from './components/createNote'
import { NoteData } from './types'

function App() {
  const navigate = useNavigate()

  const createNote = (data: NoteData) => {
    console.log('New Note Created')
    console.log(data)
    navigate('/')
  }

  return (
    <>
      <div className=''>
        <Routes>
          <Route path='/' element={<h1 className='text-3xl'>Home</h1>} />
          <Route path='/new' element={<CreateNote onSubmit={createNote} />} />
        </Routes>
      </div>
    </>
  )
}

export default App
