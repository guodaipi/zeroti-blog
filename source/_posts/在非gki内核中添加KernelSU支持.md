---
title: 在非gki内核中添加KernelSU支持
date: 2023-07-27 12:36:38
tags: android
---

## 一、前言

​	在Non-gki内核中添加KernelSU的前提得是编译好的内核能够正常开机（废话+1），所以本文也将会详细介绍安卓内核的编译过程以及在编译过程中可能遇到的情况.

​	写这个文章不是因为我技术有多好，只是因为我刚开始搞这个跟个**一样找不到路，所以现在稍微明白点了就写下来给想搞这个的看看，也是为了防止我自己以后忘了。。奶子不大好使记不住东西

### 1. 环境要求

一台Linux设备（虚拟机，Docker，WSL甚至是Terumx都是可以的），我这里以WSL2，Ubuntu 22.04.2 LTS为例

一部可以正常使用的安卓手机（废话+2）

可以让你连接到github和google的方法（你懂的§(*￣▽￣*)§）

最后再带上你聪明的小脑袋瓜，粗发！

### 2. 准备工作

- 首先需要下载所需要的依赖，跟坨屎一样多，直接复制执行就好

```shell
sudo apt-get install git ccache automake flex lzop bison gperf build-essential zip curl zlib1g-dev g++-multilib libxml2-utils bzip2 libbz2-dev libbz2-1.0 libghc-bzlib-dev squashfs-tools pngcrush schedtool dpkg-dev liblz4-tool make optipng maven libssl-dev pwgen libswitch-perl policycoreutils minicom libxml-sax-base-perl libxml-simple-perl bc libc6-dev-i386 lib32ncurses5-dev libx11-dev lib32z-dev
```

## 二、编译内核

### 1. 下载适合自己手机的内核build

​	这个东西需要自己去Github找，一般为```(android)_kernel_<手机厂商>_<cpu代号>```

```
# 以一加8T为例，高通骁龙865代号为sm8250，那么内核仓库名就可能是
android_kernel_oneplus_sm8250
kernel_oneplus_sm8250
```

我这里的例子是Handelinkernel-v2.6，我在氢的时候最喜欢的一个内核（同时也是最喜欢的一个版本）

```shell

```



