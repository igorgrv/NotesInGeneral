# Docker

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

## Comandos Básicos

|                  Comando                   |                          O que faz                           |
| :----------------------------------------: | :----------------------------------------------------------: |
|                `docker ps`                 |               **Exibe** containers em execução               |
|               `docker ps -a`               |       **Exibe todos** containers (parados ou em exec.)       |
|               `docker ps -q`               |              **Exibe todos** IDs dos containers              |
|             `docker run image`             | **Roda** uma imagem (podendo ser ubunto, hello-word, node);  |
|           `docker run -it image`           |          **Roda** a imagem e **entra** no container          |
|                   `exit`                   |               **Sai** do terminal do container               |
|           `docker run -d image`            |    **Roda** a imagem e **não permite** entrar no terminal    |
|       `docker run -P 12345:80 image`       | **Roda** a imagem e **habilita porta** 12345 externa a 80 do container |
|         `docker port idContainer`          |        **Exibe** a porta que esta rodando o container        |
|     `docker run --name nomeCont image`     |          **Roda** a imagem e **nomeia** o container          |
|      `docker run -e AUTHOR="" imagem`      |     **Roda** a imagem e habilita **variáve de ambiente**     |
|       `docker run -v "var/www" img`        |            **Roda** a imagem e cria um **volume**            |
| `docker run -v "user\desktop:var/www" img` | **Roda** a imagem e cria um **volume** espelhando no desktop |
|         `docker start idContainer`         |          **Starta** um container que estava parado           |
|      `docker start -a -i idContainer`      |    **Starta** um container e abre o terminal do container    |
|         `docker stop idContainer`          |                    **Para** um container                     |
|       `docker stop $(docker ps -q)`        |             **Para** todos os container em exec.             |
|       `docker stop -t 0 idContainer`       |                **Para** de forma mais rápida                 |
|          `docker rm idContainer`           |                    **Remove** o container                    |
|          `docker container prune`          |           **Remove** todos containers **inativos**           |
|              `docker images`               |               **Exibe** todas imagens baixadas               |
|           `docker rmi suaImagem`           |                     **Remove** a imagem                      |
|              `docker inspect`              |                  **Inspeciona** o container                  |

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
|                           |                                              |
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