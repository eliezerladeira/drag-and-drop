/* Designed by Eliezer Ladeira - 10/06/2021 updated 10/07/2021 */

// cria objeto para guardar o que está onde
let areas = {
    a: null,
    b: null,
    c: null
};

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover',dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
});

// fazendo a área da base (neutra) dropável
document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

// functions item
function dragStart(e) {
    e.currentTarget.classList.add('dragging');
}

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

// functions area
function dragOver(e) {
    // só faz efeito mais escuro de onde eu estou arrastando caso esteja vazio o lugar
    if (e.currentTarget.querySelector('.item') === null) {
        e.preventDefault();
        e.currentTarget.classList.add('hover');
    }
}

function dragLeave(e) {
    e.currentTarget.classList.remove('hover');
}

function drop(e) {
    e.currentTarget.classList.remove('hover');

    // verificar se já tem algo onde estou dando drop (colocando o item)
    if (e.currentTarget.querySelector('.item') === null) {

        // identifica o item que está sendo arrastado
        let dragItem = document.querySelector('.item.dragging');
        
        // move o item arrastado, inclusive os eventos
        e.currentTarget.appendChild(dragItem);

        updateAreas();
    }
}

function dragOverNeutral(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');
}

function dropNeutral(e) {
    // move o dragItem
    e.currentTarget.classList.remove('hover');

    let dragItem = document.querySelector('.item.dragging');
        
    e.currentTarget.appendChild(dragItem);

    updateAreas();
}

// logic functions
function updateAreas() {
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        if (area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
    });

    if (areas.a === '1' && areas.b === '2' && areas.c ==='3') {
        document.querySelector('.areas').classList.add('correct');
    } else {
        document.querySelector('.areas').classList.remove('correct');
    }
}