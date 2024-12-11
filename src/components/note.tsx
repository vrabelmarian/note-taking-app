import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useNote } from './noteLayout'
import remarkGfm from 'remark-gfm'

const Note = () => {
  const note = useNote()

  const navigate = useNavigate()

  return (
    <div className='m-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-4'>
        <div className='mb-4'>
          <h1 className='text-3xl font-bold mb-2'>{note.title}</h1>
          <div className='flex flex-wrap gap-2'>
            {note.tags.map(tag => (
              <span key={tag.id} className='bg-blue-500 text-white px-3 py-1 text-sm rounded-md'>
                {tag.label}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className='mt-4 md:mt-0 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md'
        >
          Back
        </button>
      </div>
      <div className='markdown'>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.body}</ReactMarkdown>
      </div>
    </div>
  )
}

export default Note
