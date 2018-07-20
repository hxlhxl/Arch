# Docker简介

- 使用Go语言编写
- 基于Linux的`cgroup`, `namespace`和`UnionFS`
- 进程隔离，操作系统层面的虚拟化技术
- lxc -> libcontainer -> runC,contianrd
- docker无内核，运行于宿主的kernel上
- docker无硬件虚拟化

## Docker的优势

- 压榨系统资源
- 快速启动时间
- 开发环境一致
- CI/CD
- DevOps
- 维护成本

# 基本概念

## 镜像(Image)

- 分层
- 
- 

## 容器(Container)

- Image和Container的关系，就和Class和Instance的关系一样的。
- 容器是一个进程
- 容器是一个拥有独立namespace
- 容器可以拥有自己的root文件系统、网络配置、进程空间、用户ID空间。
- 容器分层存储： 容器运行在镜像之上,镜像之上的一层为容器存储层
- 容器存储层的生命周期和容器一样，容器消亡时，存储于容器存储层的数据也会消失
- 容器不应该向容器存储层内写入任何数据，应该使用数据卷`Volumn`或者绑定`宿主目录`
- `数据卷`生命周期独立于容器，容器消亡，`数据卷`不会消亡


## 仓库(Repository)
和`Yum Repository`,`Npm Repository`这种东西差不多，就是把镜像、库放到服务器上，分布式的客户端可以拉取这些服务。
`Docker Registry`就是提供Docker镜像的服务。
`Docker Registry`中有各种仓库`Repository`，仓库就是同一种软件的集合，而`Docker Hub`中会有用户角色的存在，所以一般仓库的名称有两段，比如`jwilder/nginx-proxy`
`Repository`下的软件会有不同的版本，在`Docker Registry`中，版本是通过`tag`管理的，默认是`latest`版本
处了`Docker Hub`官方`Registry`之外，用户也可以自己搭建，官方提供了`Docker Registry`作为基础`Registry`服务；用户也可以使用第三方实现了`Docker Registry API`接口的Registry服务，比如`VMWare Harbor`,`Sonatype Nexus`。



# 安装Docker

## ArchLinux

```
[husa@archlinux ~]$ sudo pacman -S docker
[husa@archlinux ~]$ sudo groupmems -g docker -a husa
[husa@archlinux ~]$ sudo usermod -aG docker $USER
[husa@archlinux ~]$ sudo groupmems -g docker -l
husa
[husa@archlinux ~]$ logout
[husa@archlinux ~]$ re-ssh-login
[husa@archlinux ~]$ docker run hello-world

[husa@archlinux ~]$ docker run hello-world


Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/engine/userguide/

[husa@archlinux ~]$ logout  # 阿里云镜像加速器
# docker默认在/etc/docker/daemon.json
    {
        "registry-mirrors": [
                "https://fvrmctxg.mirror.aliyuncs.com"
        ]
    }

[husa@archlinux ~]$ sudo systemctl restart docker.service
```



# 使用镜像

## docker pull

```
[husa@archlinux ~]$ docker pull fvrmctxg.mirror.aliyuncs.com/library/ubuntu:latest

[husa@archlinux ~]$ docker pull --help

Usage:  docker pull [OPTIONS] NAME[:TAG|@DIGEST]

Pull an image or a repository from a registry

Options:
  -a, --all-tags                Download all tagged images in the repository
      --disable-content-trust   Skip image verification (default true)

```

## docker image

- docker image ls
- docker image ls -a    查看所有镜像(包含中间层)
- docker image ls --digests
- docker image ls --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}"
- docker image ls -f dangling=true
    虚悬镜像(`dangling image`)
- docker image prune
    删除无用镜像(Remove ununsed images)
- docker image rm
```
[husa@archlinux ~]$ docker image ls -a --digests
REPOSITORY                                    TAG                 DIGEST                                                                    IMAGE ID            CREATED             SIZE
hello-world                                   latest              sha256:4b8ff392a12ed9ea17784bd3c9a8b1fa3299cac44aca35a85c90c5e3c7afacdc   2cb0d9787c4d        43 hours ago        1.85kB
ubuntu                                        latest              sha256:5f4bdc3467537cbbe563e80db2c3ec95d548a9145d64453b06939c4592d67b6d   113a43faa138        5 weeks ago         81.1MB
fvrmctxg.mirror.aliyuncs.com/library/ubuntu   latest              sha256:5f4bdc3467537cbbe563e80db2c3ec95d548a9145d64453b06939c4592d67b6d   113a43faa138        5 weeks ago         81.1MB
[husa@archlinux ~]$ docker image rm ubuntu@sha256:5f4bdc3467537cbbe563e80db2c3ec95d548a9145d64453b06939c4592d67b6d
Untagged: ubuntu@sha256:5f4bdc3467537cbbe563e80db2c3ec95d548a9145d64453b06939c4592d67b6d

[husa@archlinux ~]$ docker  rmi -f 2cb0d9787c4d
Untagged: hello-world:latest
Untagged: hello-world@sha256:4b8ff392a12ed9ea17784bd3c9a8b1fa3299cac44aca35a85c90c5e3c7afacdc
Deleted: sha256:2cb0d9787c4dd17ef9eb03e512923bc4db10add190d3f84af63b744e353a9b34
```
    Untagged: 删除标签
    Deleted: 删除镜像，当一个镜像的所有标签都是Untagged，那么就会触发Delete操作，删除这个镜像
