<!DOCTYPE html>
<?php
    session_start();
	include('view.phtml');
    include 'fun.php';
	include_once 'lang/setup.php';
?>

<html>
    <head>
        <meta charset="UTF-8">
        <title>phpMyZ - database explorer</title>
        <link href="style.css" rel="stylesheet">
		<script language="javascript" type="text/javascript" src="script.js">
		</script>
    </head>
    <body>
        <a href="index.php?lang=en"><img src="img/en.png"></a>
		<a href="index.php?lang=pl"><img src="img/pl.png"></a>
        <header id="siteHeader"><h1>phpMyZ </h1></header>
		
        <nav id="navigation">
            <?php
                createLoginBox($GLOBALS);
				if (isset($_SESSION['logged'])){
					$_SESSION['base'] = 'pwi';
					createMenu($GLOBALS);
				}
            ?>  
        </nav>
        
        <section id="content"></section>
    </body>
</html>
