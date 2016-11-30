<?php
session_start();
require_once('lang/setup.php');
require_once('server_view.phtml');

	function DB_connect($dbasename)
	{
		$user = $_SESSION['usr'];
		$pass = $_SESSION['pas'];
		$dbase = 'mysql:dbname='.$dbasename.'; host=localhost';
		try
		{
			$pdo=new PDO($dbase,$user,passGenerate($pass));
			return $pdo;
		}
		catch(PDOException $e)
		{
			return false;
		}
	}

	function passGenerate($pass)
	{
		$salt0='Vs09dZ';
		$salt1='$%j@#RW';
		$pass=sha1($salt0.$pass.$salt1);
		return $pass;
	}
	
    function filter($data)
    {
        $data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
    }

	function db_conn()
	{
		$login=$_SESSION['usr'];
		$pass=passGenerate($_SESSION['pas']);
		try
		{
			$pdo=new PDO('mysql:dbname=pwi; host=localhost',$login,$pass);
			return $pdo;
		}
		catch(PDOException $e)
		{
			echo 'database connection failure: '.$e->getMessage();
		}
	}

	function showDBases($tab)
	{
		try
		{
			$pdo=db_conn();
			$stmt=$pdo->query('SHOW DATABASES');
			echo'
			<h4>'.$tab['dbases'].':</h4>
			<ol>';
			foreach($stmt as $row)
			{
				echo'<li onclick="ajax_get(\'menu=5&base='.$row['Database'].'\');">'.$row['Database']; //5
			}
			$stmt->closeCursor();
			echo'</ol>';
		}
		catch(PDOException $e)
		{
			echo'Connection failure: '.$e->getMessage();
		}
	}
	
switch($_GET['menu']){	
	case '1': 
			showDBases($GLOBALS);
			break;
	case '2': 
			console($GLOBALS);
			break;
	case '3': 
			settings($GLOBALS);
			break;
	case '4': 
			createTable($GLOBALS);
			break;
	case '5': 
			$_SESSION['base']=$_GET['base'];
			echo'wybrano bazę: '.$_GET['base'];
			break;
	case '6': 
			createTableForm($_GET['columns'],$_GET['tablename']);
			break;
	case '7':
			try
			{
				$pdo=DB_connect($_GET['database']);
				$stmt=$pdo->query($_GET['query']);
				$stmt->closeCursor();
				echo'zapytanie wykonane';
			}
			catch(PDOException $e)
			{
				echo'Connection failure: '.$e->getMessage();
			}
			break;
	case '8': 
			$pass=filter($_GET['dat']);
			$pass=passGenerate($pass);
			try
			{
				$pdo=DB_connect($_SESSION['base']);
				$stmt=$pdo->query("SET PASSWORD FOR".$_SESSION['pas']."@'localhost' = PASSWORD(".$pass.")");
				$stmt->closeCursor();
				echo'zapytanie wykonane';
				session_unset();
				session_destroy();
			}
			catch(PDOException $e)
			{
				echo'Connection failure: '.$e->getMessage();
			}			
			break;
}
?>