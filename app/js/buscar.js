buscar.js

$(document).ready(function(){

    //pegar a palavra
    var palavra = retornaPagina();

    //colocar uma mensagem
    $("#msg").html("<img src='imgs/load.gif'> Aguarde, carregando");

    $.getJSON("http://localhost/app22019/json/produtos.php?op=busca&palavra="+palavra, function(){

    }).done(function (dados){

        $.each( dados, function ( key, val ) {
            //adicionar os valores na grid
            $(".row").append("<div class='col-md-3 col-sm-6 text-center'><div class='thumbnail'>"+val.imagem+"<h2>"+val.nome+"</h2><p class='valor'>R$ "+val.valor+"</p><p><a href='produto.html?id="+val.id+"' class='btn btn-danger btn-lg'>Detalhes</a></p></div></div>");
            //apagar a mesagem de carregando

        })
        $("#msg").html("Resultados da busca por: "+palavra);
    })
})

