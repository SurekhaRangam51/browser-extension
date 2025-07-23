
import { useEffect } from 'react'
import './App.css'
import { useBrowser } from './context/browser-context'
import { images } from './db/images'
import { Home } from './pages/Home/Home'
import { Task } from './pages/Task/Task'

const index=Math.floor(Math.random()*images.length)
const image=images[index].image
function App() {

  
  
  const {name,dispatchBrowser}=useBrowser()
  useEffect(()=>{
      let userName=localStorage.getItem("name")
      let task=localStorage.getItem("task")
      dispatchBrowser({
        type:"name",
        payload:userName
      })
      dispatchBrowser({
        type:"task",
        payload:task
      })
  },[])

  return (
    
     <div className='app' style={{backgroundImage:`url("${image}")`}}>
      {name ? <Task /> :<Home />}
     </div>
    
  )
}

export default App
