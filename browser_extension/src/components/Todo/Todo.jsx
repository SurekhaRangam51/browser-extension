import { useState,useEffect } from "react";
import { v4 as uuid } from "uuid";
export const Todo = () => {
    const [todo, setTodo] = useState("")
    const [todoList, setTodoList] = useState([])
    const handleTodo = (e) => {
        setTodo(e.target.value)
    }
    const addedToList = (e) => {
        if (e.key === "Enter") {
             const updatedTodoList = [
                ...todoList,
                { _id: uuid(), todo, isCompleted: false }
            ];
            setTodoList(updatedTodoList)
            setTodo("")
            localStorage.setItem("todo", JSON.stringify(updatedTodoList))
        }


    }
    const handleTodoCheckChange=(id)=>{
        const updatedTodo=todoList.map((todo)=>todo._id===id ? {...todo,isCompleted:!todo.isCompleted}  : todo)
        setTodoList(updatedTodo)
        localStorage.setItem("todo",JSON.stringify(updatedTodo))
    }
    const handleTodoDelete=(id)=>{
        const updateTodoDelete=todoList.filter(todo=>todo._id!==id)
        setTodoList(updateTodoDelete)
        localStorage.setItem("todo",JSON.stringify(updateTodoDelete))
    }
   useEffect(() => {
        const userTodo=JSON.parse(localStorage.getItem("todo"))
        userTodo && setTodoList(userTodo)
    }, []);

    return (
        <div className="todo-container absolute">
            <div className="todo-input-container">
                <input className="todo-input" value={todo} onChange={handleTodo} onKeyDown={addedToList} />
            </div>
            <div className="todolist-container">
                {todoList && todoList.map(({_id,todo,isCompleted})=>{
                        return(
                        <div key={_id} className="todo-items d-flex align-center ">
                            <label className={` ${isCompleted ? "strike-through" : ""} cursor  todo-label  d-flex align-center gap-min  `}>
                                <input className="cursor" type="checkbox" checked={isCompleted} onChange={()=>handleTodoCheckChange(_id)}/>{todo}</label>
                            <button className="button cursor todo-clear-btn " onClick={()=>handleTodoDelete(_id)}>
                        <span className="material-symbols-outlined ">
                            close_small
                        </span>
                        </button>
                        </div>
                     )
                })}
            </div>
        </div>
    )
}
