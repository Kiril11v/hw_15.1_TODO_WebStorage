const FormAddBtn = document.querySelector('.form__btn');
const toDoList = document.querySelector('.todos-wrapper');
const formInput = document.querySelector('.form__input');

const STORAGE_KEY = 'todoListKey'; 

// getting data from localStorage 
function loadTodos() {           
    const data = localStorage.getItem(STORAGE_KEY); 
    return data ? JSON.parse(data) : [];
}

// saving data to localStorage
function saveTodos(todos) {            
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// create li
function renderTodoItem(text, completed = false) {
    const toDoListItem = document.createElement('LI'); 
    toDoListItem.classList.add('todo-item');
    if (completed) {
        toDoListItem.classList.add('todo-item-checked');
    }

    // create input
    const toDoListItemCheckbox = document.createElement('INPUT');
    toDoListItemCheckbox.type = 'checkbox';
    toDoListItemCheckbox.checked = completed;
    toDoListItem.appendChild(toDoListItemCheckbox);

    // task completed via checkbox
    toDoListItemCheckbox.addEventListener('change', ()=> {
        toDoListItem.classList.toggle('todo-item-checked', toDoListItemCheckbox.checked); 

        const todos = loadTodos();
        const index = Array.from(toDoList.children).indexOf(toDoListItem); // превращает коллекциюHTML в массив и возвращает индекс элемента
        todos[index].completed = toDoListItemCheckbox.checked;
        saveTodos(todos);
    });

    // create span
    const toDoListItemSpan = document.createElement('SPAN'); 
    toDoListItemSpan.classList.add('todo-item__description')

    toDoListItemSpan.textContent = text;
    toDoListItem.appendChild(toDoListItemSpan);

    // create button
    const toDoListItemDelBtn = document.createElement('BUTTON');
    toDoListItemDelBtn.classList.add('todo-item__delete');
    toDoListItemDelBtn.textContent = 'Видалити';
    toDoListItem.appendChild(toDoListItemDelBtn);

    toDoList.appendChild(toDoListItem);
}

// loads elements
window.addEventListener('DOMContentLoaded', ()=> {  
    const todos = loadTodos();
    todos.forEach(todo => renderTodoItem(todo.text, todo.completed));
});

// btn adds li
FormAddBtn.addEventListener('click', (event) => {  
    event.preventDefault();

    const inputValue = formInput.value.trim();

    if (inputValue){
        renderTodoItem(inputValue);

        const todos = loadTodos();
        todos.push({ text: inputValue, completed: false});
        saveTodos(todos);

        formInput.value = '';
    }
});

 // btn delete item
toDoList.addEventListener('click', ({ target }) => {  
        if (target.classList.contains('todo-item__delete')) {
            const listItem = target.closest('.todo-item');
            const index = Array.from(toDoList.children).indexOf(listItem);

            const todos = loadTodos();
            todos.splice(index, 1); //выбирает один элемент и удаляет из загрузки
            saveTodos(todos);

            listItem.remove();
        }
});