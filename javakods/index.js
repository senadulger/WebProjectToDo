var idmaker = 1;
console.log('deneme');
function ekle() {
    var yazi = document.getElementById("taskInput")
    var ekleme = document.createElement('li');
    var yazisi = document.createTextNode(yazi.value);
    var label = document.createElement("label");
    label.setAttribute("class", "lbl");
    label.setAttribute("id", idmaker.toString);
    ekleme.appendChild(yazisi);
    label.appendChild(ekleme);
    var list = document.getElementById('taskList');
    list.appendChild(label);
    idmaker++;
}
var addbutton = document.getElementById("addbutton");
addbutton.addEventListener("click", () => ekle());
var deletebutton = document.getElementById("deletebutton");
deletebutton.addEventListener("click", () => {
    var idcol = document.getElementById("taskInput");
    sil(idcol.value);
})
function alarm() { alert('deneme') }

function sil(element) {
    var parents = document.getElementById('taskList');
    var bisi = parents.removeChild(parents.children[element]);

}