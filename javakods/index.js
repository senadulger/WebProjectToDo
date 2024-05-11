if(localStorage.getItem('list')==NaN){
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
    lbl.setAttribute('name','lbl');
    listeleman.appendChild(node);
    lbl.appendChild(listeleman);
    lbl.addEventListener('click',()=>{
        if (element.done==true) {
            element.done=false; 
            
        } else {element.done=true;
            
        }

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