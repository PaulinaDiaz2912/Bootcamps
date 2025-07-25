document.addEventListener('DOMContentLoaded',function() {
    //Obtener la referencia de los documentos de la pagina
    const input_box = document.getElementById('input_box');
    const showBtn = document.getElementById('showBtn');
    const outputBox = document.getElementById('outputBox');

    //Añadir un observador al bóton
    showBtn.addEventListener('click',function() {
        const menssage = input_box.value;
        console.log('Dato ingresado',menssage);
        outputBox.textContent=menssage
    })
})
