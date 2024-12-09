import CreatableSelect from 'react-select/creatable'

const NoteForm = () => {
  return (
    <>
      <div className='m-3'>
        <form>
          <div className='w-full flex flex-row justify-evenly gap-6'>
            <div className='flex flex-col w-1/2 gap-2'>
              <h3 className='text-3xl'>Title</h3>
              <input
                type='text'
                className='border-black border-2 rounded-md h-10 focus:outline-none focus:border-blue-500 focus:border-4 p-2'
              />
            </div>
            <div className='flex flex-col w-1/2 gap-2'>
              <h3 className='text-3xl'>Tags</h3>
              <CreatableSelect
                isMulti
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
              className='border-black border-2 rounded-md focus:outline-none focus:border-blue-500 focus-border-4 p-2 resize-none'
            />
          </div>
          <div className='flex flex-row mt-2 justify-end space-x-4'>
            <button
              type='button'
              onClick={() => console.log('Save clicked')}
              className='bg-green-500 hover:bg-green-600 font-bold px-4 py-2 rounded'
            >
              Save
            </button>
            <button
              type='button'
              onClick={() => console.log('Cancel clicked')}
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
