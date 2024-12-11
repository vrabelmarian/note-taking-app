import { useNavigate } from 'react-router-dom'
import { Tag } from '../types'

type NoteCardProps = {
  title: string
  tags: Tag[]
  id: string
}

const NoteCard = ({ title, tags, id }: NoteCardProps) => {
  const navigate = useNavigate()

  return (
    <div
      className='border-gray-400 border rounded-md h-32 flex flex-col justify-center items-center shadow-md transition-transform transform hover:shadow-lg hover:border-blue-500'
      onClick={() => navigate(`/${id}`)}
    >
      <div className='mb-2 text-lg font-bold'>{title}</div>
      <div>
        {tags.map((tag, index) => (
          <span key={index} className='bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-md mx-1'>
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default NoteCard
