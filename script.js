function ajax_post(){
   
	var httpRequest = new XMLHttpRequest();
   
    var url = "server.php";
	
    var database = document.getElementById("first_name").value;
    var table = document.getElementById("last_name").value;
    var vars = "firstname="+fn+"&lastname="+ln;
	
    httpRequest.open("POST", url, true);
    
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    httpRequest.onreadystatechange = function() {
	    if(httpRequest.readyState == 4 && httpRequest.status == 200) {
		    var return_data = httpRequest.responseText;
			document.getElementById("status").innerHTML = return_data;
	    }
    }
    httpRequest.send(vars); 
    document.getElementById("status").innerHTML = "processing...";
}

//-------------------------------------------------------------------------------------------------
var xmlHttp =createXmlHttpRequestObject();
//-------------------------------------------------------------------------------------------------
function createXmlHttpRequestObject()
{
	var xmlHttp;
	if (window.ActiveXObject)
	{
		try
		{
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch (e)
		{
			xmlHttp = false;
		}
	}
	else
	{
		try
		{
			xmlHttp = new XMLHttpRequest();
		}
		catch (e)
		{
			xmlHttp = false;
		}
	}
		if (!xmlHttp)
			alert ("failed to create XMLHttpRequest object");
		else
			return xmlHttp;	
}
//------------------------------------------------------------------------------------------------
function ajax_get(data) 
{	
	if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0)
	{
		xmlHttp.open("GET","server.php?"+data, true);
		xmlHttp.onreadystatechange = handleServerResponse;
		xmlHttp.send(null);
	}
	else
		setTimeout('ajax_get(data)',1000);
}
//------------------------------------------------------------------------------------------------
function sync_ajax_get(data) 
{	
	if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0)
	{
		xmlHttp.open("GET","server.php?"+data, false);
		xmlHttp.onreadystatechange = handleServerResponse;
		xmlHttp.send(null);
	}
	else
		setTimeout('ajax_get(data)',1000);
}
//------------------------------------------------------------------------------------------------
function handleServerResponse()
{
	myDiv = document.getElementById("content");
	if (xmlHttp.readyState == 4)
	{
		if (xmlHttp.status == 200)
		{
			try
			{
				response = xmlHttp.responseText;
				myDiv.innerHTML = response;
				
			}
			catch (e)
			{
				alert("Error: " +e.toString());
			}
		}
	}
}	
//------------------------------------------------------------------------------------------------
function selectall() {
	var tableName = document.getElementById("tname").value;
	var database = document.getElementById("dbname").value;
	if (tableName =="") {
		alert("tableName field is empty!");
	}
	else {
		var query ="SELECT * FROM " + database +"." + tableName + " WHERE 1";
		document.getElementById("console").value = query;		
	}		
}

function clearConsole() {
	document.getElementById("console").value = "";
}

function drawProgresbar(data)
{
	var c = document.getElementById("mycanvas");
	//var data = document.getElementById("can").value;
	//data = eval(data);
	var ctx = c.getContext("2d");

	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0,0,200,20);

	if(data>140)
		ctx.fillStyle = "#008000";
	else
		if (data>80)
			ctx.fillStyle = "#FF8C00";
		else
			ctx.fillStyle = "#FF0000";
	ctx.fillRect(0,0,data,20);
}

function settingsVisualization()
{
	document.getElementById("popraw").innerHTML='';
	var score = ratePass();
	score = score *2;
	//document.getElementById("suggestion").innerHTML=score;
	drawProgresbar(score);
}

function tableForm()
{
	var columnsNo = document.getElementById("colNo").value;
	var tabname = document.getElementById("tableName").value;
	var str = "&columns="+columnsNo+"&tablename="+tabname;
	ajax_get('menu=6'+str);
}