## docker system

- docker system df


## docker exec
Usage: docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
Run a command in a running container

Options:
    
    -i: interactive,Keep STDIN open even if not attached
    -t: Allocate a pesudo-TTY

```
[root@osboxes ~]# docker run --name webserver -d -p 80:80 nginx
[root@osboxes ~]# curl 192.168.145.132:80
[root@osboxes ~]# docker exec -it webserver bash
root@39695edfe799:/# echo '<h1>Hello,Docker!</h1>' > /usr/share/nginx/html/index.html

[root@osboxes ~]# curl 192.168.145.132:80
<h1>Hello,Docker!</h1>


```
## docker diff
Usage: docker diff CONTAINER
Inspect changes to files or directories on a container's filesystem


## docker commit

Usage:  docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
Caution: docker commit会发生额外的操作，不利于制作image，应该使用`Dockerfile`制作image
Create a new image from a container's changes


```
[root@osboxes ~]# docker run --name webserver -d -p 80:80 nginx
39695edfe799a2e34434fcd9e5478160b6407464951d7a839c53bdf6e5f89174
[root@osboxes ~]# docker exec -it webserver bash
root@39695edfe799:/# echo '<h1>Hello,Docker!</h1>' > /usr/share/nginx/html/index.html

[root@osboxes ~]# docker diff webserver
C /usr
C /usr/share
C /usr/share/nginx
C /usr/share/nginx/html
C /usr/share/nginx/html/index.html
C /run
A /run/nginx.pid
C /var
C /var/cache
C /var/cache/nginx
A /var/cache/nginx/client_temp
A /var/cache/nginx/fastcgi_temp
A /var/cache/nginx/proxy_temp
A /var/cache/nginx/scgi_temp
A /var/cache/nginx/uwsgi_temp

[root@osboxes ~]# docker commit --author "huax01 huaxiongcool@gmail.com" --message "custom inex.htm
l" webserver nginx:v2
sha256:cfbf1418c1bdc3f3c6c7f10423a3f203a8a52315c2311fd4a51b366e24ef21c9


[root@osboxes ~]# docker image ls nginx
REPOSITORY          TAG                 IMAGE ID            CREATED                  SIZE
nginx               latest              3c5a05123222        Less than a second ago   109MB
nginx               v2                  cfbf1418c1bd        42 seconds ago           109MB

[root@osboxes ~]# docker history nginx:v2
IMAGE               CREATED                  CREATED BY                                      SIZE                COMMENT
cfbf1418c1bd        About a minute ago       nginx -g daemon off;                            165B                custom inex.html


[root@osboxes ~]# docker run --name webserver2 -d -p 81:80 nginx:v2
da7f6f297a7558de4ea55fcaf03096ee0b7a464ab646d8eec322aa5fdc12bd20

[root@osboxes ~]# curl 192.168.145.132:81
<h1>Hello,Docker!</h1>

```

## docker history
Show the history of an image

- docker history -H ubuntu


## docker build

Usage:  docker build [OPTIONS] PATH | URL | -

Build an image from a Dockerfile

### 指令

- FROM
- RUN
- COPY: 从context复制文件到引擎
     COPY <源路径>...<目标路径>
     COPY ["<源路径1>",..."<目标路径>"]
- ADD： 非最佳实践，仅用于自动解压场合
- CMD： 用于指定默认的容器主进程的启动命令
    docker中运行的是进程，其中的进程不需要使用进程管理器去管理，而直接使用命令最好
    CMD <命令>
    CMD ["可执行文件", "参数1", "参数2", ...]

    ```
    CMD ["nginx", "-g", "daemon off;"]
    ```
- ENTRYPOINT: CMD整体作为命令，docker客户端命令行参数作为该命令的参数
    ch04.project03
- ENV: 设置环境变量，构建和容器运行时都可以直接使用
    容器运行时是在默认的bash中可以使用，传递的运行参数是不会读取这些环境变量的。
    ch04.project04
- ARG: 设置环境变量，仅在构建时生效。build的时候用户可以传递参数来覆盖环境变量的默认值
    --build-arg
