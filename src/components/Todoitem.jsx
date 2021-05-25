import React from 'react';

export default function Todoitem({todo, toggleTodo}) {
    const{id, task, completed} =todo;    

    const handleTodoClick= () =>{
        toggleTodo(task);
    };

    return (
       <li>
           <input type="checkbox" checked={completed} onChange={handleTodoClick} />
           { task }
       </li>
    )
}
