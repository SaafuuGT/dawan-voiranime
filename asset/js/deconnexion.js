const btnCo = document.getElementById('btn-co')
const btnDeco = document.getElementById('btn-deco')

if (JSON.parse(localStorage.getItem('connected'))){
    btnCo.style.display = 'none';
    btnDeco.style.display = '';
}

btnDeco.addEventListener('click', (event)=>{
    event.preventDefault();
    localStorage.setItem('connected', JSON.stringify(false));
    window.location.reload();
} );