const html = document.querySelector('html');
const btFoco =  document.querySelector('.app__card-button--foco');
const btCurto =  document.querySelector('.app__card-button--curto');
const btLongo =  document.querySelector('.app__card-button--longo');
const btStartPause = document.querySelector('#start-pause');
const btStartPauseSpan = document.querySelector('#start-pause span');
const btStartPauseImg = document.querySelector('#start-pause img');
const botoes = document.querySelectorAll('.app__card-button');
const timer = document.querySelector('#timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somPlay = new Audio('/sons/play.wav');
const somPause = new Audio('/sons/pause.mp3');
const somBeep = new Audio('/sons/beep.mp3');

const imagem = document.querySelector('.app__image');
const musicaInput = document.querySelector('#alternar-musica')
const textoPrincipal = document.querySelector('.app__title')

const duracaoFoco = 1500; 
const duracaoDescansoCurto = 300; 
const duracaoDescansoLongo = 900; 

let tempoEmSegundos = duracaoFoco;
let intervaloId;

musica.loop = true;
somPause.volume = 0.1;
somPlay.volume = 0.1;
somBeep.volume = 0.1;

musicaInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

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
            tempoEmSegundos = duracaoFoco;
            break;
        case 'descanso-curto':
            textoPrincipal.innerHTML = `Que tal dar uma respirada?,<br> <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            tempoEmSegundos = duracaoDescansoCurto;
            break;
        case 'descanso-longo':
            textoPrincipal.innerHTML = `Hora de voltar à superfície.<br> <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            tempoEmSegundos = duracaoDescansoLongo;
            break; 
        default:
            break;       
    }

    tempoNaTela();
}

const timerFoco = () => {
    if (tempoEmSegundos <= 0) {
        somBeep.play();
        zerar();        
        alert('timer finalizado');
        return;
    }    
    tempoEmSegundos -= 1;
    tempoNaTela();       
}

btStartPause.addEventListener('click', startPause) 

function startPause() {
    if (intervaloId) {
        somPause.play();        
        zerar();        
        return;
    }
    somPlay.play();
    intervaloId = setInterval(timerFoco, 1000);
    btStartPauseImg.setAttribute('src', '/imagens/pause.png');    
    btStartPauseSpan.textContent = 'Pausar';
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
    btStartPauseImg.setAttribute('src', '/imagens/play_arrow.png');
    btStartPauseSpan.textContent = 'Começar';
}

function tempoNaTela() {
    const tempo = new Date(tempoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'});
    timer.innerHTML = `${tempoFormatado}`;
}

tempoNaTela();