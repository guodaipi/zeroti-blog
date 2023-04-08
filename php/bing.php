<!-- <?php
	//获取图片url
	$json_string = file_get_contents('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1');
	$data = json_decode($json_string, true);
	$url = 'https://cn.bing.com'.$data['images'][0]['url'];   //获取图片url
	//header("Location: {$url}");  //302跳转
	echo $url;

?> -->

<?php
$str=file_get_contents('http://cn.bing.com/HPImageArchive.aspx?idx=0&n=1');
if(preg_match("/<url>(.+?)<\/url>/ies",$str,$matches)){
$imgurl='http://cn.bing.com'.$matches[1];
}
if($imgurl){
header('Content-Type: image/JPEG');
@ob_end_clean();
@readfile($imgurl);
@flush(); @ob_flush();
exit();
}else{
exit('error');
}
?>