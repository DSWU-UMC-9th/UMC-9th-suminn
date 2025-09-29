import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useTodo } from "../context/TodoContext";


const Todo = () => {

    const {todos, dones, handleCompleteTodo, handleDeleteTodo} = useTodo();
    
    return (
        <>
        <div className="todo-container">
        <h1 className="todo-container__header"> Min's TODO-LIST</h1>
        <TodoForm />
        <div className="render-container">
            <TodoList
            title = '할 일'
            todos = {todos}
            buttonLabel = '완료'
            buttonColor = 'rgb(135, 206, 235)'
            onClick = {handleCompleteTodo}
            />
    
            <TodoList
            title = '완료'
            todos = {dones}
            buttonLabel = '삭제'
            buttonColor = 'rgb(230, 230, 250)'
            onClick = {handleDeleteTodo}
            />
        </div>
    </div>
        </>
    )
};

export default Todo;