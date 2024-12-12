import { Tag } from '../types'

type EditTagsModalProps = {
  allTags: Tag[]
  handleClose: () => void
  show: boolean
  onDeleteTag: (id: string) => void
  onEditTag: (id: string, label: string) => void
}

const EditTagsModal = ({ allTags, handleClose, show, onDeleteTag, onEditTag }: EditTagsModalProps) => {
  if (!show) return null

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-md p-6 w-full max-w-lg'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>Edit Tags</h2>
          <button className='text-gray-500 hover:text-gray-700' onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className='space-y-4'>
          {allTags.map(tag => (
            <div key={tag.id} className='flex items-center space-x-4'>
              <input
                type='text'
                value={tag.label}
                onChange={e => onEditTag(tag.id, e.target.value)}
                className='flex-grow border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />
              <button onClick={() => onDeleteTag(tag.id)} className='text-red-500 hover:text-red-700 font-bold'>
                &times;
              </button>
            </div>
          ))}
        </div>
        <div className='flex justify-end mt-4'>
          <button
            onClick={handleClose}
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditTagsModal
