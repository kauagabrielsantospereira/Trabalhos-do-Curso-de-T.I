function insertTODisplay(data){
    document.querySelector('#display').value += data;
}

function clean(){
    document.querySelector('#display').value = '';
}

function back(){
    const display = document.querySelector('#display');
    display.value = display.value.slice(0, -1);
}

function calcular(){

    var resultado = document.getElementById('display').value;
    if(resultado){
        document.getElementById('display').value = eval(resultado);
    }
    else{
        document.getElementById('display').value = 'Nada para calcular';
    }
}



