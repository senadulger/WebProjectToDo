var selectedOne;
if(localStorage.getItem('list')==null){
localStorage.setItem('list',"[]");}
function GetToLocal(){
var Temp = JSON.parse(localStorage.getItem('list'));
 return Temp;
}

function AddToLocal(Task){
  var Temp = [];
  
  Temp=GetToLocal()
  
  var element ={'todo':Task,'done':false};
  Temp.push(element);
  localStorage.setItem('list',JSON.stringify(Temp));

}
function CreateToList(){
    
    var temp = GetToLocal()||[];
    if(Array.isArray(temp)){
    for(let index = 0; index < temp.length; index++){
        const element = temp[index];
        const lbl = document.createElement('label');
    const listeleman = document.createElement('li');
    const node = document.createTextNode(element.todo);
    var list = document.getElementById('taskList');
    if(element.done == true){
        lbl.setAttribute('class','taskcompleted');
    }else{lbl.setAttribute('class','tasknotcompleted')}
    lbl.setAttribute('id',index);
    listeleman.appendChild(node);
    lbl.appendChild(listeleman);
    lbl.addEventListener('click',()=>{
       selectedOne=lbl.getAttribute('id');
        })
        
    lbl.addEventListener('contextmenu',()=>{
        EditTheList(lbl.getAttribute('id'));
        console.log('sag tiklandi');        
    });

    
    list.appendChild(lbl);
    
        
    }}
}
function RemoveTheList(){
    const list = document.getElementById('taskList');
    var len = list.childElementCount;
   while(list.firstChild){
    list.firstChild.remove();
   }}
CreateToList();
document.getElementById('bttn').addEventListener('click',()=>{
    var textfield = document.getElementById('taskInput');
    AddToLocal(textfield.value);
    RemoveTheList();
    CreateToList();
})
function RemoveTheLocal(id){
   var loc = GetToLocal();
   loc.splice(id,1);
   localStorage.setItem('list',JSON.stringify(loc));
   RemoveTheList();
   CreateToList();
}

function EditTheList(id){
  var loc = GetToLocal();
  var a =prompt('Yeni Taski giriniz');
  
  loc[id].todo=a;
  localStorage.setItem('list',JSON.stringify(loc));
  RemoveTheList();
  CreateToList();
}

function ChangeToComp(id){
    var loc = GetToLocal();
    if(loc[id].done==true){loc[id].done=false}else{loc[id].done=true}
    localStorage.setItem('list',JSON.stringify(loc));
    RemoveTheList();
    CreateToList();
}

document.addEventListener("contextmenu",(e)=>{

    e.preventDefault();
})
document.getElementById('deletebttn').addEventListener('click',()=>{
RemoveTheLocal(selectedOne);
selectedOne = NaN;
})
document.getElementById('donebttn').addEventListener('click',()=>{
    ChangeToComp(selectedOne);
    selectedOne=NaN;
})
