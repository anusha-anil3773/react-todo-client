import React from 'react'
import './todo.css'
import {GrCheckbox}from "react-icons/gr"
import {FiEdit}  from "react-icons/fi"
import {AiOutlineDelete}from "react-icons/ai"
import { useState ,useRef , useEffect} from 'react' //handle data

function Todo() {
    const[todo , setTodo]= useState('') //for accessing data set a variable
    const[todos,setTodos]= useState([]) //to store every data we enter
    const[editId,setEditId]=useState(0)
    const submit =(e) =>{
        e.preventDefault();
    }
    const addTodo = () => {
        if(todo !== ''){
        setTodos([...todos,{list:todo,id:Date.now(),status:false}])
        setTodo('')
        console.log(todos)
    }
     if(editId){
        const edittodo =todos.find((todo)=>todo.id ===editId)
        const updateTodo = todos.map((to)=>to.id===edittodo.id
        ?(to= {id:to.id,list :todo})
        :(to ={id :to.id,list:to.list}))
        setTodos(updateTodo)
        setEditId(0)
        setTodo('')
    }
};
    const inputRef = useRef('null')
    useEffect(()=>{
       inputRef.current.focus()
    })
    const onDelete=(id)=>{
        setTodos(todos.filter((obj)=>obj.id !==id))
    }
    const oncomplete = (id) =>{
        let complete = todos.map((list)=>{
            if(list.id === id){
                return({...list,status:!list.status})
            }
             return list   
        })
        setTodos(complete)
    }
    const onEdit =(id) =>{
        const edittodo=todos.find((to)=>to.id ===id)
        setTodo(edittodo.list)
        setEditId(edittodo.id)
    }
 return (
    <div className='container'>
    <h2>ToDo App</h2>
    <form className='form-group' onSubmit={submit}>
        <input type="text" value={todo} ref={inputRef} placeholder='Enter your list' className='form-control' onChange={(e)=>setTodo(e.target.value)} />
        <button onClick={addTodo}>{editId ? 'EDIT' : 'ADD'}</button>
    </form>
    <div className='list'>
        <ul >
            {todos.map((obj)=>(
                    <li className='list-items'>
                        <div className='list-item-list' id={obj.status ? 'list-item' :''}>{obj.list}</div>
                    <span>
                        <GrCheckbox className='list-item-icons' id='complete' onClick={()=>oncomplete(obj.id)}/>
                        <FiEdit className='list-item-icons' id='edit' onClick={()=>onEdit(obj.id)}/>
                        <AiOutlineDelete className='list-item-icons' id='delete'title='delete' onClick={()=>onDelete(obj.id)}/>
                    </span>
                    </li>
                ))
            }
        </ul>
    </div>

    </div>
  )
}

export default Todo
