<?php
	$string = 'AsDfgHD123.!@#$%';
	echo 'string: '.$string;
	echo '<br>length: '.strlen($string);
	echo '<br> uppercase: ';
	preg_match_all('#([A-Z]{1})#', $string, $matches);
	echo $occurencies = sizeof($matches[1]);
	echo '<br> lowercase: ';
	preg_match_all('#([a-z]{1})#', $string, $matches);
	echo $occurencies = sizeof($matches[1]);
	echo '<br> digits: ';
	preg_match_all('#([0-9]{1})#', $string, $matches);
	echo $occurencies = sizeof($matches[1]);
	echo '<br> symbol: ';
	preg_match_all('#([\W]{1})#', $string, $matches);
	echo $occurencies = sizeof($matches[1]);

	

?>