- VOLUME: 防止运行时用户忘记将动态文件所保存目录挂载为卷，在Dockerfile中，可以事先指定某些目录挂载为匿名卷，这样在运行时如果用户不指定挂载，其应用也可以正常运行，不会向容器层写入大量数据。
    命令行可以覆盖Dockerfile中的VOLUME指令
    -v list
    --volume list
    ```docker run -d -v mydata:/data DOCKER_IMAGE```
        表示使用`mydata`这个命名卷挂载到`/data/`路径，替代Dockerfile中的匿名卷挂载配置
- EXPOSE <端口1> [<端口2>,,,]: 声明容器运行时提供的服务端口，不过只是声明，不会再容器运行时真正起作用。
    -- docker run -P DOCKER_IMAGE: 把Dockerfile中的EXPORT声明的端口作为容器的服务端口，而宿主机端口随机
    -- docker run -p <宿主端口>:<容器端口> DOCKER_IMAGE: 
- WORKDIR: 指定各层容器的工作空间，可以多次声明覆盖
    ``` 正确的写法
        WORKDIR /app
        RUN echo "hello" > /app/world.txt
    ```
- USER <用户名>: 改变之后的容器指令CMD、RUN、ENTRYPOINT等的执行用户身份,在执行USER指令的时候，必须事先创建用户
- HEALTHCHECK: 健康检查... ch04.project06
- ONBUILD <其他指令>>: 提供一个基础镜像，在构建当前镜像时并不会执行，只有作为下一级镜像构建的时候才会执行。 ch04.project07

### 镜像构建上下文(Image build context)

Docker build的原理： Docker在运行时分为`Docker引擎`（服务端守护进程）和客户端进程。Docker引擎提供了一组RESTFUL API，被称为`Docker Remote API`，而`docker`命令是客户端工具，它通过这组`Docker Remote API`和`Docker引擎`交互通信，从而完成各种功能。而`docker build`实际上是在`Docker引擎`上构建的。
而上下文就是引擎拿去本地文件的环境。

### example

1. 最简单的Linux定制(ch04.project01)
2. 



## docker run

Usage:  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

Run a command in a new container


```
[root@archlinux project02]# docker rm 6248
6248
[root@archlinux project02]# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                  PORTS                NAMES
9b2016c60fc6        nginx:v3            "nginx -g 'daemon of…"   32 hours ago        Up 32 hours             0.0.0.0:80->80/tcp   haha
9ef51b99f2b7        nginx:v3            "-d -p 80:80"            32 hours ago        Created                 80/tcp               fervent_hypatia
a84a7ee507eb        2cb0d9787c4d        "/hello"                 6 days ago          Exited (0) 6 days ago                        determined_keldysh
afc6452861a1        2cb0d9787c4d        "/hello"                 6 days ago          Exited (0) 6 days ago                        distracted_nobel
[root@archlinux project02]# docker run --name hehe -d -p 81:80 nginx:v4
d3a7b351736109be3659dbcb78a620b5faa82cab1fafbcee543f027f2129e534
[root@archlinux project02]#
[root@archlinux project02]# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                  PORTS                NAMES
d3a7b3517361        nginx:v4            "nginx -g 'daemon of…"   6 seconds ago       Up 3 seconds            0.0.0.0:81->80/tcp   hehe
9b2016c60fc6        nginx:v3            "nginx -g 'daemon of…"   32 hours ago        Up 32 hours             0.0.0.0:80->80/tcp   haha
9ef51b99f2b7        nginx:v3            "-d -p 80:80"            32 hours ago        Created                 80/tcp               fervent_hypatia
a84a7ee507eb        2cb0d9787c4d        "/hello"                 6 days ago          Exited (0) 6 days ago                        determined_keldysh
afc6452861a1        2cb0d9787c4d        "/hello"                 6 days ago          Exited (0) 6 days ago                        distracted_nobel
[root@archlinux project02]# curl localhost:81
<h1>Hello,Docker!</h1>

```




## docker ps

Usage:  docker ps [OPTIONS]

List containers

Options:
  -a, --all             Show all containers (default shows just running)
  -f, --filter filter   Filter output based on conditions provided
      --format string   Pretty-print containers using a Go template
  -n, --last int        Show n last created containers (includes all states) (default -1)
  -l, --latest          Show the latest created container (includes all states)
      --no-trunc        Don't truncate output
  -q, --quiet           Only display numeric IDs
  -s, --size            Display total file sizes


## docker kill


Usage:  docker kill [OPTIONS] CONTAINER [CONTAINER...]

Kill one or more running containers

Options:
  -s, --signal string   Signal to send to the container (default "KILL")


## docker rm


Usage:  docker rm [OPTIONS] CONTAINER [CONTAINER...]

Remove one or more containers

Options:
  -f, --force     Force the removal of a running container (uses SIGKILL)
  -l, --link      Remove the specified link
  -v, --volumes   Remove the volumes associated with the container



# docker login

```
[root@archlinux project03]# docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: huaxiongcooldocker
Password:
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded

```