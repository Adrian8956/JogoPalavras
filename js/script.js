const frm = document.querySelector("form");

frm.addEventListener("submit", (e) =>{
    e.preventDefault();

    // obtém conteúdo dos campos (.trim() remove espaços na palavra no início e fim)
    const palavra = frm.inPalavra.value.trim();
    const dica = frm.inDica.value;

    // valida preenchimento (palavra não deve possuir espaços em branco no meio)
    if(palavra.includes(" ")){
        alert("Informe uma palavra válida (sem espaços)");
        frm.inPalavra.focus();
        return;
    }

    if(localStorage.getItem("jogoPalavra")){
        localStorage.setItem("jogoPalavra", localStorage.getItem("jogoPalavra") + ";" + palavra);
        localStorage.setItem("jogoDica", localStorage.getItem("jogoDica") + ";" + dica);
    }else{
        // senão, é a primeira inclusão: grava apenas a palavra / dica
        localStorage.setItem("jogoPalavra", palavra);
        localStorage.setItem("jogoDica", dica);
    }
})