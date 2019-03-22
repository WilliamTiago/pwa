<?php
	header("Content-type:application/json");
	include "config.php";

	$op = "";
	if ( isset ( $_GET["op"] ) ) $op = trim ( $_GET["op"] );

	if ( empty ( $op ) ) {
		$sql = "select * from produto";
		$res = $pdo->prepare($sql);	
	} else if ( $op == "busca") {
		$palavra = trim ( $_GET["palavra"] );
		$palavra = "%$palavra%";

		$sql = "select * from produto where nome like ? ";
		$res = $pdo->prepare($sql);
		$res->bindParam(1, $palavra);
	} else if ( $op == "destaques") {
		$sql = "select * from produto where destaque = 'S' order by rand() limit 4";
		$res = $pdo->prepare($sql);
	} else if ( $op == "produto") {
		$id = $_GET["id"];
		$sql = "select * from produto where id = ? ";
		$res = $pdo->prepare($sql);
		$res->bindParam(1, $id);

	} else if ( $op == "categoria") {
		$id = $_GET["id"];
		$sql = "select p.*, c.nome categoria from produto p
		inner join categoria c on (c.id = p.categoria_id)
		where p.categoria_id = ? ";
		$res = $pdo->prepare($sql);
		$res->bindParam(1, $id);
	}

	$res->execute();
	while ($d = $res->fetch(PDO::FETCH_OBJ)) {
		$d->imagem = "<img src='../imgs/".$d->imagem."' class='img'>";
		$d->slug = slugify($d->nome);
		$d->valor = number_format($d->valor,2,",",".");
		$dados[$d->id] = $d;
	}

	if ( !isset($dados) ) $dados= "";
	echo json_encode($dados);