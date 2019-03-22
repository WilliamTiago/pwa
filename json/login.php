<?php
	session_start();

	include "config.php";

	$msg = "erro;";

	if ( $_POST ) {

		$email = $senha = "";
		if ( isset ( $_POST["email"] ) ) $email = trim ( $_POST["email"] );
		if ( isset ( $_POST["senha"] ) ) $senha = trim ( $_POST["senha"] );

		if (! filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {

			$msg = "erro;E-mail $email inválido!";

		} else if ( empty ( $senha) ) {

			$msg = "erro;Digite a senha!";

		} else {

			$sql = "select * from cliente where email = ? limit 1";
			$res = $pdo->prepare($sql);
			$res->bindParam(1, $email);
			$res->execute();
			$dados = $res->fetch(PDO::FETCH_OBJ);

			$senha = md5( $senha );

			if ( !isset ( $dados->id ) ) {
				$msg = "erro;Usuário não encontrado!";
			} else if ( $senha != $dados->senha ) {
				$msg = "erro;Senha digitada é inválida!";
			} else {
				$msg = "ok;$dados->id;$dados->nome";
			}


		}

	} else {

		$msg = "erro;Requisição inválida!";

	}

	echo $msg;