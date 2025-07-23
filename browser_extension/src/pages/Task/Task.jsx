import './Task.css'
import '../../components/Todo/Todo.css'
import { useBrowser } from '../../context/browser-context'
import { Fragment, useEffect, useState } from 'react'
import { quotes } from '../../db/quotes'
import {Todo} from '../../components/Todo/Todo.jsx'

const index = Math.floor(Math.random() * quotes.length)
const quote = quotes[index].quote

export const Task = () => {
    const { dispatchBrowser, time, message, name, task } = useBrowser()

    useEffect(() => {
        const checkStatus = localStorage.getItem("taskCheckedStatus")
        checkStatus === "true" ? setisChecked(true) : setisChecked(false)

    })
    useEffect(() => {
        getCurrentTime()
    }, [time])
    useEffect(()=>{
        if(new Date().getDate()!==Number(localStorage.getItem("date"))){
            localStorage.removeItem("task")
            localStorage.removeItem("date")
            localStorage.removeItem("taskCheckedStatus")
        }
    },[])

    const getCurrentTime = () => {
        const today = new Date()
        const hours = today.getHours()
        const minutes = today.getMinutes()

        const hour = hours < 10 ? `0${hours}` : hours
        const minute = minutes < 10 ? `0${minutes}` : minutes

        const currentTime = `${hour}:${minute}`

        setTimeout(getCurrentTime, 1000)

        dispatchBrowser({
            type: "time",
            payload: currentTime
        })
        dispatchBrowser({
            type: "message",
            payload: hours
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleTaskChange = (e) => {
        if (e.key === "Enter" && e.target.value.length > 0) {
            dispatchBrowser({
                type: "task",
                payload: e.target.value

            })
            localStorage.setItem("task", e.target.value)
            localStorage.setItem("date", new Date().getDate())

        }
    }
    const handleCompleteTaskChange = (e) => {
        if (e.target.checked) {
            setisChecked(!isChecked)
        }
        else {
            setisChecked(!isChecked)
        }
        localStorage.setItem("taskCheckedStatus", !isChecked)

    }
    const handleClearTask = () => {
        dispatchBrowser({
            type: "clear"
        })
        localStorage.removeItem("task")
        localStorage.removeItem("taskCheckedStatus")
    }
    
    const [isChecked, setisChecked] = useState(false);
    const [isOpen,setIsOpen]=useState(false)
    const openTodo=()=>{
        setIsOpen(isOpen=>!isOpen)
    }
    return (
        <div className="task-container d-flex direction-column align-center ">

            <span className="time">{time}</span>
            <span className="message">{message} ,{name}</span>
            {name !== null && task === null ? <Fragment>
                <span className="focusQuestion">what is your main focus today</span>
                <form onSubmit={handleSubmit}>
                    <input className="input input-container" onKeyDown={handleTaskChange} />
                </form>
            </Fragment> : <div className="d-flex direction-column align-center gap-sm">
                <span className="today-focus">Today's Focus</span>
                <div className="d-flex gap-sm">
                    <label className={`${isChecked ? "strike-through" : ""} cursor  align-center d-flex main-task gap-min`}  > <input className=" check cursor " type='checkbox' onChange={handleCompleteTaskChange} checked={isChecked} />{task}</label>
                    <button className="button cursor" onClick={handleClearTask}>
                        <span className="material-symbols-outlined ">
                            close_small
                        </span>
                    </button>

                </div>

            </div>}
            <div className="quote-container ">
                <span>{quote}</span>
            </div>
            {isOpen && <Todo />}
            <div className="todo-btn-container absolute">
            <button className="btn-todo cursor" onClick={openTodo}>
                <span>TODO</span>
            </button>
            </div>



        </div>

    )
}