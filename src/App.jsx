import React, {Fragment, useState, useRef, useEffect}from 'react';
import {TodoList} from './components/TodoList';

export function App(){
    //valor inicial del estado "todos"
    const[todos, setTodos] = useState([{id:1, task:'tarea1', completed:false}]); 

    //variable que captura el value de input
    const TodoTaskRef= useRef();

    //Clave para el localStorege
    const KEY = "todoApp.todo";

    //cambia el atributo completed true o flase según el evento del checkbox
    const toggleTodo=(task)=>{
        const newTodos=[...todos];
        const todo =newTodos.find((todo)=>todo.task === task);
        todo.completed= !todo.completed;
        setTodos(newTodos);
    };

    //añade una nueva tarea al arreglo de estados
    const handleTodoAdd = () =>{
        const task=TodoTaskRef.current.value;
        if(task==='')return;   
        setTodos((prevTodos)=>{
            return[...prevTodos,{id:35, task , completed:false}]
        })    
        TodoTaskRef.current.value =null;
    };    

    //eliminar tareas completadas
    const handleClearAll = () =>{
        const newTodos= todos.filter((todo)=>!todo.completed)
        setTodos(newTodos);
    }
    
    //para recargar la pag sin que se pierdan los datos 
    useEffect(()=>{
       const storedTodos = JSON.parse(localStorage.getItem(KEY));
       if(storedTodos){
           setTodos(storedTodos);
       }
    },[]);

    //para preservar los datos en localStorage
    useEffect(()=>{
        localStorage.setItem(KEY, JSON.stringify(todos))
    },[todos]);
    
    return (
        <Fragment>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <input ref={TodoTaskRef} type="text" placeholder="Nueva Tarea" />    
            <button onClick={handleTodoAdd}>Añadir</button>
            <button onClick={handleClearAll}>Eliminar</button>
            <div>Te quedan {todos.filter((todo)=>!todo.completed).length} tareas por terminar</div>
        </Fragment>
    );
}