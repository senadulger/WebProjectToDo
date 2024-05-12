var selectedOne = NaN;
//localden bilgi cekerken hata vermemesi icin baslangic degeri
if (localStorage.getItem('list') == null) {
    localStorage.setItem('list', "[]");
}
// localden bilgi alır
function GetToLocal() {
    var Temp = JSON.parse(localStorage.getItem('list'));
    return Temp;
}
// local'e ekleme yapar
function AddToLocal(Task) {
    var Temp = [];

    Temp = GetToLocal()

    var element = { 'todo': Task, 'done': false };
    Temp.push(element);
    localStorage.setItem('list', JSON.stringify(Temp));

}
// liste yaratmaya yarar
function CreateToList() {
    var temp = GetToLocal() || [];
    if (Array.isArray(temp)) {
        for (let index = 0; index < temp.length; index++) {
            const element = temp[index];
            const lbl = document.createElement('label');
            const listeleman = document.createElement('li');
            const node = document.createTextNode(element.todo);
            var list = document.getElementById('taskList');
            if (element.done == true) {
                lbl.setAttribute('class', 'taskcompleted');
            } else { lbl.setAttribute('class', 'tasknotcompleted') }
            lbl.setAttribute('id', index);
            listeleman.appendChild(node);
            lbl.appendChild(listeleman);
            lbl.addEventListener('click', () => {
                selectedOne = lbl.getAttribute('id');
                var rick = document.getElementsByClassName('task').length;
                //tek bir eleman secildiğinden emin olur
                if (lbl.getAttribute('class') == 'task' || rick >= 1) {
                    RemoveTheList()
                    CreateToList();
                    selectedOne = null;
                } else { lbl.setAttribute('class', 'task'); }

            })

            lbl.addEventListener('contextmenu', () => {
                EditTheList(lbl.getAttribute('id'));
                console.log('sag tiklandi');
            });
            a = document.getElementById('Filter').value;
            // filtreye gore listeyi duzenler
            switch (a) {
                case 'Fall': list.appendChild(lbl);
                    break;
                case 'Fnotcomplit': if (lbl.getAttribute('class') == 'tasknotcompleted') { list.appendChild(lbl); }
                    break;
                case 'Fcomplit': if (lbl.getAttribute('class') == 'taskcompleted') { list.appendChild(lbl); }
                    break;
                default: list.appendChild(lbl);
                    break;
            };



        }
    }
}
// listenin icini bosaltir
function RemoveTheList() {
    
    const list = document.getElementById('taskList');
    var len = list.childElementCount;
    while (list.firstChild) {
        list.firstChild.remove();
    }
}
CreateToList();
document.getElementById('bttn').addEventListener('click', () => {
    var textfield = document.getElementById('taskInput');
    AddToLocal(textfield.value);
    RemoveTheList();
    CreateToList();
})
// localden secilen elemanı siler
function RemoveTheLocal(id) {

    if (id == null) {
        var loc = [];
    } else {
        var loc = GetToLocal();
        loc.splice(id, 1);
    }
    localStorage.setItem('list', JSON.stringify(loc));
    RemoveTheList();
    CreateToList();
}
// secilen elemanı değiştirir
function EditTheList(id) {
    var loc = GetToLocal();
    var a = prompt('Enter new task!');
    if (a != null) {
        loc[id].todo = a;
    }
    localStorage.setItem('list', JSON.stringify(loc));
    RemoveTheList();
    CreateToList();
}
// localde yapılma durumunu değistirir
function ChangeToComp(id) {
    var loc = GetToLocal();
    if (loc[id].done == true) { loc[id].done = false } else { loc[id].done = true }
    localStorage.setItem('list', JSON.stringify(loc));
    RemoveTheList();
    CreateToList();
}
// sağ clicki kapatır
document.addEventListener("contextmenu", (e) => {

    e.preventDefault();
})
document.getElementById('deletebttn').addEventListener('click', () => {
    RemoveTheLocal(selectedOne);
    selectedOne = null;
})
document.getElementById('donebttn').addEventListener('click', () => {
    ChangeToComp(selectedOne);
    selectedOne = null;
})
document.getElementById('Fbttn').addEventListener('click', () => {
    RemoveTheList();
    CreateToList();
})