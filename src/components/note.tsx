import { useNote } from './noteLayout'

const Note = () => {
  const note = useNote()
  console.log(note)
  return <>SHOW</>
}

export default Note
