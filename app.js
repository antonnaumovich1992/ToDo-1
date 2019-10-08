let dateElement = document.getElementById('date');

const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('ru-RU', {weekday: 'short',month: 'short', day: 'numeric'});



let refresh = document.getElementById('refresh');
let input = document.getElementById('input');
let list = document.getElementById('list');


const CHECK = "checked";
const UNCHECK = "";

let LIST;
let id;

let data = localStorage.getItem('todo');
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
};

function loadList(array){
    array.forEach(element => {
        addToDo(element.name, element.id, element.done, element.trash)
    });
}

function addToDo(toDo, id, done, trash){
    if (trash){
        return;
    }
    const DONE = done ? CHECK : UNCHECK;

    let text = `<li class="item ${DONE}" job="complete" id="${id}">${toDo}<div id="${id}" job="delete" class="close">del</div></li>`;
    
    list.insertAdjacentHTML('beforeend', text);
};


document.addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push(
                {
                name : toDo,
                id : id,
                done : false,
                trash : false
            }
            );
            localStorage.setItem('todo', JSON.stringify(LIST));
            id++;
        }
        input.value = "";
        
    }
});


function completeToDo (element){
    element.classList.toggle(CHECK);

    LIST[element.id].done = LIST[element.id].done ? false : true;
};

function deleteToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;

};

list.addEventListener('click', (event) => {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob == 'complete'){
        completeToDo(element);

    } else if (elementJob == "delete"){
        deleteToDo(element);

    }
    localStorage.setItem('todo', JSON.stringify(LIST));

});

refresh.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})


