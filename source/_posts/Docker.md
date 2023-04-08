---
title: Docker基本命令
abbrlink: 38344
date: 2023-03-21 16:13:08
tags: 学习笔记
---

## 帮助命令

```shell
docker version				# 显示docker版本信息
docker info					# 显示docker系统信息，包括镜像和容器数量
docker 命令 --help		# 帮助命令
```

[Docker Docs address](https://docs.docker.com/engine/reference/commandline/)

## 镜像命令

### docker images

- 查看所有本地主机上的镜像

```shell
zeroti@zeroti_PC:~$ docker images
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
hello-world   latest    feb5d9fea6a5   7 months ago   13.3kB

# 解释
REPOSITORY	镜像的仓库源
TAG			镜像的标签
IMAGE ID	镜像的id
CREATED		镜像的创建时间
SIZE		镜像的大小

# 可选项
  -a, --all             # 列出所有的镜像
  -q, --quiet           # 只显示id
```

### docker search

- 搜索

```shell
zeroti@zeroti_PC:~$ docker search mysql
NAME                             DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql                            MySQL is a widely used, open-source relation…   12491     [OK]
mariadb                          MariaDB Server is a high performing open sou…   4808      [OK]

# 可选项，通过收藏来过滤
--filter=STARS=3000   # 搜索出来的镜像STARS大于3000
```

### docker pull

- 下载镜像

```shell
# 下载镜像	docker pull <镜像名>[:tag]
zeroti@zeroti_PC:~$ docker pull mysql
Using default tag: latest	# 如果不写 tag，默认是 latest 最新版本
latest: Pulling from library/mysql
4be315f6562f: Pull complete		# 分层下载，docker image的核心，联合文件系统
96e2eb237a1b: Pull complete
8aa3ac85066b: Pull complete
ac7e524f6c89: Pull complete
f6a88631064f: Pull complete
15bb3ec3ff50: Pull complete
ae65dc337dcb: Pull complete
573c3c7fa18d: Pull complete
9d10771b98b8: Pull complete
3d8ef442614b: Pull complete
7dc17a6cea26: Pull complete
752752efdaea: Pull complete
Digest: sha256:2dafe3f044f140ec6c07716d34f0b317b98f8e251435abd347951699f7aa3904
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:latest	# 真实地址

# 两条命令等价
docker pull mysql = docker.io/library/mysql:latest

# 指定版本下载
zeroti@zeroti_PC:~$ docker pull mysql:5.7
5.7: Pulling from library/mysql
4be315f6562f: Already exists
96e2eb237a1b: Already exists
8aa3ac85066b: Already exists
ac7e524f6c89: Already exists
f6a88631064f: Already exists
15bb3ec3ff50: Already exists
ae65dc337dcb: Already exists
a4c4c43adf52: Pull complete
c6cab33e8f91: Pull complete
2e1c4f2c43f6: Pull complete
2e5ee322af48: Pull complete
Digest: sha256:e767595ba3408fbb2dda493be3594b9a148178df58325fafe8b0363662935624
Status: Downloaded newer image for mysql:5.7
docker.io/library/mysql:5.7
```

![image-20220430115345212](https://thumbnail0.baidupcs.com/thumbnail/ddf03d537gfb031e124eaf59015ab20f?fid=2267656288-250528-1043811625548138&time=1679403600&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-LG0iei5YeRgzwmHDZTs4FJt1JIw%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=8770387549111721032&dp-callid=0&file_type=0&size=c710_u400&quality=100&vuk=-&ft=video)

### docker rmi

- 删除镜像

```shell
zeroti@zeroti_PC:~$ docker rmi -f 镜像id	# 删除指定镜像
zeroti@zeroti_PC:~$ docker rmi -f 镜像id 镜像id 镜像id 镜像id	# 删除多个镜像
zeroti@zeroti_PC:~$ docker rmi -f $(docker images -aq)	# 删除全部镜像
```



## 容器命令

**说明：有了镜像才可以创建容器**

例：

```
docker pull centos
```

### docker run

- 运行容器

```shell
docker run [可选参数] image

# 参数说明
--name="Name"	容器名字，用来区分容器：tomcat01，tomcat02
-d				后台方式运行
-it				使用交互方式运行，进入容器查看内容
-p				指定容器端口 -p 8080:8080
	-p ip:主机端口:容器端口
	-p 主机端口:容器端口 (常用)
	-p 容器端口
	容器端口
-P(大写)		   随机指定端口

# 启动并进入容器
zeroti@zeroti_PC:~$ docker run -it centos /bin/bash
[root@fd69e0861f85 /]# ls	# 查看容器内的centos，基础版本，很多命令不完善
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var

# 退出容器回到主机
[root@9c45858d0c26 /]# exit
exit
zeroti@zeroti_PC:~$
```

### docker ps

- 查看运行的容器

```shell
	# 列出当前正在运行的容器
zeroti@zeroti_PC:~$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

-a	# 列出当前正在运行的容器+历史运行过的容器
zeroti@zeroti_PC:~$ docker ps -a
CONTAINER ID   IMAGE          COMMAND       CREATED         STATUS                     PORTS     NAMES
9c45858d0c26   centos         "/bin/bash"   3 minutes ago   Exited (0) 3 minutes ago             dazzling_kare
fd69e0861f85   centos         "/bin/bash"   2 hours ago     Exited (0) 2 hours ago               recursing_banach
ec075c5483d5   feb5d9fea6a5   "/hello"      41 hours ago    Exited (0) 41 hours ago              silly_burnell
8e62f7b2c7cb   feb5d9fea6a5   "/hello"      44 hours ago    Exited (0) 44 hours ago              distracted_faraday

-n=[个数]	# 显示最近创建的容器
zeroti@zeroti_PC:~$ docker ps -n=1
CONTAINER ID   IMAGE     COMMAND       CREATED          STATUS                      PORTS     NAMES
9c45858d0c26   centos    "/bin/bash"   11 minutes ago   Exited (0) 11 minutes ago             dazzling_kare

-q	# 只显示容器id
```

- 退出容器

```shell
exit	# 直接退出并停止容器
ctrl+p+q	# 退出但不停止容器
```

### docker rm

- 删除容器

```shell
docker rm 容器id	# 删除指定容器，不能删除正在运行的容器，若需要强制删除需要加 -f
docker rm -f $(docker ps -aq)	# 删除所有容器
docker ps -aq|xargs docker rm	# 删除所有容器
```

- 启动和停止容器的操作

```shell
docker start 容器id	# 启动容器
docker restar 容器id	# 重启容器
docker stop 容器id	# 停止当前正在运行的容器
docker kill 容器id	# 强制停止正在运行的容器
```

## 常用其他命令

### 后台启动

```shell
# 命令 docker run -d 镜像名 启动容器
zeroti@zeroti_PC:~$ docker run -d centos

# 问题: docker ps，发现容器停止运行了

# 常见问题: docker 使用后台运行，就必须要有一个前台进程(docker f)
# 容器启动后发现没有提供服务就会自己停止
```

### 查看日志命令

```shell
# 如果使用
docker logs -tf --tail 容器id	
# 后没有日志

# 自己编写一段shell脚本
"while true;do echo journal;sleep 1;done"

zeroti@zeroti_PC:~$ docker run -d centos /bin/bash -c "while true;do echo journal;sleep 1;done"
9968fb4485966a803b8732372b0c7218dc78cbd7f2df51dc54c27b98615cc1d0
zeroti@zeroti_PC:~$ docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS     NAMES
9968fb448596   centos    "/bin/bash -c 'while…"   17 seconds ago   Up 17 seconds             distracted_feistel

# 显示日志
-tf		# 显示日志附带时间戳
--tail number	# 显示number行的日志
# 显示指定行数的日志
zeroti@zeroti_PC:~$ docker logs -tf --tail 10 9968fb448596
2022-05-10T02:44:14.894897600Z journal
2022-05-10T02:44:15.896720900Z journal
2022-05-10T02:44:16.898505000Z journal
2022-05-10T02:44:17.900718200Z journal
2022-05-10T02:44:18.903980000Z journal
2022-05-10T02:44:19.906051900Z journal
2022-05-10T02:44:20.909209400Z journal
2022-05-10T02:44:21.911071400Z journal
2022-05-10T02:44:22.912874900Z journal
2022-05-10T02:44:23.915469200Z journal
```



### 查看容器中的进程信息

```shell
zeroti@zeroti_PC:~$ docker top 9968fb448596
UID                 PID                 PPID                C                   STIME               TTY   
root                1412                1393                0                   02:42               ?
root                1831                1412                0                   02:48               ?
```

### 查看容器元数据

```shell
# 命令
dokcer inspect 容器id

# 测试
zeroti@zeroti_PC:~$ docker inspect 9968fb448596
[
    {
        "Id": "9968fb4485966a803b8732372b0c7218dc78cbd7f2df51dc54c27b98615cc1d0",
        "Created": "2022-05-10T02:42:07.0043628Z",
        "Path": "/bin/bash",
        "Args": [
            "-c",
            "while true;do echo journal;sleep 1;done"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 1412,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2022-05-10T02:42:07.4785849Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
        "Image": "sha256:5d0da3dc976460b72c77d94c8a1ad043720b0416bfc16c52c45d4847e53fadb6",
        "ResolvConfPath": "/var/lib/docker/containers/9968fb4485966a803b8732372b0c7218dc78cbd7f2df51dc54c27b98615cc1d0/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/9968fb4485966a803b8732372b0c7218dc78cbd7f2df51dc54c27b98615cc1d0/hostname",
        "HostsPath": "/var/lib/docker/containers/9968fb4485966a803b8732372b0c7218dc78cbd7f2df51dc54c27b98615cc1d0/hosts",
        "LogPath": "/var/lib/docker/containers/9968fb4485966a803b8732372b0c7218dc78cbd7f2df51dc54c27b98615cc1d0/9968fb4485966a803b8732372b0c7218dc78cbd7f2df51dc54c27b98615cc1d0-json.log",
        "Name": "/distracted_feistel",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "CapAdd": null,
            "CapDrop": null,
            "CgroupnsMode": "host",
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "ConsoleSize": [
                0,
                0
            ],
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": null,
            "BlkioDeviceWriteBps": null,
            "BlkioDeviceReadIOps": null,
            "BlkioDeviceWriteIOps": null,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "KernelMemory": 0,
            "KernelMemoryTCP": 0,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": false,
            "PidsLimit": null,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/88bbb9c8b2656c6a8b6580f7538ba8b1ff3bf6bcd3e2edd6e0e5a27daca73d58-init/diff:/var/lib/docker/overlay2/09e4a53d9cdec08d015a731c06316d17523fc6faf41df2ac052bb75c56f91bce/diff",
                "MergedDir": "/var/lib/docker/overlay2/88bbb9c8b2656c6a8b6580f7538ba8b1ff3bf6bcd3e2edd6e0e5a27daca73d58/merged",
                "UpperDir": "/var/lib/docker/overlay2/88bbb9c8b2656c6a8b6580f7538ba8b1ff3bf6bcd3e2edd6e0e5a27daca73d58/diff",
                "WorkDir": "/var/lib/docker/overlay2/88bbb9c8b2656c6a8b6580f7538ba8b1ff3bf6bcd3e2edd6e0e5a27daca73d58/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "9968fb448596",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/bash",
                "-c",
                "while true;do echo journal;sleep 1;done"
            ],
            "Image": "centos",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "desktop.docker.io/wsl-distro": "Ubuntu",
                "org.label-schema.build-date": "20210915",
                "org.label-schema.license": "GPLv2",
                "org.label-schema.name": "CentOS Base Image",
                "org.label-schema.schema-version": "1.0",
                "org.label-schema.vendor": "CentOS"
            }
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "9209fcc1f8384614c3a5f3a00294059a8db152e0e150141d59dda6c646c666bf",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {},
            "SandboxKey": "/var/run/docker/netns/9209fcc1f838",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "f13c8ddd000a8ff4e71d926f90a0be66d24bf60da6e983af1b38e4f2e57a6db3",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.2",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:02",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "8e2bba8950574fd42f9127fb1a66dbdc8e45d09b7a19acfd9d204304eb0d7942",
                    "EndpointID": "f13c8ddd000a8ff4e71d926f90a0be66d24bf60da6e983af1b38e4f2e57a6db3",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:02",
                    "DriverOpts": null
                }
            }
        }
    }
]
```

### 进入当前正在运行的命令

```shell
# 容器通常以后台方式运行，需要进入容器修改配置

# 命令
docker exec -it 容器id bashshell

# 测试
zeroti@zeroti_PC:~$ docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS     NAMES
9968fb448596   centos    "/bin/bash -c 'while…"   20 minutes ago   Up 20 minutes             distracted_feistel
zeroti@zeroti_PC:~$ docker exec -it 9968fb448596 /bin/bash
[root@9968fb448596 /]# ls
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
[root@9968fb448596 /]# ps -ef
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 02:42 ?        00:00:00 /bin/bash -c while true;do echo journal;sleep 1;done
root      1279     0  0 03:03 pts/0    00:00:00 /bin/bash
root      1326     1  0 03:03 ?        00:00:00 /usr/bin/coreutils --coreutils-prog-shebang=sleep /usr/bin/sle
root      1327  1279  0 03:03 pts/0    00:00:00 ps -ef

# 方式二
docker attach 容器id

# 测试
zeroti@zeroti_PC:~$ docker attach 9968fb448596
当前正在执行的代码...

# docker exec 	# 进入容器后开启一个新的终端，可以在里面操作（常用）
# docker attach	# 进入容器正在执行的终端，不会启动新的进程
```

### 从容器内拷贝文件到主机上

```shell
docker cp 容器id:容器内路径 目的主机路径

# 查看当前主机目录下
zeroti@zeroti_PC:~$ cd /home
zeroti@zeroti_PC:/home$ sudo mkdir test
[sudo] password for zeroti:
zeroti@zeroti_PC:/home$ ls
test  zeroti

# 进入容器
zeroti@zeroti_PC:/home$ docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED          STATUS          PORTS     NAMES
03edb435a99a   centos    "/bin/bash"   26 seconds ago   Up 25 seconds             recursing_rosalind
zeroti@zeroti_PC:/home$ docker attach 03edb435a99a
[root@03edb435a99a /]# cd /home
[root@03edb435a99a home]# ls
[root@03edb435a99a home]# touch docekrtest
[root@03edb435a99a home]# ls
docekrtest
[root@03edb435a99a home]# exit
exit
zeroti@zeroti_PC:/home$ sudo docker cp 03edb435a99a:/home/docekrtest /home
zeroti@zeroti_PC:/home$ ls
docekrtest  test  zeroti
```

## 总结

port  	  # 查看映射端口对应的容器内部源端口
pause	  # 暂停容器
ps        # 猎户容器列表
pull      # 从docker镜像源服务器拉取指定镜像或者库镜像
push      # 推送指定镜像或者库镜像至docker源服务器
restart   # 重启运行的容器
rm        # 移除一个或多个容器
rmi       # 移除一个或多个镜像 （无容器使用该镜像才可删除，否则需要删除相关容器才可继续或 -f 强制删除）
run       # 创建一个新的容器并运行一个命令
save      # 保存一个镜像为一个 tar 包【对应 load】
search    # 在 docker hub 中搜索镜像
start     # 启动容器
stop      # 停止容器
tag       # 给源中镜像打标签
top       # 查看容器中运行的进程信息
unpause   # 取消暂停容器
version   # 查看 docker版本号
wait      # 截取容器停止时的退出状态值

# 练习

## 例一（Docker安装Nginx）

```shell
# 1. 搜索镜像
zeroti@zeroti_PC:~$ docker search nginx
NAME                                              DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
nginx                                             Official build of Nginx.                        16876     [OK]

# 2. 拉取镜像
zeroti@zeroti_PC:~$ docker pull nginx
Using default tag: latest
latest: Pulling from library/nginx
42c077c10790: Pull complete
62c70f376f6a: Pull complete
915cc9bd79c2: Pull complete
75a963e94de0: Pull complete
7b1fab684d70: Pull complete
db24d06d5af4: Pull complete
Digest: sha256:2bcabc23b45489fb0885d69a06ba1d648aeda973fae7bb981bafbb884165e514
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest

# 3. 查看镜像
zeroti@zeroti_PC:~$ docker images
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
nginx         latest    0e901e68141f   2 days ago     142MB

# 以后台方式把nginx挂载到本地3344端口
# -d	后台运行
# --name [容器名]	给容器命名
# -p [本地端口]:[nginx内部端口]
zeroti@zeroti_PC:~$ docker run -d --name nginx01 -p 3344:80 nginx
47f4f5cbbaffb6e385a53e8e9ed78a950abf9b014e24cb866f6b5531561efffc

# 查看运行的镜像
zeroti@zeroti_PC:~$ docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED              STATUS              PORTS                  NAMES
47f4f5cbbaff   nginx     "/docker-entrypoint.…"   About a minute ago   Up About a minute   0.0.0.0:3344->80/tcp   nginx01

# 查看本地3344端口映射的nginx
zeroti@zeroti_PC:~$ curl localhost:3344
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>

# 进入nginx
zeroti@zeroti_PC:~$ docker exec -it nginx01 /bin/bash
root@47f4f5cbbaff:/# ls
bin   dev                  docker-entrypoint.sh  home  lib64  mnt  proc  run   srv  tmp  var
boot  docker-entrypoint.d  etc                   lib   media  opt  root  sbin  sys  usr
root@47f4f5cbbaff:/# whereis nginx
nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx
root@47f4f5cbbaff:/# cd /etc/nginx/
root@47f4f5cbbaff:/etc/nginx# ls
conf.d  fastcgi_params  mime.types  modules  nginx.conf  scgi_params  uwsgi_params
```

端口暴露的概念：

![端口暴露](https://thumbnail0.baidupcs.com/thumbnail/bf713ddc7la6edb2586ab0e04217ae5e?fid=2267656288-250528-317972083161356&time=1679403600&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-ogh9VtxKoFWk7DSdXQPacsLTIJo%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=8770370098478020900&dp-callid=0&file_type=0&size=c710_u400&quality=100&vuk=-&ft=video)

## 例二（Docker安装tomcat）

```shell
# 1.官方的使用
docker run -it --rm tomcat:9.0

# --rm方式一般用来测试，用完之后就会自动删除
zeroti@zeroti_PC:~$ docker run -it --rm tomcat:9.0
Unable to find image 'tomcat:9.0' locally
9.0: Pulling from library/tomcat
e756f3fdd6a3: Pull complete
bf168a674899: Pull complete
e604223835cc: Pull complete
6d5c91c4cd86: Pull complete
5e20d165240e: Pull complete
1334d60df9a8: Pull complete
16c2728dcd90: Pull complete
05288798d23d: Pull complete
22cc5e0633cb: Pull complete
0c572f1a581a: Pull complete
Digest: sha256:c20ac4dab13ca6ecd9e29cba39a3c34bb2f155528133315b1773b08012912deb
# 运行结束后使用docker ps发现找不到镜像（已被删除）
zeroti@zeroti_PC:~$ docker ps -a
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS                     PORTS     NAMES
47f4f5cbbaff   nginx     "/docker-entrypoint.…"   26 minutes ago   Exited (0) 9 minutes ago             nginx01
03edb435a99a   centos    "/bin/bash"              3 weeks ago      Exited (0) 3 weeks ago               recursing_rosalind
```

**一般情况**

```shell
# 下载镜像
zeroti@zeroti_PC:~$ docker pull tomcat
latest: Pulling from library/tomcat
e756f3fdd6a3: Already exists
bf168a674899: Already exists
e604223835cc: Already exists
6d5c91c4cd86: Already exists
5e20d165240e: Already exists
1334d60df9a8: Already exists
16c2728dcd90: Already exists
05288798d23d: Already exists
c022dc2b2581: Pull complete
d86ac2f896ee: Pull complete
Digest: sha256:b4e84cff017ff5202cb760ccb1373dd950158f926d6afb04bd5e9f7337291501
Status: Downloaded newer image for tomcat:latest
zeroti@zeroti_PC:~$ docker images
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
tomcat        latest    c795915cb678   2 days ago     680MB

# 启动运行镜像
zeroti@zeroti_PC:~$ docker run -d -p 3355:8080 --name tomcat01 tomcat
1c7cce5adc2175a53744a041b82e78a4df388b9f0feaa9b9a6e5e8389b07dbd9

# 测试访问没有问题,但报错404
http://localhost:3355/

# 进入容器
zeroti@zeroti_PC:~$ docker exec -it tomcat01 /bin/bash

# 发现问题：1.缺少linux命令，2. 缺少webapps
# 镜像原因，默认下载最小镜像（剔除所有非必要，只能保证最小环境运行）
```

思考：以后部署项目，每次进入容器非常麻烦，在容器外放置路径映像到内部
