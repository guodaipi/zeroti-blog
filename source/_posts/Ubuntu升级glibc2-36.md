---
title: Ubuntu升级glibc2.36
tags: Linux遇到的问题
abbrlink: 30270
date: 2023-03-23 19:54:45
---

1. 查看现有版本

  ```shell
  zeroti@zeroti_PC:~$ ldd --version
  ldd (GNU libc) 2.35
  Copyright (C) 2022 Free Software Foundation, Inc.
  This is free software; see the source for copying conditions.  There is NO
  warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  Written by Roland McGrath and Ulrich Drepper.
  ```

2. 下载指定版本的gblic：https://ftp.gnu.org/gnu/glibc/

3. 解压到随意路径后进行编译

	```shell
	cd glibc-2.36	#进入解压的路径
	sudo mkdir build && cd build	#新建build文件夹并进入
	../configure --prefix=/usr/local --disable-sanity-checks  #需要参数
	sudo make -j4		#开始编译
	sudo make install	#安装
	```

4. 如果正常安装就完成了





- 如果报错**Can’t open configuration file /usr/local/etc/ld.so.conf: No such file or directory**就是缺少了必要的编译文件 ld.so.conf。通过 find 命令找到对应的文件位置。

	```shell
	find / -name "ld.so.conf"
	cp /etc/ld.so.conf /usr/local/etc/
	make install
	```

	

