const sprites = new Image();
sprites.src = '../assets/sprites.png'; // basicamente pega a imagem e carrega na url

const canvas = document.querySelector('canvas'); // selecionei a tag canvas
const contexto = canvas.getContext('2d'); // selecionei que seria 2d


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
const chao = {
    spriteX:0,
    spritesY:610,
    largura:224 ,
    altura:112,
    x:0,
    y:canvas.height - 112, // aqui eu peguei a altura do meu canvas e diminui com a altura da foto
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

//Bird
const flappybird = {
    spriteX:0,
    spritesY:0,
    largura:33,
    altura:24,
    x:10,
    y:50,
    gravidade: 0.25, // numero que peguei do video e funcionou
    valocidade:0 ,
    att(){
        flappybird.valocidade = flappybird.valocidade + flappybird.gravidade; // aqui a valocidade começa 0 e ai recebe velocidade que é 0 + gravidade 0,25 em loop
        flappybird.y = flappybird.y + flappybird.valocidade;
    },
    desenha(){
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
let telaAtiva = {};
function mudatela(novatela){
    telaAtiva = novatela;
}
const Telas = {
    start: {
        desenha (){
            background.desenha(); // chamando a função do background
            chao.desenha (); // chamando minha função de chão
            flappybird.desenha (); // chamando minha função do bird
            inicio.desenha(); },

        click() {
            mudatela(Telas.game);
        },
        
        att(){

        }
    }
};
  

Telas.game = {
    desenha()
    {
        background.desenha(); // chamando a função do background
        chao.desenha (); // chamando minha função de chão
        flappybird.desenha (); // chamando minha função do bird
    },

    att()
    {
        flappybird.att(); // chamando minha função
    }
};

function loop() {
    telaAtiva.desenha();
    telaAtiva.att();

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