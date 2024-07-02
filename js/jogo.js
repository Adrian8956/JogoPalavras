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
});

const concluirJogo = () =>{
    respDica.innerText = "* Click o botao 'Iniciar Jogo' para jogar novamente";
    frm.inLetra.disabled = true;
    frm.btJogar.disabled = true;
    frm.btVerDica.disabled = true;
}

const trocarStatus = (num) =>{
    if(num > 0) imgStatus.src = `img/status${num}.jpg`;
 };

 const verificarFim = () =>{
    const chances = Number(respChances.innerText);

    if( chances == 0){
        respMensagemFinal.className = "display-3 text-danger";
        respMensagemFinal.innerText = `ah... é ${palavraSorteada}. Você perdeu!`;
        concluirJogo();
    }else if (respPalavra.innerText == palavraSorteada){
        respMensagemFinal.className = "display-3 text-primary";
        respMensagemFinal.innerText = "Parabéns!! você Ganhou";
        trocarStatus(4);
        concluirJogo()
    }
 }

frm.btVerDica.addEventListener("click", () =>{
  // verifica se o jogador já clicou anteriormente no botão
  if(respErros.innerText.includes("*")){
    alert("Você já solicitou a dica...");
    frm.inLetra.focus();
    return;
  }

  respDica.innerText = " * " + dicaSorteada;
  respErros.innerText += "*";

  const chances = Number(respChances.innerText) - 1;
  respChances.innerText = chances;

  trocarStatus(chances);

  verificarFim();

  frm.inLetra.focus();
});

frm.addEventListener("submit", (e) =>{
   e.preventDefault();

   const letra = frm.inLetra.value.toUpperCase();

   let erros = respErros.innerHTML;
   let palavra = respPalavra.innerText;

   // verifica se a letra apostada ja consta em erros ou na palavra
   if(erros.includes(letra) || palavra.includes(letra)){
    alert("Voce ja apostou esta letra");
    frm.inLetra.focus();
    return;
   }

   // se letra consta em palavraSorteada
   if(palavraSorteada.includes(letra)){
    let novaPalavra = "";

    for(let i = 0; i < palavraSorteada.length; i++){
        if(palavraSorteada.charAt(i) == letra){
            novaPalavra += letra;
        }else{
            novaPalavra += palavra.charAt(i);
        }
    }
    respPalavra.innerText = novaPalavra;
   }else{
    respErros.innerText += letra;
    const chances = Number(respChances.innerText) - 1;
    respChances.innerText = chances;

    trocarStatus(chances);
   }

   verificarFim(); // verifica se ja ganhou ou perdeu

   frm.inLetra.value = "";
   frm.inLetra.focus();
});