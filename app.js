const imagemDetetive = document.querySelector(".imagem-procurando");
const container = document.querySelector(".conteudo__container-texto-decripto");
const containerTexto1 = document.querySelector(".conteudo__container-texto-decripto__texto-1");
const containerTexto2 = document.querySelector(".conteudo__container-texto-decripto__texto-2");
const containerTexto3 = document.getElementById("container-texto");
const botaoCopiar = document.querySelector(".conteudo__container-texto-decripto__botao");
const botaoDecriptografar = document.getElementById("botao-decripto");
const areaTexto = document.getElementById("texto-cripto");
const areaTextoRegras = document.querySelector(".conteudo__texto-cripto__regras__texto");

var textoParaCriptografar = "";
var textoParaDescriptografar = "";
containerTexto3.style.display = "none";
botaoCopiar.style.display = "none";

areaTexto.addEventListener("keypress", escrevendo, false);
botaoCopiar.addEventListener("click", copiar, false);


function criptografar(){
    textoParaCriptografar = String(areaTexto.value);

    if(textoParaCriptografar != ""){
        var textoParaCriptografar_min = textoParaCriptografar.toLowerCase();
        var textoParaCriptografar_lista = new Array();

        for(var i = 0; i < textoParaCriptografar_min.length; i++){
            if (textoParaCriptografar_min[i] === "a"){textoParaCriptografar_lista[i] = "ai";} // A -> AI
            else if (textoParaCriptografar_min[i] === "e"){textoParaCriptografar_lista[i] = "enter";} // E -> ENTER
            else if (textoParaCriptografar_min[i] === "i"){textoParaCriptografar_lista[i] = "imes";} // I -> IMES
            else if (textoParaCriptografar_min[i] === "o"){textoParaCriptografar_lista[i] = "ober";} // O -> OBER
            else if (textoParaCriptografar_min[i] === "u"){textoParaCriptografar_lista[i] = "ufat";} // U -> UFAT
            else {textoParaCriptografar_lista[i] = textoParaCriptografar_min[i];}
        }

        var textoFinalCriptografado = textoParaCriptografar_lista.join("");

        limparTela();

        containerTexto3.value = textoFinalCriptografado;

        botaoDecriptografar.disabled = false;
    }
    else{areaTextoVazia();}
}

function descriptografar(){
    textoParaDescriptografar = String(areaTexto.value);

    if(textoParaDescriptografar != ""){
        var textoParaDescriptografar_min = textoParaDescriptografar.toLowerCase();
        var textoParaDescriptografar_lista = new Array();
        var p = 0;
        
        for(var i = 0; i < textoParaDescriptografar_min.length; i++){
            
            // AI -> A
            if(textoParaDescriptografar_min[i] === "a"){
                if(textoParaDescriptografar_min[i+1] === "i"){
                    textoParaDescriptografar_lista[p] = "a";
                    i++;
                    p++;
                }
            }

            // ENTER -> E
            else if(textoParaDescriptografar_min[i] === "e"){
                if(textoParaDescriptografar_min[i+1] === "n"){
                    if(textoParaDescriptografar_min[i+2] === "t"){
                        if(textoParaDescriptografar_min[i+3] === "e"){
                            if(textoParaDescriptografar_min[i+4] === "r"){
                                textoParaDescriptografar_lista[p] = "e";
                                i = i + 4;
                                p++;
                            }
                        }
                    }
                }
            }

            // IMES -> I
            else if(textoParaDescriptografar_min[i] === "i"){
                if(textoParaDescriptografar_min[i+1] === "m"){
                    if(textoParaDescriptografar_min[i+2] === "e"){
                        if(textoParaDescriptografar_min[i+3] === "s"){
                            textoParaDescriptografar_lista[p] = "i";
                            i = i + 3;
                            p++;
                        }
                    }
                }
            }

            // OBER -> O
            else if(textoParaDescriptografar_min[i] === "o"){
                if(textoParaDescriptografar_min[i+1] === "b"){
                    if(textoParaDescriptografar_min[i+2] === "e"){
                        if(textoParaDescriptografar_min[i+3] === "r"){
                            textoParaDescriptografar_lista[p] = "o";
                            i = i + 3;
                            p++;
                        }
                    }
                }
            }

            // UFAT -> U
            else if(textoParaDescriptografar_min[i] === "u"){
                if(textoParaDescriptografar_min[i+1] === "f"){
                    if(textoParaDescriptografar_min[i+2] === "a"){
                        if(textoParaDescriptografar_min[i+3] === "t"){
                            textoParaDescriptografar_lista[p] = "u";
                            i = i + 3;
                            p++;
                        }
                    }
                }
            }

            else {textoParaDescriptografar_lista[p] = textoParaDescriptografar_min[i]; p++;}
        }
    
        var textoFinalDescriptografado = textoParaDescriptografar_lista.join("");

        limparTela();

        containerTexto3.value = textoFinalDescriptografado;

    }
    else{areaTextoVazia();}
}

function copiar(){
    var textoCopiado = String(containerTexto3.value);
    var clipboard = navigator.clipboard;

    if(clipboard == undefined){
        containerTexto3.select();
        document.execCommand('copy');

        botaoCopiar__efeito();
    } 
    
    else{
        navigator.clipboard.writeText(textoCopiado);

        botaoCopiar__efeito();
    }
}

function botaoCopiar__efeito(){
    botaoCopiar.innerHTML = "Copiado";

    setInterval(function () {
        botaoCopiar.innerHTML = "Copiar";
    }, 1500);
}

function areaTextoVazia(){
    areaTextoRegras.style.color = "red";
    areaTextoRegras.style.fontWeight = "400";
    areaTextoRegras.innerHTML = "Área de texto vazia!";

    areaTexto.style.border = "3px solid red";
    areaTexto.style.borderRadius = "16px";
}

function escrevendo(){
    areaTextoRegras.style.color = "";
    areaTextoRegras.style.fontWeight = "300";
    areaTextoRegras.innerHTML = "Apenas letras sem acento.";

    areaTexto.style.border = "";
    areaTexto.style.borderRadius = "";
}

function limparTela(){
    areaTexto.value = "";

    imagemDetetive.style.display = "none";
    containerTexto1.style.display = "none";
    containerTexto2.style.display = "none";

    containerTexto3.style.display = "";
    botaoCopiar.style.display = "";

    container.style.justifyContent = "space-between";
    container.style.padding = "5% 2% 5% 2%";
    container.style.height = "440px";
}