function ratePass()
{
	var passwd = document.getElementById("txtenter").value;
	var intScore = 0;
	if (passwd.length<5 && passwd.length>1)    
	{ 			
		intScore = (intScore+3); 		
	} 
	else 
		if (passwd.length>4 && passwd.length<8)  	
		{ 			
			intScore = (intScore+6); 		
		} 
		else 
			if (passwd.length>7 && passwd.length<16)	
			{ 			
				intScore = (intScore+12); 		
			} 
			else 
				if (passwd.length>15)  
				{
					intScore = (intScore+20);
				}
	if (passwd.match(/[a-z]/))                             
	{
		intScore = (intScore+5);
	}
	if (passwd.match(/[A-Z]/)) 
	{
		intScore = (intScore+5);
	}
	if (passwd.match(/\d+/))
	{
		intScore = (intScore+10);
	}
	if (passwd.match(/(.*[0-9].*[0-9].*[0-9])/))             // min trzy cyfry
	{
		intScore = (intScore+10);
	}
	if (passwd.match(/.[!,@,#,$,%,^,&,*,?,_,~]/))            // przynajmniej jeden znak specjalny
	{
		intScore = (intScore+10);
	}
	if (passwd.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) // przynajmniej dwa znaki specjalne
	{
		intScore = (intScore+10);
	}
	// połączenia
	if (passwd.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))        // duże i małe litery
	{
		intScore = (intScore+10);
	}
	if (passwd.match(/([a-zA-Z])/) && passwd.match(/([0-9])/)) // litery i liczby
	{
		intScore = (intScore+10);
	}
	//  litery, liczby i znaki specjalne
	if (passwd.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/))
	{
		intScore = (intScore+10)
	}			
	if (passwd.match(/pass|admin|access|user/i))  
	{
		intScore = (intScore-10);
	}	
	if (passwd.match(/123|321|000/)) 
	{
		intScore = (intScore-10);
	}	
	return intScore;	
}
	
function SQLcreateTable()
{
	var dbase_name = document.getElementById("currentDB").innerHTML;
	var table_name = document.getElementById("currentT").innerHTML;
	var columns_nr = document.getElementById("currentCol").innerHTML;
	
	var Query = 'CREATE TABLE '+dbase_name+'.'+table_name+'(id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,';
	for (i = 0; i < columns_nr; i++) 
	{ 
		var name = document.getElementById("nazwa"+i).value;
		var type = document.getElementById("select"+i).value;
		var walue = "";
		if (document.getElementById("null"+i).checked) walue ="NOT NULL";
		else
			walue = "";
		Query += name+' '+type+' '+walue;
		if (i<(columns_nr - 1)) Query +=', ';
		else Query +=')';
	}
	document.getElementById("showQuery").innerHTML = Query;
	//return Query;
	loadQuery();
}

function loadQuery()            // do fkcji wyzej
{
	var dbase_name = document.getElementById("currentDB").innerHTML;
	var table_name = document.getElementById("currentT").innerHTML;
	var query = document.getElementById("showQuery").innerHTML;
	sync_ajax_get('menu=2');
	document.getElementById("dbname").value=dbase_name;
	document.getElementById("tname").value=table_name;
	document.getElementById("console").value=query;
}

function executeQuery()
{
    var database = document.getElementById("dbname").value;
    //var table = document.getElementById("tname").value;
	var query =document.getElementById("console").value;
    var vars = "menu=7&database="+database+"&query="+query;   //----------------7
	ajax_get(vars);
}

function editPassword()
{
	var pass1 = document.getElementById("txtenter").value;
	var pass2 = document.getElementById("txtenter1").value;
	if((pass1 == pass2) && (pass1.length>4))
	{
		ajax_get('menu=8&dat='+pass1);
	}
	else 
		document.getElementById("popraw").innerHTML = 'popraw dane! hasła muszą być takie same i składać się z min 4 znaków';	
}

function selectpwi_users()
{
	var tableName = document.getElementById("tname").value;
	var database = document.getElementById("dbname").value;
	if (tableName =="") {
		alert("tableName field is empty!");
	}
	else {
		var query ="SELECT login,pass FROM " + database +"." + tableName + " WHERE 1";
		document.getElementById("console").value = query;		
	}	
}

function executepwi()
{
    var database = document.getElementById("dbname").value;
    //var table = document.getElementById("tname").value;
	var query =document.getElementById("console").value;
    var vars = "menu=9&database="+database+"&query="+query;   //----------------7
	ajax_get(vars);
}

function test()
{
	var tt = document.getElementById("currentDB").innerHTML;
	console.log(tt);
}
	