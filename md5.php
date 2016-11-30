<?php
function generate($pass)
{
	$salt0='Vs09dZ';
	$salt1='$%j@#RW';
	$all=$salt0.$pass.$salt1;
	echo 'open: '.$all;
	echo '<br>md5: ';
	echo md5($all);
	echo '<br>sha1: '; 
	echo sha1($all);
	echo '<br>';
}

generate ('admin');
echo '<br>';
generate ('user');
echo '<br>';
generate ('testUser');

?>