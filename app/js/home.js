$(document).ready(function() {

    var produtos = localStorage.getItem("produtos");

    if ( produtos ) {
        console.log("Produtos do Cache");
        var dados = JSON.parse(produtos);
        preencher( dados );
    } else {
        //buscar os produtos em destaque
        $.getJSON("http://localhost/app22019/json/produtos.php?op=destaques",
        function() {
            $("#msg").html("<div class='alert alert-warning'><img src='imgs/load.gif'> Carregando...</div>");
        }).done( function (dados) {
            console.log("Produtos armazenados no Cache");
            localStorage.setItem("produtos", JSON.stringify(dados));
            preencher( dados );
        })
    }

    //funcao para preencher os produtos
    function preencher( dados ) {
        $.each( dados, function( key, val ) {
            //adicionar os itens no .row
            console.log(val.nome);
            $(".row").append("<div class='col-md-6 col-sm-6 text-center'><div class='thumbnail'>"+val.imagem+"<p>"+val.nome+"</p><p class='valor'>"+val.valor+"</p><a href='produto.html?id="+val.id+"' class='btn btn-danger'>Detalhes</a></div></div>");
        })
        $("#msg").html("");
    }
})
