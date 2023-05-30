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
        pulo: 3.6, // aqui eu add uma variavel do tamanho do pulo do bird
        pular (){
            flappybird.valocidade = -flappybird.pulo; // aqui ele vai pegar a variavel de aceleração e ai vai negativar essa velocidade com a do pulo
        },
        gravidade: 0.20, // numero que peguei do video e funcionou
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
		  
		frameatual: 0,
		attframe (){
            // console.log("frames")
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;
            if(passouOIntervalo) {
              const baseDoIncremento = 1;
              const incremento = baseDoIncremento + flappybird.frameatual;
              const baseRepeticao = flappybird.movimentos.length;
              flappybird.frameatual = incremento % baseRepeticao
            }
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
                spriteX, spriteY,
                flappybird.largura, flappybird.altura,
                flappybird.x, flappybird.y,
                flappybird.largura, flappybird.altura,
            ); // aqui eu desenho a imagem
        }
    }
    return flappybird;
} 

//função pra criar canos
function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {
// para cada par de canos que eu tiver, vou desenhar os valores
            canos.pares.forEach(function(par){
                const yRandom = par.y;
                const spaceforcanos = 95;
// camos de cima
                const canoCeuX = par.x;
                const canoCeuY = yRandom;
                contexto.drawImage(
                    sprites, 
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )
// canos de baixo
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + spaceforcanos + yRandom; 
                contexto.drawImage(
                    sprites, 
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )
                par.canoCeu={
                    x:canoCeuX,
                    y:canos.altura + canoCeuY
                }
                par.canoChao={
                    x:canoChaoX,
                    y:canoChaoY
                }
            })

        },
        temcolisaocomobird(par){
            const head = globais.flappybird.y + 10;
            const foot = globais.flappybird.y + globais.flappybird.altura  - 20 ;
            if(globais.flappybird.x + globais.flappybird.largura>= par.x){
                if(head <= par.canoCeu.y){
                    return true;
                }
                if(foot >= par.canoChao.y){
                    return true;
                }
            }
            return false;
        },
        pares: [{}],
        att(){
            const before100frames = frames % 100 === 0; // depois de 100 frames ele vai adicionar um frame
            if(before100frames){
                canos.pares.push({ 
                    x:canvas.width,
                    y:- 150 * (Math.random() + 0.8 ), // gera valores aleatórios,
                });
            }  
            canos.pares.forEach(function(par){
                par.x = par.x -2;

                if(canos.temcolisaocomobird(par)){
                    
                    die.play(); // da play no audio
                    setTimeout(() => {
                        mudatela(Telas.start);
                    },250);
                }

                if(par.x + canos.largura <= 0){
                    // console.log(canos.pares); // ver os arrays 
                    canos.pares.shift(); // exclui os canos 
                }
            });
        }
    }
    return canos;
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

function criaScore(){
    const placar = {
        score: 0,
        desenha(){
            contexto.font = '20px "Cherry Bomb One"';
            contexto.fillStyle ='white';
            contexto.fillText(`Score: ${placar.score} `, canvas.width -90 ,35);
        },

        att(){
            const intervaloDeFrames = 30;
            const passouOIntervalo = frames % intervaloDeFrames === 0;
            if(passouOIntervalo){
                placar.score = placar.score + 1;
            }
            

        }
    }
    return placar;
}

const Telas = {
    start: {
        inicializa(){
            globais.flappybird = newbird();
			globais.chao = Criachao();
            globais.canos = criaCanos();
        },
        desenha (){
            background.desenha(); // chamando a função do background             
            globais.flappybird.desenha ();// chamando minha função do bird          
            globais.canos.desenha ();  
            globais.chao.desenha (); // chamando minha função de chão
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
    inicializa(){
        globais.score = criaScore();
    },

    desenha(){
        background.desenha(); // chamando a função do background
        globais.canos.desenha ();
        globais.chao.desenha (); // chamando minha função de chão
        globais.flappybird.desenha (); // chamando minha função do bird
        globais.score.desenha (); // chamando
    },

    click() {
        globais.flappybird.pular();
		wing.play();	
    },

    att()
    {
        globais.canos.att ();
        globais.chao.att();
        globais.flappybird.att(); // chamando minha função
        globais.score.att(); // placar
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