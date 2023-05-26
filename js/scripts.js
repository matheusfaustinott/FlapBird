const sprites = new Image();
sprites.src = '../assets/sprites.png'; // basicamente pega a imagem e carrega na url
const die = new Audio();
die.src = '../assets/songs/die.mp3';
const wing = new Audio();
wing.src = '../assets/songs/wing.mp3';


const canvas = document.querySelector('canvas'); // selecionei a tag canvas
const contexto = canvas.getContext('2d'); // selecionei que seria 2d

let frames =0; // pegando os frames do jogo
// vou fazer uma const para guardar as informações da imagem

//background
const background = {
    spriteX:390,
    spritesY:0,
    largura:275 ,
    altura:204,
    x:0,
    y:canvas.height - 204, // aqui eu peguei a altura do meu canvas e diminui com a altura da foto
    desenha(){

        contexto.fillStyle="#70c5ce" // ja peguei pronto, mas aqui colocar um background no meu canvas
        contexto.fillRect(0,0, canvas.width, canvas.height) // backgroud é aplicado no x=0 e y=0 do canvas, ou seja, nele todo
        contexto.drawImage(
            sprites,
            background.spriteX, background.spritesY,
            background.largura, background.altura,
            background.x, background.y,
            background.largura, background.altura,);  

        contexto.drawImage(
            sprites,
            background.spriteX, background.spritesY,
            background.largura, background.altura,
            (background.x + background.largura) , background.y,
            background.largura, background.altura,); 
    }
};

//Chão 
function Criachao(){
	const chao = {
		spriteX:0,
		spritesY:610,
		largura:224 ,
		altura:112,
		x:0,
		y:canvas.height - 112, // aqui eu peguei a altura do meu canvas e diminui com a altura da foto
		att() {
			const repeteEm = chao.largura / 24.8889;
	  
			if (chao.x <= - repeteEm){
			  return chao.x=0
			}
	  
			chao.x = chao.x - 1;
		},
		desenha(){
			contexto.drawImage(
				sprites,
				chao.spriteX, chao.spritesY,
				chao.largura, chao.altura,
				chao.x, chao.y,
				chao.largura, chao.altura,);  
	
			contexto.drawImage(
				sprites,
				chao.spriteX, chao.spritesY,
				chao.largura, chao.altura,
				(chao.x + chao.largura) , chao.y, //  aqui eu juntei pra aumentar a imagem
				chao.largura, chao.altura,);
			  // aqui eu criei uma função dentro da minha const para chamar ela futuramente
		}
	};
	return chao;
}

// aqui eu vou fazer a função que vai ser chamada dentro do bird que seta a colisao com o chao
function colisao (flappybird,chao){
    if (flappybird.y + flappybird.altura >= chao.y){
		 return true
	};
    return false;
} // então aqui eu peguei a função "colisao" e botei os parametros dentro dela, bird e chao, pois são eles que vou usar
// ai eu setei para que o bird fique na altura do chao, porem - a altura do proprio bird pois quero que ele fique em cima do chao


//essa função reinicia o bird todo game
function newbird(){
    //Bird
    const flappybird = {
        spriteX:0,
        spritesY:0,
        largura:33,
        altura:24,
        x:10,
        y:50,
        pulo: 4.6, // aqui eu add uma variavel do tamanho do pulo do bird
        pular (){
            flappybird.valocidade = -flappybird.pulo; // aqui ele vai pegar a variavel de aceleração e ai vai negativar essa velocidade com a do pulo
        },
        gravidade: 0.25, // numero que peguei do video e funcionou
        valocidade:0, // velocidade inicial que vai aumentar com a gravidade(ou seja v = Δs/Δt formula da velocidade)
        att(){
            if(colisao(flappybird, globais.chao)){
				die.play(); // da play no audio
				setTimeout(() => {
					mudatela(Telas.start);
				},350); // delay pra ir para a tela de start quando morre
            	return; // aqui ele para de rodar a gravidade
            } // aqui basicamente eu botei um if chamando uma variavel d minha função colisao e setei os parametros dela
            flappybird.valocidade = flappybird.valocidade + flappybird.gravidade; // aqui a valocidade começa 0 e ai recebe velocidade que é 0 + gravidade 0,25 em loop
            flappybird.y = flappybird.y + flappybird.valocidade;
        },
		movimentos: [
			{ spriteX: 0, spriteY: 0, }, // asa pra cima
			{ spriteX: 0, spriteY: 26, }, // asa no meio 
			{ spriteX: 0, spriteY: 52, }, // asa pra baixo
			{ spriteX: 0, spriteY: 26, }, // asa no meio 
		  ],
		  
		frameatual:0,
		attframe (){

		},
        desenha(){
			flappybird.attframe();
			const { spriteX, spriteY } = flappybird.movimentos[flappybird.frameatual]; // abrindo a lista pra selecionar a cena de acordo com o frame
            contexto.drawImage(
                // image (nome da imagem),
                // sx, distancia que a gnt quer pegar na imagem no x
                // sy, e aqui no y
                // sWidth, (tamanho do conteudo dentro da imagem)
                // sHeight, 
                // dx, (distancia dentro do nosso body)
                // dy, 
                // dWidth, 
                // dHeight
                sprites,
                flappybird.spriteX, flappybird.spritesY,
                flappybird.largura, flappybird.altura,
                flappybird.x, flappybird.y,
                flappybird.largura, flappybird.altura,
            ); // aqui eu desenho a imagem
        }
    }
    return flappybird;
} 

// adicionar a tela de inicio 
const inicio = {
    spriteX:134,
    spritesY:0,
    largura:174 ,
    altura:152,
    x:(canvas.width/2) - 174 / 2,
    y:50,
    desenha(){
        contexto.drawImage(
            sprites,
            inicio.spriteX, inicio.spritesY,
            inicio.largura, inicio.altura,
            inicio.x, inicio.y,
            inicio.largura, inicio.altura,
        ); 
    }
}
// criar uma const para as telas
const globais = {}; // todo game
let telaAtiva = {};
function mudatela(novatela){
    telaAtiva = novatela;

    if(telaAtiva.inicializa) {
    	telaAtiva.inicializa();
    }
}

const Telas = {
    start: {
        inicializa(){
            globais.flappybird = newbird();
			globais.chao = Criachao();
        },
        desenha (){
            background.desenha(); // chamando a função do background
            globais.chao.desenha (); // chamando minha função de chão
            globais.flappybird.desenha (); // chamando minha função do bird
            inicio.desenha(); 
        },

        click() {
            mudatela(Telas.game);
        },

        att(){
			globais.chao.att();
        }
    }
};
  

Telas.game = {
    desenha(){
        background.desenha(); // chamando a função do background
        globais.chao.desenha (); // chamando minha função de chão
        globais.flappybird.desenha (); // chamando minha função do bird
    },

    click() {
        globais.flappybird.pular();
		wing.play();	
    },

    att()
    {
        globais.flappybird.att(); // chamando minha função
    }
};

function loop() {
    telaAtiva.desenha();
    telaAtiva.att();
	frames = frames + 1;
    requestAnimationFrame(loop);
} // desenha os quadros na tela em looping, FPS 
// aqui a ordem de desenhos importa para sobrepor um ou outro

window.addEventListener('click', function() {
    if(telaAtiva.click) {
      telaAtiva.click();
    }
  });

mudatela(Telas.start);
loop();