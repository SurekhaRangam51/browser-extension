import { useBrowser } from "../../context/browser-context"
import "./Home.css"
export const Home=()=>{
  const {name,dispatchBrowser}=useBrowser()
  const handleSubmit=(e)=>{
    e.preventDefault()
  }
  const handleChange=(event)=>{
    if(event.key==="Enter" && event.target.value.length>0){
    dispatchBrowser({
        type:'name',
        payload:event.target.value
  })
  localStorage.setItem('name',event.target.value)
}
  
  }
    return(
        <div className="home-container d-flex direction-column align-center gap-lg">
         <h1 className="main-heading">Browser Extension</h1>
        <div className="user-deatils d-flex direction-column align-center gap">
          <span className="heading-1">Hello, what's your name?</span>
          <form onSubmit={handleSubmit}>
              <input className="input" onKeyDown={handleChange}/>
          </form>
          
        </div>
        </div>
    )
}