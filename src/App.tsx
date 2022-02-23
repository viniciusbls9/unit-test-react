import { useState } from "react"

function App() {
  const[newItem, setNewItem] = useState('')
  const [list, setList] = useState(['Diego', 'Rodz', 'Mayk'])

  function addToList() {
    setTimeout(() => {
      setList(state => [ ...state, newItem ])
    }, 500)
  }

  function removeFromList(itemList: string) {
    setTimeout(() => {
      setList(state => state.filter(item => item !== itemList))
    }, 500)
  }

  return (
    <>
      <input placeholder="new item" value={newItem} onChange={e => setNewItem(e.target.value)} />
      <button onClick={addToList}>Add</button>
      <ul>
        {list.map(item => (
          <li key={item}>
            {item}
            <button onClick={() => removeFromList(item)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
