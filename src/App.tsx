import { fetchCharacters } from './redux/characterSlice'
import { useAppDispatch, useAppSelector } from './redux/hooks'

function App() {
  const {characters} = useAppSelector(state => state.characters)
  const dispatch = useAppDispatch()
  
  return (
    <div>
      <h1>Characters</h1>

      {characters.length 
      ? characters.map(ch => <div className='list' >{ch}</div>)
      : null
      }

      <button onClick={()=> dispatch(fetchCharacters())}>Fetch</button>
    </div>
  )
}

export default App
