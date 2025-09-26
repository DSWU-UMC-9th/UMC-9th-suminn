import { TTodo } from '../types/todo';
import { createContext, useContext, useState, type PropsWithChildren } from 'react';

interface ITodoContext {
    todos: TTodo[];
    dones: TTodo[];
    addTodo: (text:string) => void;
    handleCompleteTodo: (todo:TTodo) => void;
    handleDeleteTodo: (todo:TTodo) => void;
}

export const TodoContext = createContext<ITodoContext |undefined>(undefined);

export const TodoProvider = ({ children }: PropsWithChildren) => {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [dones, setDones] = useState<TTodo[]>([]);

    const addTodo = (text:string) => {
        const newTodo: TTodo = { id:Date.now(), text};
        setTodos((prevTodos) : TTodo[] => [...prevTodos,newTodo]);
    };

    const handleCompleteTodo = (todo: TTodo) : void => {
        setTodos(prev => prev.filter(t => t.id !== todo.id)); 
        setDones(prev => [...prev, todo]);
    };
    
    const handleDeleteTodo = (todo: TTodo) : void => {
        setDones(prev => prev.filter(t => t.id !== todo.id));
    };

    return (
        <TodoContext.Provider
          value={{ todos, dones, addTodo, handleCompleteTodo, handleDeleteTodo }}
        >
          {children}
        </TodoContext.Provider>
      );
};

export const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error(
            'useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다.'
        );
    }
    return context;
}



