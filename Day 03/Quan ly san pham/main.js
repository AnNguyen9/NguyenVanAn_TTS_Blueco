var listP = [];

window.onload = function () {
   
    add();
}

function showData(){
    var stt=0;
    var result=document.getElementById('result');
    result.innerHTML='';
    for(var i=0;i<listP.length;i++){
        stt++;
        result.innerHTML+='<tr>'+
                                '<td>'+ stt +'</td>'+
                                '<td>'+ listP[i] +'</td>'+
                                '<td> <button onclick="edit('+i+')">Edit</button>'+
                                '<td> <button onclick="deleteP('+i+')">Delete</button>'+
                            '</tr>';
    }
}

function add() {

    var name = document.getElementById('productName');
    var btnAdd = document.getElementById('addProduct');

    btnAdd.addEventListener('click', function () {
        listP.push(name.value);
        
        showData();
    });
}

function deleteP(index){
    listP.splice(index,1);
    showData(listP);
}

function edit(index){   
    var name = document.getElementById('productName');
    listP[index]=name.value;
    showData();
}