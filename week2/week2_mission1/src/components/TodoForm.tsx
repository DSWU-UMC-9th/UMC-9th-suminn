import { useState } from "react";
import { useTodo } from '../context/TodoContext';

const TodoForm = () => {

    const [text, setText] = useState('');
    const { addTodo } = useTodo();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = text.trim();
        
        if(value) {
            addTodo(text);
            setText('');
        }
    }


    return (
        <form onSubmit={handleSubmit} id="todo_form" className="todo-container__form">
            <input 
                value={text}
                onChange={(e) : void => setText(e.target.value)}
                id="todo_input"
                className="todo-container__input" 
                type="text" 
                placeholder="할 일 입력"
            />
            <button type="submit" className="todo-container__button">할 일 추가</button>
        </form>

    );
};

export default TodoForm;