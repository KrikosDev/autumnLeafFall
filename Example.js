let allTasks = JSON.parse(localStorage.getItem('tasks')) || []; // Хранятся таски
let valueInput = '';
let input = null;

window.onload = function init() {
    input = document.getElementById('add-task');    // Ищем Input в документе, доступен всё время
    input.addEventListener('change', updateValue);  // Слушатель срабатывает при ИЗМЕНЕНИЯХ
    const resp = await fetch('http://localhost:8000/allTasks', {
        method: 'GET'
    });
    let result = await resp.json();
    console.log(result);
    render();
}

const onClickButton = () => {  // Нажимаем add  
    if (valueInput !== '') {
    allTasks.push({
        text: valueInput,
        isCheck: false,
    })
    localStorage.setItem('tasks', JSON.stringify(allTasks)); 
    console.log(allTasks)
    valueInput = '';   // Обнуление
    input.value = '';   // Обнуление
    render();           // Добавляет таски на страницу
}
}
const onClickRemove = () => {
    allTasks = allTasks.filter(itm => {
        itm !== itm;
    })
    localStorage.clear()
    render()
}


const updateValue = (e) => {
    valueInput = e.target.value; // Вносим в valueInput, значение input 
}



render = () => {    // Идёт по массиву, выводя все элементы
    const content = document.getElementById('content-page') // берём div для добавления в него чекбоксов
    while (content.firstChild) { // проверяем есть ли в div элементы
        content.removeChild(content.firstChild);  // Если true удаляем этот элемент
    }
    allTasks.map((item, index) => {
        const container = document.createElement('div'); // Здесь хранится таск
        // container.id = `task-${index}`; // добавляем контейнеру с чекбоксом уникальный ID 
        container.className = 'task-container'; // добавляем класс контейнеру с чекбоксом
        const checkbox = document.createElement('input'); // Чекбокс
        checkbox.type = 'checkbox'; // Чекбокс
        checkbox.checked = item.isCheck; // Проверяет true or false и ставит галочку
        checkbox.onchange = function () {  // Когда мы ставим галочку чекбоксу то...
            onChangeCheckbox(index) // Вызываем функцию для изменения чекбокса
        };
        container.appendChild(checkbox);    // добавляем Чекбокс в начало контейнера  
        const text = document.createElement('p');   // Создаём тег для хранения текста
        text.innerText = item.text; // Берём значение текста из allTasks и добавляем его в тег р
        text.className = item.isCheck ? 'done' : 'task';    // Добавляем стили
        container.appendChild(text);    // Добавляем тег р в наш контейнер чекбокса  

        const imageCheck = document.createElement('img');
        imageCheck.src = 'img/check.svg';

        const imageEdit = document.createElement('img');
        imageEdit.src = 'img/edit.svg';   // Изображение изменения
        container.appendChild(imageEdit);

        const entrance = document.createElement('input');
        imageEdit.onclick = () => {
            entrance.value = item.text;
            container.replaceChild(entrance, text);
            container.replaceChild(imageCheck, imageEdit)
            }

        imageCheck.onclick = () => {
            allTasks[index].text = entrance.value;
            localStorage.setItem('tasks', JSON.stringify(allTasks));
            render()
        }    

        const imageDelete = document.createElement('img');
        imageDelete.src = 'img/delete.svg';    // Изображение удаления
        container.appendChild(imageDelete);
        imageDelete.onclick = () => onClickImageDelete(index);


        content.appendChild(container); // добавялем контейнер с чекбоксом в div
    });
}

const onChangeCheckbox = (index) => {     // Передаём ID именно ЭТОГО чекбокса
    allTasks[index].isCheck = !allTasks[index].isCheck;    // Элемент из массива allTasks под index изменяем на обратное значение
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    render()    
}
const entrance = document.createElement('input'); // абобабабаба
const onClickImageEdit = () => {
    entrance.value = item.text;
    allTasks.replaceChild(entrance, text);
    localStorage.setItem('tasks', JSON.stringify(allTasks));

}
const onClickImageDelete = (index) => {
    allTasks = allTasks.filter((itm, ind) => ind !== index);    // Фильтруем массив и удаляем искомый элемент
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    render()
}


// let alueInput = '';

// window.onload = init = () => {
//     const input = document.getElementById('add-task');
//     input.addEventListener('keyup', updateValue)
// }

// onClickButton = () => {
//     // alert('click!');
// }

// updateValue = (event) => {
//     console.log('value', event.target.value);
//     valueInput = event.target.value
// }