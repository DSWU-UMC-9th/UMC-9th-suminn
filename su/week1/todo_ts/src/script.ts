const todoInput = document.getElementById('todo_input') as HTMLInputElement;
const todoForm = document.getElementById('todo_form') as HTMLFormElement;
const todoList = document.getElementById('todo_list') as HTMLUListElement;
const doneList = document.getElementById('done_list') as HTMLUListElement;

type Todo = {
    id: number;
    text: string;
};

let todos: Todo[] = [];
let dones: Todo[] = [];

const renderTasks = ():void => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todos.forEach((todo) : void => {
        const li = createTodoElement(todo,false);
        todoList.appendChild(li);
    });

    dones.forEach((todo) : void => {
        const li = createTodoElement(todo,true);
        doneList.appendChild(li);
    });
};

const getTodoText = (): string => {
   return todoInput.value.trim();
};

const addTodo = (text:string) : void => {
    todos.push({id:Date.now(), text});
    todoInput.value = '';
    renderTasks();
};

const completeTodo = (todo: Todo) : void => {
    todos = todos.filter((t) : boolean => t.id !== todo.id);
    dones.push(todo);
    renderTasks();
};

const deleteTodo = (todo: Todo) : void => {
    dones = dones.filter((t) : boolean => t.id !== todo.id);
    renderTasks();
};

const createTodoElement = (todo: Todo, isDone: boolean) : HTMLLIElement => {
    const li = document.createElement('li');
    li.classList.add('render-container__item');
    li.textContent = todo.text;

    const button = document.createElement('button');
    button.classList.add('render-container__item-button');

    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = 'rgb(230, 230, 250)';
    }
    else {
        button.textContent = '완료';
        button.style.backgroundColor = 'rgb(135, 206, 235)';
    }

    button.addEventListener('click',(): void => {
        if (isDone) {
            deleteTodo(todo);
        }
        else {
            completeTodo(todo);
        }
    });

    li.appendChild(button);
    return li;
};

todoForm.addEventListener('submit',(event: Event): void => {
    event?.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});

renderTasks();


