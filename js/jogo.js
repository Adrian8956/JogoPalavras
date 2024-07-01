const frm = document.querySelector("form");
const respPalavra = document.querySelector("#outPalavra");
const respErros = document.querySelector("#outErros");
const respDica = document.querySelector("#outDica");
const respChances = document.querySelector("#outChances");
const respMensagemFinal = document.querySelector("#outMensagemFinal");
const imgStatus = document.querySelector("img");

let palavraSorteada;
let dicaSorteada;

window.addEventListener("load", () =>{
    // se não há palavras cadastradas
    if(!localStorage.getItem("jogoPalavra")){
        alert("Cadastre palavras para jogar"); 
        frm.inLetra.disabled = true;
        frm.btJogar.disabled = true;
        frm.btVerDica.disabled = true;
    }

    // obtém conteúdo do localStorage e sepera em elementos de vetor
    const palavras = localStorage.getItem("jogoPalavra").split(";");
    const dicas = localStorage.getItem("jogoDica").split(";");

    const tam = palavras.length;

    // gera um número entre 0 e tam-1 (pois arredonda para baixo)
    const numAleatorio = Math.floor(Math.random() * tam);

    // obtém palavra (em letra maiúscula) e dica na posição do n° aleatório gerado
    palavraSorteada = palavras[numAleatorio].toUpperCase();
    dicaSorteada = dicas[numAleatorio];
    let novaPalavra = "";

    // for para exibir a letra inicial e as demais ocorrências desta letra na palavra
    for(const letra of palavraSorteada){
        //se igual a letra inicial, acrescenta esta letra na exibição
        if(letra == palavraSorteada.charAt(0)){
            novaPalavra += palavraSorteada.charAt(0);
        }else{
            novaPalavra += "_";
        }
    }

    respPalavra.innerText = novaPalavra
})