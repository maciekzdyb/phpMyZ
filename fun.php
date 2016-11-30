<?php	
	function pwi_connect($user,$pass)
	{
		$user = filter($user);
		$pass = filter($pass);
		try
		{
			$pdo=new PDO('mysql:dbname=pwi; host=localhost',$user,sha1passGenerate($pass));
			return $pdo;
		}
		catch(PDOException $e)
		{
			//echo 'database connection failure: '.$e->getMessage();
			return false;
		}
	}
	
    function filter($data)
    {
        $data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
    }
    
	function md5passGenerate($pass)
	{
		$salt0='Vs09dZ';
		$salt1='$%j@#RW';
		$pass=md5($salt0.$pass.$salt1);
		return $pass;
	}
	
	function sha1passGenerate($pass)
	{
		$salt0='Vs09dZ';
		$salt1='$%j@#RW';
		$pass=sha1($salt0.$pass.$salt1);
		return $pass;
	}
	
    function tryLogin()
    {
		$mysql=false;
        $username=filter($_POST['username']);
        $password=filter($_POST['password']);
		$mysql = pwi_connect($username,$password);
        if ($mysql)
        {
			$_SESSION['usr'] = $username;
			$_SESSION['pas'] = $password;
            return true;
        }
        else
        {
			return false;
        }        
    }
	
    function createLoginBox($tab)
    {
        if (isset($_SESSION['logged']))
        {
            if (isset($_POST['logoutSubmit']))
            {
                session_unset();
                session_destroy();
                createLoginForm($tab);
            }
            else
            {
                createLogoutForm($tab);
            }
        }
        else
        {
            if (isset($_POST['loginSubmit']))
            {
                if (tryLogin()==true)
                {
                    $_SESSION['logged']=true;
                    $_SESSION['username']=filter($_POST['username']);
                    createLogoutForm($tab);
                }
                else
                {
					session_unset();
					session_destroy();
                    createLoginForm($tab);
                    echo "<p>".$tab['log_err']."</p>\n";

                }
            }
            else
            {
                createLoginForm($tab);
            }
        }
    }
?>
