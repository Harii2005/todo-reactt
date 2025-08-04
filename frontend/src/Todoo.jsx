import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import "./Todoo.css"

export default function Todoo(){

    let [todos , setTodos] = useState([{ task : "demo-task" , isDone : false , id : uuidv4() }]);
    let [newTask , setNewTask] = useState("");

    let updateTodoValue = (event) => {
        event.preventDefault();
        setNewTask(event.target.value);
        //console.log(event.target.value);
    }

    let addNewTask = () => {
        setTodos((prevTodo) =>(
            [...prevTodo, {task : newTask , id : uuidv4() , isDone : false  }]
        ));
        setNewTask("");
    }

    let deleteTodo = (id) =>{
        setTodos((prevTodos) => prevTodos.filter((prevTodo)=> prevTodo.id != id));
    }

    let markAsDone = (id) => {
        setTodos((prevTodos)=> (
                prevTodos.map((prevTodo) => {
                    if(prevTodo.id === id) {
                        //console.log("done");
                        return {...prevTodo , isDone : true}
                        
                    }else{
                        return prevTodo;
                    }
                }
        )));
    }

    let allDone = () =>{
        setTodos((prevTodos) =>( 
            prevTodos.map((prevTodo)=>{
                return {...prevTodo , isDone : true};
            })
        ));
    }


    return(
        <>
            <div className='container'>
                <div>
                    <h1>Todo App</h1>
                    <input
                        style={{marginLeft: "10px" ,padding : "5px"}}
                        placeholder='add task'
                        type='text'
                        value={newTask}
                        onChange={updateTodoValue}
                    />
                    <button onClick={addNewTask} style={{marginLeft: "10px" ,padding : " 8px 30px 8px 30px", backgroundColor : "skyblue"}}> Add </button>
                </div>
                <div>
                    <h4>task to do</h4>
                    <ul>
                        {todos.map((todo) => 
                            <li key={todo.id} style={todo.isDone ? {textDecoration : "line-through"} : {}} >
                                {todo.task} 
                                <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: "50px" }}>delete</button>
                                <button onClick={()=>markAsDone(todo.id)} >{todo.isDone ? "done" : "isDone"}</button>
                            </li>
                        )}
                        <br/>
                        <button 
                            style={{ marginRight: "40px" ,backgroundColor : "red", paddingLeft : "35px 35px"}}
                            onClick={() =>allDone()}
                        > all done </button>
                    </ul>

                </div>
            </div>
        </>
    );
}