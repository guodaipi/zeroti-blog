<?php
/*
 * @Author: Zhao
 * @Date: 2023-04-08 20:43:43
 * @LastEditTime: 2023-04-08 22:06:45
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \hexo\public\php\bing.php
 */
	//获取图片url
	$json_string = file_get_contents('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1');
	$data = json_decode($json_string, true);
	$url = 'https://cn.bing.com'.$data['images'][0]['url'];   //获取图片url
	//header("Location: {$url}");  //302跳转
	echo $url;

?>