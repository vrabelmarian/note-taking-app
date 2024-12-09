import { Route, Routes } from 'react-router-dom'
import CreateNote from './components/createNote'

function App() {
  return (
    <>
      <div className=''>
        <Routes>
          <Route path='/' element={<h1 className='text-3xl'>Home</h1>} />
          <Route path='/new' element={<CreateNote />} />
        </Routes>
      </div>
    </>
  )
}

export default App
