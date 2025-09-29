/*이건 아무것도 아닌 상관없는 파일입니다.*/
import { useState } from "react";

const Todo = () => {

    type TTodo = {
        id: number;
        text: string;
    };

    const [text, setText] = useState('');
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [dones, setDones] = useState<TTodo[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = text.trim();
        
        if(value) {
            const newTodo: TTodo = { id:Date.now(), text};
            setTodos((prevTodos) : TTodo[] => [...prevTodos,newTodo]);
            setText('');
        }
    }

    const handleCompleteTodo = (todo: TTodo) : void => {
        setTodos(prev => prev.filter(t => t.id !== todo.id)); 
        setDones(prev => [...prev, todo]);
    }

    const handleDeleteTodo = (todo: TTodo) : void => {
        setDones(prev => prev.filter(t => t.id !== todo.id));
    }



    return (
        <>
        <div className="todo-container">
        <h1 className="todo-container__header"> Min's TODO-LIST</h1>
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

        <div className="render-container">
            <div className="render-container__section">
                <h2 className="render-container__title"> 할 일</h2>
                <ul id="todo_list" className="render-container__list">
                {todos.map((todo) => (
                    <li key={todo.id} className="render-container__item">
                        <span className="render-container__item-text">
                            {todo.text}
                        </span>
                        <button
                            onClick={() => handleCompleteTodo(todo)}
                            style = {{
                                backgroundColor: "rgb(135, 206, 235)"
                            }}
                            className="render-container__item-button"
                            >
                             완료
                            </button>
                    </li>
                ))}
                </ul>
            </div>
    
            <div className="render-container__section">
                <h2 className="render-container__title"> 완료</h2>
                <ul id="done_list" className="render-container__list">
                {dones.map((todo) => (
                    <li key={todo.id} className="render-container__item">
                        <span className="render-container__item-text">
                            {todo.text}
                        </span>
                        <button
                            onClick={() => handleDeleteTodo(todo)}
                            style = {{
                                backgroundColor: "rgb(230, 230, 250)"
                            }}
                            className="render-container__item-button"
                            >
                             삭제
                            </button>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    </div>
        </>
    )
};

export default Todo;