const html = document.querySelector('html');
const btFoco =  document.querySelector('.app__card-button--foco');
const btCurto =  document.querySelector('.app__card-button--curto');
const btLongo =  document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');

const imagem = document.querySelector('.app__image');
const textoPrincipal = document.querySelector('.app__title')

const duracaoFoco = 1500; 
const duracaoDescansoCurto = 300; 
const duracaoDescansoLongo = 900; 

btFoco.addEventListener('click', () => {
    mudaContexto('foco');

    btFoco.classList.add('active');
})

btCurto.addEventListener('click', () => {
    mudaContexto('descanso-curto');

    btCurto.classList.add('active');
})

btLongo.addEventListener('click', () => {
    mudaContexto('descanso-longo');

    btLongo.classList.add('active');
})

function mudaContexto(contexto) {
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    });

    html.setAttribute('data-contexto', contexto);
    imagem.setAttribute('src', `/imagens/${contexto}.png`);
    
    switch (contexto) {
        case 'foco':
            textoPrincipal.innerHTML = `Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            textoPrincipal.innerHTML = `Que tal dar uma respirada?,<br> <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo':
            textoPrincipal.innerHTML = `Hora de voltar à superfície.<br> <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break; 
        default:
            break;       
    }
}