var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject()
{
	var xmlHttp;
	try
	{
		xmlHttp=new XMLHttpRequest();
	}
	catch(e)
	{
		var XmlHttpVersions = new Array(
		"MSXML2.XMLHTTP.6.0",
		"MSXML2.XMLHTTP.5.0",
		"MSXML2.XMLHTTP.4.0",
		"MSXML2.XMLHTTP.3.0",
		"MSXML2.XMLHTTP",
		"Microsoft.XMLHTTP"
		);
	
		for (var i=0; i<XmlHttpVersions.length && !xmlHTTP; i++) 
		{
			try
			{
				xmlHttp = new ActiveXObject(XmlHttpVersions[i]);
			}
			catch(e) {}
		}
	}
	if (!xmlHttp)
		alert("faild to create XMLHttpRequest object")
	else 
		return xmlHttp
}

funtion process()
{
	if (xmlHttp)
	{
		try
		{
			xmlHttp.open("POST","ajax_dbases.php",true)
			xmlHttp.onreadystatechange = handleRequestStateChange;
			xmlHttp.send(null);
		}
		catch (e)
		{
			alert("Connection error:\n"+e.toString());
		}
	}
}

function handleRequestStateChange()
{
	if (xmlHttp.readyState == 4)
	{
		if (xmlHttp.status == 200)
		{
			try
			{
				handleServerResponse();
			}
			catch(e)
			{
				alert("Error reading the response: "+e.toString());
			}
		}
		else
		{
			alert("error:\n" + xmlHttp.statusText)
		}
	}
}

function handleServerResponse()
{
	var xmlResponse = xmlHttp.responseXML;
}


