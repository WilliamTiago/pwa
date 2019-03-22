$(document).ready(function() {
    var id = retornaPagina();
    console.log( id );

    var produto = localStorage.getItem("produto"+id);

    if ( produto ) {
        console.log("Produto do Cache");
        dados = JSON.parse(localStorage.getItem("produto"));
        localStorage.setItem("produto"+id, JSON.stringify(dados) );
        preencherProduto(dados);
    } else {
        $.getJSON("http://localhost/app22019/json/produtos.php?op=produto&id="+id, function(){
        }).done( function ( dados )  {
            console.log("Armazenando produto no cache");
            localStorage.setItem("produto", JSON.stringify(dados) );
            localStorage.setItem("produto"+id, JSON.stringify(dados) );
            preencherProduto(dados);

        })
    }
})
    
function preencherProduto(dados) {
    $.each( dados, function ( key, val )  {
        $(".foto").html(val.imagem);
        $(".descricao").html("<p>"+val.descricao+"</p><p class='text-center'><a href='carrinho.html?op=add' class='btn btn-danger btn-lg'>Comprar</a></p>");
        $("h1").html(val.nome);
    })
}

