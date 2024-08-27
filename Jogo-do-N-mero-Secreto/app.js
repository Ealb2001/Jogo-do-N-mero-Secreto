// let titulo = document.querySelector("h1");
// titulo.innerHTML ="Jogo do número Secreto";   //dentro do html

// let paragrafo = document.querySelector("p");
// paragrafo.innerHTML = "Escolha um número entre 1 e 10";


let listaDeNumerosSorteados = [];

let numeroLimite = 100;

let numeroSecreto = gerarNumeroAleatorio();

let tentativas = 1;

//funão que altera os textos das tags do html
 function exibirTextoNaTela(tag,texto){
     let campo = document.querySelector(tag);
     campo.innerHTML= texto;
     responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );//narra o texto -ResponsiveVoiceS
 }

 function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do número Secreto');
    exibirTextoNaTela('p',' Escolha um número entre 1 e 10');
 }
 
exibirMensagemInicial();//exibi a mensagem inicial pela 1 vez

 function gerarNumeroAleatorio() {//funcao que gera numero aleatorio
    let numeroEscolhido = parseInt(Math.random()*numeroLimite+1); 
    let quantidadeDeElemntosNaLista = listaDeNumerosSorteados.length;//tamanho da lista

    if (quantidadeDeElemntosNaLista==numeroLimite){//caso todos os numeros forem sorteados , comeca o jogo de nvo com uma lista vazia
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){//verifica se o numero escolido(input) esta dentro da lista
        return gerarNumeroAleatorio();//gera um novo numero aleatorio caso o usuario acerte
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);//adiciona item na lista , quando o usuario erra
        console.log(listaDeNumerosSorteados);//mostra lista com 
        return numeroEscolhido;
        
    }
    
 }

function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute==numeroSecreto){
        exibirTextoNaTela('h1','Acertou!');
        let palavraTentativa = tentativas>1 ?'tentativas':'tentativa';
        let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute>numeroSecreto){
            exibirTextoNaTela('h1','Errou');
            exibirTextoNaTela('p',`O número é menor que ${chute}`);
        }else{
            exibirTextoNaTela('h1','Errou');
            exibirTextoNaTela('p',`O número é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
    
}

//funcão que limpar o campo input apos a tentativa errada
function limparCampo(){
    chute = document.querySelector('input');
    chute.value="";
}


//funcão que reinicia o jogo ao clica no botao

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);//desativo o botão ao certar o jogo ...começa novamente
}