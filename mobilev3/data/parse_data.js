var xmlString = "<route><name>Lakeway</name><abrv>LAKE</abrv><eta><time>00:30</time><dest>MAIN</dest></eta></route>",
xmlDoc = $.parseXML( xmlString ),
$xml = $( xmlDoc ),
$abrv = $xml.find( "abrv" ).text() == "LAKE" ? $xml.find( "abrv" ) : false;

var time = $abrv.next().children("time").text();
var dest = $abrv.next().children("dest").text();