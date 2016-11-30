<?php

session_start();
if (isset($_SESSION['logged'])) 
{
		$dbname=$_POST['dbname'];
		$sql=$_POST['console'];
	
	$con=mysqli_connect("localhost","testowy","test","$dbname");

	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	$result = mysqli_query($con,"$sql");

	echo "<table border='1'>
	<tr>
	<th>kolumna 1</th>
	<th>kolumna 2</th>
	</tr>";

	while($row = mysqli_fetch_array($result))
	{
		echo "<tr>";
		echo "<td>" . $row['login'] . "</td>";
		echo "<td>" . $row['pass'] . "</td>";
		echo "</tr>";
	}
	echo "</table>";
	mysqli_close($con);
}
?>