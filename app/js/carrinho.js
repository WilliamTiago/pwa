$(document).ready( function () {
    
    $(".btn-limpar").click(function() {
        localStorage.clear("carrinho");
        location.href="carrinho.html";
    })

    $(".btn-continuar").click(function(){
        location.href="index.html";
    })

    //verificar para adicionar o produto no carrinho
    var op = retornaPagina();
    if ( op == "add" ) {
        //pegar o produto
        var produto = JSON.parse( localStorage.getItem("produto") );
        var carrinho = JSON.parse( localStorage.getItem("carrinho") );

        //verificar se tem algo no carrinho
        if ( !carrinho ) {
            carrinho = [];
        }

        //objeto a ser inserido no carrinho
        $.each(produto, function( key, val) {
            produto = {
                id: val.id,
                nome: val.nome,
                imagem: val.imagem,
                valor: val.valor
            };
            console.log(val.id)
        })

        carrinho.push(produto);
        localStorage.setItem("carrinho",JSON.stringify(carrinho) );

    }


    //listar os produtos do carrinho
    carrinho = localStorage.getItem("carrinho");

    if ( carrinho ) {

        produto = JSON.parse( carrinho );
        var total = 0;

        $.each( produto, function( key, val )  {

            $("tbody").append("<tr id='linha"+key+"'><td>"+val.imagem+"</td><td>"+val.nome+"</td><td>R$ "+val.valor+"</td><td><button type='button' class='btn btn-danger' onclick='removerItem("+key+")'><i class='glyphicon glyphicon-remove'></i></button></td></tr>");
            //formatar o valor
            var valor = formatar(val.valor);
            //somar o valor ao total
            total = total + valor;

 	   })
 	   //formatar em valor real
 	   total = formatarReal(total);
 	   //jogar na tabela
 	   $("tfoot").html("<tr><td colspan='2'>TOTAL:</td><td colspan='2'>R$ "+total+"</td></tr>");

    }

})
//funcao para remover o item
function removerItem(key) {
    if ( confirm ( "Deseja remover este item?" ) ) {
        var carrinho = localStorage.getItem("carrinho");
        //remover o item
        carrinho = JSON.parse(carrinho);
        carrinho.splice(key, 1);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        //apagar a linha
        $("#linha"+key).hide("fast");
        //redirecionar
        location.href="carrinho.html";
    }
}

//forma simples de formatar valores

function formatar(valor) {
    
    valor = valor.replace(".","");
    return parseFloat(valor.replace(",","."));

}


function formatarReal(valor) {
   valor = valor.toFixed(2).split('.');
   valor[0] = valor[0].split(/(?=(?:...)*$)/).join('.');
   return valor.join(',');
}

