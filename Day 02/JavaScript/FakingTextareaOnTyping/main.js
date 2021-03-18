window.onload=function(){
    fake();
}

let array= [];
let str="";
array[1]='A';array[2]='B';array[3]='C';array[4]='D';array[5]='E';array[6]='F';array[7]='G';

function fake(){
    let text=document.getElementById('txt').value;
    let j=text.length;
    if(j>0){
        for(var i=1;i<=j;i++){
            str=str+array[i];
            if(i===array.length){
                document.getElementById('txt').value="";
                str='';
            }
        }
    }
    document.getElementById('txt').value=str;
    str='';
    setTimeout('fake()',1);
}