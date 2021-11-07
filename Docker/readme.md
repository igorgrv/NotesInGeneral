# 	Docker

Para iniciar, precisaremos instalar o Docker

* No Mac: [Install Docker](https://www.docker.com/products/docker-desktop);

* No Windows: Docker Hub;

## Testando docker

Para testar, podemos utilizar o comando:

```dockerfile
docker run hello-world
```

* Como de início não temos a imagem local, ele irá buscar do **Docker Hub | Docker Store** (repositorio do próprio Docker);

## Antes → VM → Container

Para entender a motivação do uso de _Containers_ precisamos entender como surgiu a necessidade.

### Antes

![antes](https://s3.amazonaws.com/caelum-online-public/646-docker/01/imagens/sistema-operacional.png)

Antigamente, para rodar as aplicações (apache, mongo e etc), cada uma ficaria em um servidor físico (cpu, ram, hd), onde cada aplicação iria precisar de um S.O. e estar conectadas na mesm Rede (HUB, Cabos e infra)...

#### Qual o problema?

* Constante atualização do S.O.
* Manutenção dos servidores físicos;
* Gasto de energia;
* Muitas vezes baixo uso de CPU/RAM;

### Virtual Machines (VM)

Para resolver um dos grandes problemas de **baixo uso de cpu** foi criado a Virtual Machine, onde dentro de um mesmo servidor poderia rodar outras aplicações, como **um computador dentro do outro**!

<img src="https://s3.amazonaws.com/caelum-online-public/646-docker/01/imagens/aplicacoes-maquinas-virtuais.png" alt="vm" style="zoom:67%;" />

#### Qual o problema?

* Aplicações consumindo toda CPU/RAM e parando outras aplicações;
* Aplicação trava e faz com que CPU/RAM deem um reboot;
* Se cada VM precisa de 1GB de RAM, ainda precisaremos de um poder de hardware alto = custo;
* Uso de portas (se uma aplicação usa a 8080 a outra não poderá usar, teremos que mexer na app.);

### Container

A idéia do container é aproveitar o **mesmo S.O.** criando containers que compartilharam este S.O. contendo em cada container uma aplicação:

<img src="https://s3.amazonaws.com/caelum-online-public/646-docker/01/imagens/container.png" alt="container" style="zoom:50%;" />

#### Vantagens

* Por compartilhar o S.O. o container é **muito mais leve**, não contendo custo de manter múltiplos S.O.;
* Rápido de subir e encerrar;
* Permite selecionar a mesma porta para aplicação;
* Cada aplicação pode rodar sua linguagem em específico, na versão em específico (java 7, 8 e etc);
* Isolar cada aplicação (se uma falhar não irá afetar a outra);
* Limitar uso de CPU para cada container;

## Sobre o Docker

A tecnologia Docker, é mantida pela **empresa Docker, Inc.** 

### Docker, Inc.

No início a Docker, Inc. era antes chamada **DotCloud**, empresa de **PaaS** (platform as a Service - assim como o Heroku, Azure, onde colocamos a aplicação e a empresa quem sobe o serviço e etc), que rodava seus serviços na AWS e para economizar, criou o conceito de conteiner **para subir várias aplicação em uma mesma máquina**!

### O que é o Docker

O Docker é um conjunto de tecnologias **OpenSource** cujo o intuito é facilitar o deploy e execução das aplicações. Onde a **principal tec. é a Docker Engine** → plataforma que segura os _containers_, fazendo intermedio entre o S.O., porém existem outras, como:

* Docker Compose → orquestra múltiplos containers;
* Docker Swarm → coloca múltiplos docker engineer para trabalharem em um mesmo cluster;
* Docker Hub → repositório;
* Docker Machine → gerencia o Docker em um host virtual;

## **Comandos Básicos

|                      Comando                      |                          O que faz                           |
| :-----------------------------------------------: | :----------------------------------------------------------: |
|                    `docker ps`                    |               **Exibe** containers em execução               |
|                  `docker ps -a`                   |       **Exibe todos** containers (parados ou em exec.)       |
|                  `docker ps -q`                   |              **Exibe todos** IDs dos containers              |
|                `docker run image`                 | **Roda** uma imagem (podendo ser ubunto, hello-word, node);  |
|              `docker run -it image`               |          **Roda** a imagem e **entra** no container          |
|                      `exit`                       |               **Sai** do terminal do container               |
|               `docker run -d image`               |    **Roda** a imagem e **não permite** entrar no terminal    |
|          `docker run -P 12345:80 image`           | **Roda** a imagem e **habilita porta** 12345 externa a 80 do container |
|             `docker port idContainer`             |        **Exibe** a porta que esta rodando o container        |
|        `docker run --name nomeCont image`         |          **Roda** a imagem e **nomeia** o container          |
|           `docker run -e XXX="" imagem`           |     **Roda** a imagem e habilita **variáve de ambiente**     |
|           `docker run -v "var/www" img`           |            **Roda** a imagem e cria um **volume**            |
|    `docker run -v "user\desktop:var/www" img`     | **Roda** a imagem e cria um **volume** espelhando no desktop |
|         `docker run -w "/var/www" imagem`         |          **Roda** a imagem e inicia dentro da pasta          |
|          `docker run —network nomeRede`           |              **Roda** a imagem em **uma rede**               |
|            `docker start idContainer`             |          **Starta** um container que estava parado           |
|         `docker start -a -i idContainer`          |    **Starta** um container e abre o terminal do container    |
|         `docker start $(docker ps -a -q)`         |             **Starta** todos containers parados              |
|             `docker stop idContainer`             |                    **Para** um container                     |
|           `docker stop $(docker ps -q)`           |             **Para** todos os container em exec.             |
|          `docker stop -t 0 idContainer`           |                **Para** de forma mais rápida                 |
|              `docker rm idContainer`              |                    **Remove** o container                    |
|             `docker container prune`              |           **Remove** todos containers **inativos**           |
|                  `docker images`                  |               **Exibe** todas imagens baixadas               |
|              `docker rmi suaImagem`               |                     **Remove** a imagem                      |
|                 `docker inspect`                  |                  **Inspeciona** o container                  |
|                  `docker build`                   |                      **Cria** a imagem                       |
|           `docker build -f NomeArquivo`           | **Cria** a imagem baseado no arquivo (precisa estar com o arquivo no diretório) |
|       `docker build -t usuario/nomeImagem`        |                **Cria** a imagem com um nome                 |
|                  `docker login`                   |                   **Login** no Docker Hub                    |
|             `docker push nomeImagem`              |                     **Publica** a imagem                     |
|             `docker pull nomeImagem`              |                     **Consome** a imagem                     |
| `docker network create —driver bridge nomeDaRede` |                    **Cria** uma **rede**                     |
|             `docker logs idContainer`             |                **Exibe** um log da aplicação                 |

## Comandos Linux

|          Comando          |                  O que faz                   |
| :-----------------------: | :------------------------------------------: |
|           `ls`            | **Exibi** os arquivos da pasta na horizontal |
|         `ls -la`          |  **Exibi** os arquivos da pasta na vertical  |
|       `cat arquivo`       |       **Exibe** o conteúdo do arquivo        |
|      `touch arquivo`      |              **Cria** o arquivo              |
| `echo "oi" > arquivo.txt` |     **Preenche** o arquivo com um texto      |
|     `apt-get update`      |           **Atualiza** os pacotes            |
|     `mkdir nomePasta`     |              **Cria** uma pasta              |
|           `pwd`           |          **Exibe** o caminho atual           |
|                           |                                              |

## Layered File System

![layeres](https://s3.amazonaws.com/caelum-online-public/646-docker/02/imagens/camadas.png)

O conceito de camadas é utilizado no docker para camadas sejam **reaproveitadas** em outras imagens e outra vantagem é de que essas camadas são **somente para leitura**. Onde escrevemos é em uma outra camada para **read/write**, criada quando colocamos a imagem em um container!

<img src="https://s3.amazonaws.com/caelum-online-public/646-docker/02/imagens/imagem-varios-containers.png" alt="imagem" style="zoom:50%;" />

## Volumes

Os volumes nos permitem criar um local em específico que serão salvos os dados do container, ou seja, invés de ser salvo **no container, salvamos em um diretório fora do container**, desta forma evitamos de perder dados.

* Quando criamos um volume de dados, estamos salvando na verdade dentro do **Docker Host** 

Para trabalhar com volumes, utiliamos do `docker run -v "/var/www"` onde o `-v` representa a criação de um volume, na pasta `var/www`, ou seja, tudo que salvarmos dentro de `var/www` estará sendo salvo no **Docker Host** da máquina!

* `docker run -v "C:\Users\usuario\desktop:/var/www" ubuntu` -> irá informar que tudo que for salvo na pasta `var/www` será salvo na verdade no `desktop`!

### Rodando uma aplicação no container

Com o conceito de volume em mente, podemos fazer com que **transportemos uma aplicação para o container!**, para isto iremos utilizar do:

* `-p` → para referenciar a porta;
* `-d` → para não ficar travado o terminal;
* `-v` → para mapear o volume
* `-w` → para informar o docker onde iniciar

* `pwd` → para referenciar o caminho

Para rodar a aplicação no container, iremos ir até a aplicação pelo terminal, utilizando `cd` e então utilizaremos do `pwd` !

```bash
igorromero@MBP-de-Igor Docker % cd volume-exemplo 

igorromero@MBP-de-Igor volume-exemplo % pwd
/Users/igorromero/NotesInGeneral/Docker/volume-exemplo
```

Agora basta utilizarmos os comandos juntos:

```dockerfile
docker run -v "$(pwd):/var/www" -w "/var/www" -p 8080:3000 -d node npm run start
```

## Imagem - Dockerfile

O Dockerfile, vem para nos auxiliar a **criar nossas próprias imagens**, para que depois seja possível fazer um `publish` da imagem no **Docker Hub**.<br>

Para escrever um arquivo `.dockerfile`, existem comandos básicos que espelham as ações que fazemos com comandos `docker`, porém é necessário **que o arquivo esteja dentro do projeto**!

### **Comandos Básicos

|            Comando            |                          O que faz                           |
| :---------------------------: | :----------------------------------------------------------: |
|     `FROM imagem:version`     |      **Referencia** uma imagem base que será utilizada       |
|     `MAINTAINER criador`      |                    **Criador** da imagem                     |
| `COPY pathOrigem pathDestino` | **Copia** do caminho de origem → destino (`copy . /var/www` → `.` →indica todos arquivos da origem) |
|        `WORKDIR path`         |     **Path** de inicio da aplicação (`WORKDIR /var/www`)     |
|         `RUN comando`         |           **Roda** um comando (`RUN npm install`)            |
|     `ENTRYPOINT comando`      |   **Roda** o comando, depois que o container for estartado   |
|         `EXPOSE port`         | **Expõem** a porta (geralmente a porta q aplicação precisa)  |
|       `ENV variavel=x`        | **Cria** variável de ambiente (`ENV PORT=3000`) → para utilizar rodamos `EXPOSE $PORT` |

### Criando Dockerfile

Seguindo os comandos básicos, conseguimos criar uma imagem do docker.<br>

Dentro da aplicação [volume-exemplo](https://s3.amazonaws.com/caelum-online-public/646-docker/03/projetos/volume-exemplo.zip), iremos criar um `Dockerfile`, para que seja possível executar o projeto no container, com a **imagem do Node**;

1. Iremos chamar a imagem do Node;
2. Depois declarar uma variável de ambiente `ENV PORT` referenciando a porta 3000;
3. Copiar todos arquivos do projeto (`.`), para a pasta `var/www`;
4. Informar para o container iniciar em `/var/www` (por conta do package.json);

```dockerfile
FROM node
ENV PORT=3000
COPY . /var/www
WORKDIR /var/www
RUN npm install
ENTRYPOINT npm start
EXPOSE $PORT
```

### Criando a imagem

Com o `Dockerfile` criado, agora é possível rodar o `docker build`.<br>

1. Acessaremos via terminal, o local onde esta o `Dockerfile`;

2. Com o `-f` iremos informar o nome do arquivo;

3. Com o `-t` iremos informar o `usuário/nomeImagem`

4. Por fim, iremos por um `.` para informar que o arquivo `Dockerfile`esta ali

   ```dockerfile
   docker build -f Dockerfile -t igor/node .
   ```

5. Agora basta rodar a imagem

   ```dockerfile
   docker run -d -p 8080:3000 igor/node
   ```

   

### Publicando imagem Docker Hub

Para publicar uma imagem no [Docker Hub](https://hub.docker.com/) é necessário criar uma conta primeiro.

1. Com a conta criada, executaremos `docker login` e colocaremos o `user id` e a senha;
2. Agora faremos o `docker push nomeDaImagem` → `docker push igorromeronode` 
3. Se abrirmos o **Docker Hub** iremos ver uma imagem publicada, que podemos consumi-la com o `docker pull nomeDaImagem`



## Networking - Comunicando containers

E se quisermos fazer com que os containers se comuniquem? Por padrão, o Docker possui uma **rede default** que permite que os containers se conversem!<br>

Se rodarmos um `docker inspect`, poderemos ver em `NetworkingSettings` que o container esta rodando na **rede padrão, chamada BRIDGE**. Onde cada container **terá um IP próprio**:

<img src="https://s3.amazonaws.com/caelum-online-public/646-docker/05/imagens/rede-docker.png" alt="rede" style="zoom: 50%;" />

### Testando comunicação via IP

1. Vamos criar 2 containers (1 e 2) para isto, abra 2 terminais:

   ````
   docker run -u root -it —name container-1 ubuntu
   ````

2. Em cada container, iremos rodar um `hostname -i`, para pegarmos o IP;

3. Com o comando `apt-get update && apt-get install iputils-ping` iremos habilitar o `ping`;

4. Ping colocando `ping ipContainer`;

Ou testando a porta

1. Com o comando `apt-get update && apt-get install telnet` iremos habilitar o `ping`;
2. ping com telnet `telnet <ip_address> <port_number>`

### Comunicação via Nome

Comunicar via IP não é algo muito bom, pq  teriamos que saber qual o IP toda as vezes para comunicar um APP com um BD por exemplo?<br>

Para comunicação ocorrer entre aplicações, é necessário **criar uma network**, pois em uma rede interna, **é possível realizar a comunicação através do nome** da aplicação!

1. Rode o comando para criação da rede, passando o **tipo de driver** e o nome da rede;

   ```
   docker network create --driver bridge nomeDaRede
   ```

2. Para consultar se foi criado:

   ```
   docker network ls
   ```

3. Para rodar o container na network criada

   ```
   docker run -it --name container-1 --network nomeDaRede
   ```

4. Desta forma é possível realizar o `ping` utilizando o nome da aplicação!

### Comunicando APP + BD

Para comunicar um aplicativo com o banco de dados, utilizaremos 2 imagens:

```docker
docker pull mongo
docker pull igorgrv/books
```

Devemos nos atentar a algumas configurações padrão da aplicação, como:

* Porta definida → neste caso `3000` → teremos que rodar nesta porta
* Nome do host do BD → neste caso `meu-mongo` → o container terá que ter este nome

Portanto, tendo essas infos. Podemos rodar:

```
docker run --network minhaNetwork -p 8080:3000 -d igorgrv/books

docker run --network minhaNetwork --name meu-mongo -d mongo
```



## Docker Compose

Imagine que queremos subir:

* 3 containers idénticos;
* Container com BD;
* Container com um Load Balancer;

<img src="https://s3.amazonaws.com/caelum-online-public/646-docker/06/imagens/funcionamento-aplicacoes.png" alt="compose" style="zoom: 50%;" />

Teriamos que rodar pelo menos 5 containers! Imagine quanta configuração poderá ficar faltando…<br>

O **Docker compose** se trata de uma configuração, que pode ser feita através de **arquivos `.yml`** que conterá toda configuração dos containers!

### Entendendo APP

Como utilizaremos 3 tipos de containers, sendo 2 deles (APP & Load Balancer), teremos que ter **2 tipos de `Dockerfile`**.<br>

```dockerfile
# NGINX.dockerfile
FROM nginx:latest
COPY /public /var/www/public			# /public contem os arq estaticos
COPY /docker/config/nginx.conf /etc/nginx/nginx.conf			# config do nginx
RUN chmod 755 -R /var/www/public
EXPOSE 80 443
ENTRYPOINT ["nginx"]
# Parametros extras para o entrypoint
CMD ["-g", "daemon off;"]


# APP.dockerfile
FROM node:latest
ENV NODE_ENV=development
COPY . /var/www
WORKDIR /var/www
RUN npm install 
ENTRYPOINT ["npm", "start"]
EXPOSE 3000
```

### **Comandos Básicos

O `docker-compose.yml` lembra um `json`, onde é composto de arguns parâmetros, como:

|      Comando      |                          O que faz                           |
| :---------------: | :----------------------------------------------------------: |
|  `version: '3'`   |                   Informa o tipo de versão                   |
|   `services: `    |                  **Informa** os containers                   |
|     `build:`      | **Informa** onde esta o dockerfile e a partir de qual contexto |
|     `image: `     |             **Declara** a partir de qual imagem              |
| `container_name:` |               **Informa** o nome do container                |
|     `ports: `     |            **Declara** a porta que será utilizada            |
|    `networks:`    |        **Declara** o nome da rede e o tipo de driver         |
|   `depends_on:`   |       **Informa** que é necessário container X iniciar       |

No `yaml` toda vez que um **parâmetro possui traço (`-`)** indica que pode haver +1 valor!<br>

Exemplo de `docker-compose.yml`:

```yaml
version: '3'
services:
    nginx:
        build:
            dockerfile: ./docker/nginx.dockerfile
            context: .
        image: douglasq/nginx
        container_name: nginx
        ports:
            - "80:80"
        networks: 
            - production-network
        depends_on: 
            - "node1"
            - "node2"
            - "node3"

    mongodb:
        image: mongo
        container_name: meu-mongo
        networks: 
            - production-network

    node1:
        build:
            dockerfile: ./docker/alura-books.dockerfile
            context: .
        image: igorgrv/books
        container_name: alura-books-1
        ports:
            - "3000"
        networks: 
            - production-network
        depends_on:
            - "mongodb"

    node2:
        build:
            dockerfile: ./docker/alura-books.dockerfile
            context: .
        image: igorgrv/books
        container_name: alura-books-2
        ports:
            - "3000"
        networks: 
            - production-network
        depends_on:
            - "mongodb"

    node3:
        build:
            dockerfile: ./docker/alura-books.dockerfile
            context: .
        image: igorgrv/books
        container_name: alura-books-3
        ports:
            - "3000"
        networks: 
            - production-network
        depends_on:
            - "mongodb"

networks: 
    production-network:
        driver: bridge
```

### Subindo serviços

1. Para realizar o **build** do docker-compose, **dentro da aplicação**, executamos:

   ```
   docker-compose build
   ```

   1. Este comando irá baixar todas as imagens

2. Para subir os serviços:

   ```
   docker-compose up
   ```

3. Para dar restart:

   ```
   docker-compose restart
   ```

4. Para parar todos os serviços:

   ```
   docker-compose down
   ```

   

## Exemplos

### Java on Liberty + Maven

```dockerfile
FROM maven:3-jdk-8 as BUILD
COPY src /usr/src/app/src
COPY WebContent /usr/src/app/WebContent
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml compile package install

FROM curlimages/curl:7.70.0 as DOWNLOAD
ARG ARTIFACTORY_API_KEY=$ARTIFACTORY_API_KEY
RUN curl -H 'X-JFrog-Art-Api:'$ARTIFACTORY_API_KEY -o /tmp/jvm.options "https://na.artifactory.swg-devops.com/artifactory/txo-cspbc-team-star-generic-local/jvm.options" \
	&& curl -H 'X-JFrog-Art-Api:'$ARTIFACTORY_API_KEY -o /tmp/keystore.jks "https://na.artifactory.swg-devops.com/artifactory/txo-cspbc-team-star-generic-local/keystore.jks"
	
FROM websphere-liberty:latest
COPY --chown=1001:0 --from=BUILD /usr/src/app/target/target.war /config/apps/
COPY --chown=1001:0 --from=DOWNLOAD /tmp/jvm.options /config/
COPY --chown=1001:0 --from=DOWNLOAD /tmp/keystore.jks /config/
COPY --chown=1001:0 /artifacts/server.xml /config/
```



### Java Standalone

```dockerfile
# Using maven to create executable jar
FROM maven:3-jdk-8 as BUILD
COPY src /usr/app/src
COPY WebContent /usr/app/WebContent
COPY pom-jobs.xml /usr/app/pom.xml
RUN mvn -f /usr/app/pom.xml -q clean
RUN mvn -f /usr/app/pom.xml -q package

FROM openjdk:16-jdk-alpine
COPY --from=BUILD /usr/app/target/<app-name>-jar-with-dependencies.jar /usr/app/
```

