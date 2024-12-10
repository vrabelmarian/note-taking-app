import { useNavigate } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import { NoteData, Tag } from '../types'
import { FormEvent, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onCreateTag: (tag: Tag) => void
  allTags: Tag[]
}

const NoteForm = ({ onSubmit, onCreateTag, allTags }: NoteFormProps) => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState<Tag[]>([])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({
      title: title,
      body: body,
      tags: tags,
    })
  }

  return (
    <>
      <div className='m-3'>
        <form onSubmit={handleSubmit}>
          <div className='w-full flex flex-row justify-evenly gap-6'>
            <div className='flex flex-col w-1/2 gap-2'>
              <h3 className='text-3xl'>Title</h3>
              <input
                type='text'
                value={title}
                onChange={e => setTitle(e.target.value)}
                className='border-black border-2 rounded-md h-10 focus:outline-none focus:border-blue-500 focus:border-4 p-2 focus:p-1'
                required
                placeholder='Note title'
              />
            </div>
            <div className='flex flex-col w-1/2 gap-2'>
              <h3 className='text-3xl'>Tags</h3>
              <CreatableReactSelect
                onCreateOption={label => {
                  const createdTag = { id: uuidV4(), label }
                  onCreateTag(createdTag)
                  setTags(prevTags => [...prevTags, createdTag])
                }}
                isMulti
                options={allTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                value={tags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                onChange={tags => {
                  setTags(
                    tags.map(tag => {
                      return { label: tag.label, id: tag.value }
                    }),
                  )
                }}
                styles={{
                  control: base => ({
                    ...base,
                    borderColor: 'black',
                    borderWidth: '2px',
                    borderRadius: '0.375rem',
                  }),
                }}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='text-3xl mt-2'>Note</h3>
            <textarea
              rows={15}
              value={body}
              onChange={e => setBody(e.target.value)}
              className='border-black border-2 rounded-md focus:outline-none focus:border-blue-500 focus:border-4 p-2 resize-none focus:p-1'
              required
              placeholder='Note body'
            />
          </div>
          <div className='flex flex-row mt-2 justify-end space-x-4'>
            <button
              type='submit'
              onClick={() => console.log('Save clicked')}
              className='bg-green-500 hover:bg-green-600 font-bold px-4 py-2 rounded'
            >
              Save
            </button>
            <button
              type='button'
              onClick={() => navigate('/')}
              className='bg-red-500 hover:bg-red-600 font-bold px-4 py-2 rounded'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NoteForm
