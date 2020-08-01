# AWS - Cloud Certified Cloud Practitioner (CLF-C01)

<img src="https://newrelic-wpengine.netdna-ssl.com/wp-content/uploads/AWS-Certs-1.png" width=500>

Como base das certificações, a Certificação **_Cloud Practitioner_** é o início da jornada das certificações AWS, de forma que irá ser abordado diversos conceitos de nuvem e de serviços da AWS mais utilizados.

## Sobre a Nuvem

### Comunicação de um Website

Antes de entender a nuvem, precisamos entender como funciona um Website! Então, **nós como usuários**  queremos ao acessar um site que por sua vez irá acessar **um servidor** e essa comunicação entre usuário & servidor, ocorre através da internet.<br>

Para haver uma boa comunicação, o usuário tem que ter um **endereço de IP** e o servidor também! Um bom exemplo é quando queremos **enviar uma carta**, precisamos ter um endereço de **remetente e destinatário**;<br>

### Do que é composto um Servidor?

Um servidor é composto de:

* CPU (processador);
* Memória RAM;
* HD;
  * Banco de Dados;
  * Network: Routers, switchs, DNS Server;

### Servidor Tradicional

Os servidores tradicionais, ou seja, servidores quando a nuvem não existia, possuem alguns problemas, porque imagine que a empresa começou com um servidor pequeno e então foi ganhando tamanho, ou seja, o servidor tem que ir aumentando e isto normalmente possui algumas variáveis como espaço e custo.<br><br>Agora em um cenário onde a empresa é grande, geralmente se é necessário um **data center**, ou seja, um espaço que ficarão os servidores físicos, que serão acompanhados de alguns problemas, tais como:

* Aluguel do espaço para os servidores;
* Manutenção 24/7 (time);
* Energia e refrigeração;
* Escala limitada (se formos aumentar nossos servidores, tomará tempo para que isso seja feito);
* Troca de equipamentos (isto toma tempo);

### A Nuvem

A nuvem veio para suprir todos os problemas de um servidor tradicional, de forma que todos os problemas relatados acima não existem na nuvem! E algumas das vantagens são:

* Pagamos apenas pelo o que usamos;
* Podemos selecionar exatamente o tamanho e tipo de servidor que queremos;
* Acesso quase que imediato aos recursos;
* Facilmente acessível;

#### Tipos de Deploys na Nuvem

Dentro da nuvem também teremos variações, como:

* Nuvem privada (RackSpace);
* Nuvem pública (Azure, GoogleCloud e AWS);
* Nuvem Híbrida (junção da pública e privada);

#### Tipos de Cloud Computing

Os tipos de Cloud Computing variam conforme o que queremos gerenciar ou não, por exemplo, se queremos:

* Gerenciar tudo -> `On-Premises`, ou seja, neste caso, nós que devemos tomar conta de tudo;
* Não gerenciar -> `SaaS`, ou seja, a AWS neste caso tomará conta de tudo;

<img src="https://blogs.bmc.com/wp-content/uploads/2017/09/saas-vs-paas-vs-iaas-1024x953.png" width=500>

Exemplos de serviços:

* IaaS -> EC2;
* SaaS -> Elastic BeansTalk;

#### Tipos de Cobranças

As cobranças são feitas baseado em 3 princípios:

* Compute: será pago pelo tempo em que a máquina está sendo utilizada;
* Storage: pago pelo armazenamento utilizado;
* Data Transfer Out: dados transferidos para fora da nuvem são pagos, para dentro NÃO;

## Sobre AWS

### Conta AWS

Fácil de criar, terá que cadastrar um cartão de crédito -> [SignUp](https://portal.aws.amazon.com/billing/signup?type=enterprise#/start);

### História da AWS

![amazonStory](C:\Users\867695\Pictures\amazonStory.PNG)

A nuvem da Amazon foi internamente lançada em 2002 e então eles perceberam que poderia ser ofertada ao público externo e então começam a lançar os produtos, até que em 2007 expande os servidores para a Europa, onde grandes empresas como, **Netflix, Nasa, Dropbox e Airbnb** começaram a utilizar os serviços.

* A Amazon é lider de mercado, com um marketshare de 47% de mercado, enquanto a Microsoft que é a segunda possui um total de 22% de mercado;

### AWS Global

A Amazon possui uma grande gama de:

* Regiões;
  * `AWS Regions` são um `cluster` de `data centers`, nomeados como `us-east-1`;
* Zonas disponíveis;
  * Cada **região** possui 3 ou mais `Availability Zone`, nomeados como `us-east-1A`, `us-east-1b` e etc, que previne de que caso uma zona sofra alguma catástrofe a outra Zona que esta em outro local fique ativa;
* Zonas Locais;
* Pontos de presença;

É importante conhecer as Zonas disponíveis por região, pois os serviços da AWS variam por zona e alguns serviços são globais.

* Serviços Globais:

  * IAM (Identity and Access Management);
  * Route 53 (DNS Service);
  * CloudFront (Content Delivery Network);
  * WAF (Web Application Firewall);

* Por região:

  * EC2;

  * Elastic Beanstalk;

  * Lambda

# Questions - Session 3




## IAM - Identity and Access Management

IAM é utilizado para gerenciar usuários/grupos. Por padrão, quando uma conta é criada, é criado um **_Default Group_**, com apenas um usuário.

* Caso tenhamos um grupo de desenvolvedores, podemos associar os devs em um grupo;
* Caso tenhamos um grupo de operação, podemos associa-los a um grupo de operação;
  * **NÃO É POSSÍVEL CRIAR GRUPOS DENTRO DE GRUPOS.**

![group](https://docs.aws.amazon.com/IAM/latest/UserGuide/images/iam-intro-users-and-groups.diagram.png)

### Como é criado um Usuário?

Para criarmos um usuário, precisaremos:

1. Iniciar o serviço IAM pelo [console da Amazon ](https://console.aws.amazon.com/console/home);
2. Ir em `Users` e clicar em `Add Users`;
3. O nome ao usuário, será utilizado como parte do `login`;
4. O tipo de senha, poderá ser pelo Console (igual fazemos o login) bem como uma senha pré definida;
5. A outra etapa, será associar o usuário a um grupo (como não temos, iremos criar um de Admin, este grupo irá permitir o usuário a acessar todos os serviços da AWS);
6. Após associar uma TAG ao usuário, podemos compartilhar o link de acesso para que o usuário sempre utilize aquele ao logar!
   1. `https://889031232403.signin.aws.amazon.com/console` para que o usuário não tenha que digitar um monte de digitos, podemos customizar a tag;
   2. Para customizar, basta irmos em `dashboard` e clicar em `customize` com uma TAG global (não poderá ser repitida), como `https://igorgrv.signin.aws.amazon.com/console`

### Gerenciando permissões

É possível gerenciar as permissões dos usuários através:

* Dos grupos, ou seja, se o usuário não tem mais a permissão de `admin` podemos remove-lo do grupo;
  * Clicando no usuário;
  * Indo em `Groups` e clicando no `X` que o usuário pertence;
* Através das permissões diretamente;
  * Clicando no usuário;
  * Em `Permissions` -> `Add permission` -> `Attach existing policies directly`

#### Com .json

A AWS nos permite configurar um arquivo `.json` que conterá o que os usuários podem acessar também!

![jsonimage](https://objectivefs.com/howto/a/s3policy_step6.png)

* Devemos seguir o princípio de **_least privilege principle_**, que diz para não se dar mais permissões do que um usuário precisa!

### Gerenciando Senha

É importante que seja feito as **Configurações da Política de senhas IAM**:

1. No Dashboard do IAM, iremos ter um `warning` avisando que será necessário configurar a `IAM password policy`, então basta clicarmos;
2. Clicar em `Set Password Policy` e então definir quais tipos de senha os usuários irão precisar criar, como **numérico, c/ carácter esp., quantidade de dig. mínimo** e etc.
   1. Também é possível colocar um período para a senha expirar;

### Reporte das atividades

A IAM nos permite ter acesso a `.csv` das atividades de todos os usuário, que demonstra:

* Último acesso;
* Última vez que modificou a senha;

Para acessar:

* Em IAM, clicamos em `Credential Report` -> `Download Report`;

### Reporte dos serviços por usuário

Outro modo de consultarmos os serviços que os usuários tem utilizado, é:

1. Clicando no usuário;
2. Em `Access Advisor`;
3. Irá constar a lista de todos os serviços que o usuário tem acesso bem como a última vez que foi utilizado

## AWS CLI

O AWS CLI é um outro modo de acessar aos serviços da Amazon **sem ser pelo Console**. Para utilizar o AWS CLI é necessário uma `access key` que pode ser gerada pelo `AWS Console`!

* Usuários gerencial a própria chave de acesso, tendo um:
  * Access Key ID -> `UserName`;
  * Secret Key ID -> `password`;

Para instalar basta acessar [AWS CLI Install for Windows](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-windows.html) e testar com o `aws --version`<br><br>Para criar uma `access key` devemos estar logados no usuário (não no usuário root);

1. Ir em IAM;
2. Clicar em usuários -> selecionar o usuário;
3. Ir na aba `Security Credencials` -> `Create Access Key`
4. Salvar os valores da `secret` e `access` que serão utilizados no console;
5. No console do Windows, digitaremos `aws configure` e entraremos com as credenciais e a região `sa-east-1`
6. Com o `aws cli` configurado, podemos chamar os comandos como `aws iam list-users` que nos retornará um .json com os usuários;

# Questions - Session 4

```
What is a proper definition of IAM Roles? 

	* An IAM Entity that defines a set of permissions for making AWS Services requests

Which of the following is an IAM Security Tool?

	* IAM Credential Report

Which answer is INCORRECT regarding IAM Users?

	* IAM Users access AWS with the root account

Which of the following is an IAM best practice?

	* Don’t use the root user account

What are IAM Policies?

	* JSON Documents to define users, groups or Roles’ permissions

Under the shared responsibility model, what is the customer responsible for in IAM?

	* Assign users proper IAM Policies

Which principle should you apply regarding IAM Permissions?

	* Grant Least Privileges

What should you do to increase your root account security?

	* Enable MFA
```



## EC2 - Elastic Compute Cloud

### AWS Budget Setup

Para que a gente siga a boa prática de trabalhar com o usuário e não com a conta root, temos que habilitar algumas coisas, como o `Budget Setup`.

1. Dentro da conta root, vamos em `My Account`;
2. em `IAM User and Role Access to Billing Information` vamos clicar em `edit`;
3. Ativar `IAM  access`;

Agora com a conta de usuário ativada, vamos entrar nela e ativar um **alarme de gastos**, que irá nos avisar se chegarmos em um gasto de **5 dólares**;

1. Dentro do usuário IAM, vamos clicar em `My billing dashboard`;
2. Em `Budgets` -> `create a budget` -> `Cost budget`
3. Vamos nomear um nome qualquer para lembrarmos do que se trata;
4. Avançamos para etapa de criar um alerta -> colocamos um valor -> adicionamos um percentual antes deste valor que queremos receber um comunicado -> cadastramos um e-mail;

### EC2 Basic Steps

O Serviço EC2 (Elastic Compute Cloud) é um dos serviços mais famosos da Amazon, isto porque com este serviço é possível fazer **muitas coisas** e talvez uma das principais `on-demand`, como:

* Alugar máquinas virtuais (EC2);
* Guardar dados em drivers virtuais (EBS);
* Distribuir carga das maquinas virtuais (ELB - Elastic Load Balancer);

É possível selecionar o computador que queremos utilizar também, incluindo:

* CPU (quantidade de `core`);
* RAM;
* Memória HD;
* Network card (EBS;
* Firewall rules (security group);
* Bootstrap script (configura a instância ao ser iniciada);

A instância mais conhecida é a `t2.micro` (free tier), que possui:

* 1 core;
* 1GB RAM;
* EBS-only;

### Criando um EC2

A criação de uma instância EC2, é feita através da **AWS Console**, que nos permite em poucos passos configurar e iniciar uma máquina!

1. Por ser um serviço **regional**, precisamos selecionar uma região 1º;

2. Dentro de uma conta de usuário (por boa prática) -> pesquisar por EC2;

3. Em EC2, ir em `instances` -> `launch instance`;

4. Selecionar uma **imagem** (free tier Linux);

5. Selecionar uma **máquina** (`t2.micro`) -> clicar em `next`;

6. Deixar as config. padrões e no último campo `user data`, iremos colocar o script abaixo, que irá criar a instância com um servidor.

   ```sh
   #!/bin/bash
   # Use this for your user data (script from top to bottom)
   # install httpd (Linux 2 version)
   yum update -y
   yum install -y httpd
   systemctl start httpd
   systemctl enable httpd
   echo "<h1>Hello World from $(hostname -f)</h1>" > /var/www/html/index.html
   ```

7. Selecionar o espaço de **memória** (padrão 8GB);

8. O último passo é o `security group`, que devemos configurar conforme abaixo:

   ```
   SSH -> porta 22 -> 0.0.0.0/0
   HTTP -> porta 80 -> 0.0.0.0/0, ::/0
   ```

9. Finish!

Assim que a instancia estiver inicializada, será possível verificar informações importantes sobre ela em `Description`, como:

* `Ipv4 pulic` -> é o IP de acesso a instância



### Security Group

Os grupos de segurança são **fundamentais** para **segurança** das instâncias. Eles controlam todo **trafégo** para **dentro** e para **fora**, podendo ser configurado os **IPs** de acesso.<br>

Algumas **portas** precisamos saber:

| Porta | Serviço                                                   | Descrição                                       |
| ----- | --------------------------------------------------------- | ----------------------------------------------- |
| 22    | SSH (Security Shell) / SFTP (Secure File Trans. Protocol) | Loga em uma instância Linux / Upload usando SSH |
| 21    | FTP (File Transport Protocol)                             | Upload de arquivos em uma pasta compartilhada   |
| 80    | HTTP                                                      | Acesso a sites desprotegidos                    |
| 443   | HTTPS                                                     | Acesso a sites protegidos                       |
| 3389  | RDP (Remote Desktop Protcol)                              | Loga em uma instância windows                   |

#### Editando uma Security Group

1. Dentro de EC2 -> Security Group (canto esquerdo);
2. Iremos encontrar dois Security groups já criados -> clicar no que não é o _default_;
3. Em `inbound` ou em `outbound` vai ser possível alterar as regras

### SSH - Security Shell - Windows

O SSH nos permite fazer uma comunicação segura com os servidores Linux, de modo que podemos rodar comandos igual fazemos no CMD no Linux.

* Para o Windows 10 é possível fazer a comunicação SSH, mas caso não funcione (basta digitar `ssh` no cmd), existe o programa `Putty` ou o próprio **EC2 Instance Connect**

Para utilizar o SSH precisaremos **da chave PEM** que foi utilizada para a instância, pois será nossa autenticação para entrar no servidor!

1. No PowerShell, iremos digitar `ssh -i localOndeEstaChavePEM ec2-user@ipv4DoEC2` ` 

   ```sh
   ssh -i C:\Users\867695\Documents\Documentos\igorCognizant.pem ec2-user@18.230.118.66
   ```

2. Se for a primeira conexão, devemos digitar “Yes”;

   1. Caso não seja permitido a conexão, devemos adicionar ao arquivo `pem` as permissões no windows;

### SSH - Security Shell - EC2 Instance Console

É possível realizar a mesma conexão de forma mais rápida, através do **EC2 Instance Console**! Que nada mais é do que o console da Amazon.

1. Clica na instância que deseja fazer o acesso;
2. No canto superior, clique em **connect**;
3. Selecione a opção `EC2 Instance connect` e coloque o usuário;
4. Pronto, terminal estará acessível a instância temporáriamente;

```sh
Last login: Tue Jul 28 00:57:28 2020 from 152.250.121.215

       __|  __|_  )
       _|  (     /   Amazon Linux 2 AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-2/
[ec2-user@ip-172-31-12-15 ~]$ 
```

* **PORÉM,** só funciona com a IMAGEM **Amazon Linux 2**;

### Testando SSH - Aplicando IAM Roles

Assim como é possível acessar comandos pelo console através do comando `aws`, é possível rodar os comandos dentro do EC2, **PORÉM** precisamos **tomar cuidado** com o que é permitido dentro do `EC2`!<br>

Assim que criado uma instância, precisamos atribuir **uma regra** de quem poderá acessar comandos pelo `aws`!

1. Em EC2, vamos clicar na instância -> `ACTIONS` -> `Instance Settings` -> `attach/replace IAM Role`;
2. Vamos adicionar a regra de `IAMReadOnlyAccess` (esta regra permitá ao EC2 acessar os comandos `aws`);
   1. Se não ouver regras, devemos cria-las;
3. Com a `role` setada para a instância, podemos rodar o comando `aws iam list-users` para ter o `.json` com a lista de usuários cadastrados;

### EC2 Purchasing Options

Cada empresa/cliente possui um tipo de aplicação e para isto existem **tipos de EC2** que podem **poupar gastos** dependendo da aplicação. Até o momento, aprendemos a utilização do:

*  **On-Demand**, é quando usamos o `pay for what you use`
  * Recomendado para aplicações `Short workloads` e ininterruptas (sabemos como a aplicação vai se comportar);
  * É o `mais caro`, mas não necessita de pagamento adiantado;
* **Reserved**, tem a duração de **no mínimo 1 ano** e é dividido em:
  * **Reserved Instances** para `long workloads`;
  * **Convertible Reserved Instances** para `long workloads` mas com instâncias ‘flexíveis’;
  * **Scheduled Reserved Instances** quando é agendado, como todas Terças-feiras das 3 e 6pm;
  * São os tipos mais baratos em relação ao `on-demand`;
  * Quanto mais se reservar, maior será o desconto mas também maior será o comprometimento;
  * Tem as opções de `no upfront`, `partial upfront` (+ desconto) e `all upfront` (++ desconto ainda);
* **Spot Instances**, funciona como um leilão, onde pode ser que pague baixo, mas se vir  alguem e pagar mais caro, irá tomar todas as instâncias;
  * Para `short workloads`, mas para aplicações que permite ‘perder’ a instancia a qualquer  momento., como:
    * Batch jobs;
    * Data Analysis (BI);
    * Image processing;
  * É o mais barato;
* **Dedicated Hosts**, é quando se reserva um servidor físico por completo;
  * Mais caro;
  * Utilizado para empresas que tem uma regulação detalhada demais ou baseado nos desejos do compliance;

![HotelExample](C:\Users\867695\Pictures\HotelExample.PNG)

# Questions - Session 5

**Which EC2 Purchasing Option can provide the biggest discount, but is not suitable for critical jobs or databases?**

* Spot Instances

**Which network security tool can you use to control traffic in and out of EC2 Instances?**

* Security Group;

**Under the Shared Responsibility Model, who is responsible for operating-system patches and updates on EC2 Instances?**

	* The customer

**How long can you reserve an EC2 Reserved Instance?**

	* 1 or 3 years;

**Which of the following is NOT an EC2 Instance Purchasing Option?**

* Connect Instances

**Which EC2 Purchasing Option should you use for an application you plan on running on a server continuously for 1 year?**

* Reserved Instances;

## EC2 - Storage

Uma instância pode ter 3 tipos de meios de armazenamento de dados:

* EBS - _Elastic Block Store_;
* EC2 Instance Store;
* EFS - _Elastic File System_;

### EBS Volume

 Um volume EBS(_Elastic Block Store_) é uma **unidade de rede** que pode ser atribuida a uma instância enquanto ela funciona;

* Funciona como um adaptador wifi (porém não é físico) que pode armazenar dados (30GB para o Free Tier);
* Não pode ser ‘movido’ para outra **Zona** (de SP não posso mandar para Nova York);
  * Porém, é possível fazer um **SNAPSHOT** que seria uma cópia da EBS para outra zona;
* **Cobrança** pela memória provisionada;
* Só pode ser atríbuida **um EBS** por instância;
* Podesse escolher em **manter EBS** mesmo quando a instância for terminada;

#### Criando um EBS

1. Dentro do EC2 > menu esquerdo > Elastic Block Store (Volumes);
2. Criar Volume > selecionamos o espaço de armazenamento e a Zona (atribuir a zona da instância);
3. Finalizar > selecionar o volume criado > Actions > Attach volume;

### AMI - Amazon Machine Image

A AMI nada mais é do que uma **imagem da instância**, que irá conter toda configuração, como:

* Sistema escolhido (Linux ou Windows);
* Script (uma vez que o script é colocado, a imagem irá gravar também);

O que **facilita a criação de outras** instâncias, uma vez que já temos toda a configuração feita;

#### Criando Imagem Personalizada e Utilizando

1. Dentro da instância criada (se não será necessário cria-la com o script);
2. Clique com direito > Image > create image;
3. Checar após a criação no menu esquerdo > Images (AMIs);
4. Assim que criada, basta lançar uma nova instância **selecionando My IMIs** e não preencher mais nada;

### EC2 Instance Store

Uma unidade **EBS** é uma unidade de rede mas com uma **performance não tão boa**. Se for necessário uma **alta performance** se é aconselhável a utilizar uma **EC2 Instance Store**, que é:

* Um hardware físico que fica conectado a instância;
* Caso a instância seja terminada, os dados serão perdidos;
* Muito utilizado para buffers/caches/conteúdos temporários;
* Backups são de responsábilidade do usuário;

### EFS Volume

Este é o volume mais caro, mas também com mais benefícios. O **EFS (Elastic File System)**, pode:

* Estar presente em várias instâncias (não somente em uma, como o EBS);
* Pode estar em diferentes regiões, sem a necessidade do SNAPSHOT;
* Se paga por uso, não é necessário reservar igual no EBS;
* 3x mais caro que um EBS padrão;



# Questions - Sessions 6

**Which EC2 Storage would you use to create a shared network file system for your EC2 Instances?**

- EFS Volume

**What are AMIs NOT used for?**

* Add your own IP Adress;

**EBS Volumes CANNOT be attached to multiple EC2 instances at a time.**

* True

**An EBS Volume is a network drive you can attach to your instances while they run, so your instances' data persist even after their termination.**

* True

**Which statement is CORRECT regarding EC2 Instance Store?**

* It has a better I/O performance, but the data is lost if the EC2 instance is terminated

**What is an EBS Snapshot?**

* Is a backup of your EBS Instance at that point in time

**Where can you find a third party's AMI so you can use it to launch your EC2 Instance?**

* AWS Marketplace

**What is an EBS Volume tied to?**

* An A.Z.



## Load Balancer & Auto Scaling

Antes de entender o que é o **Load Balancer e Auto Scaling**, precisamos entender os conceitos de:

* `Scability` (Escabilidade)
  * _Vertical_:
  * _Horizontal (Utilizado pela Amazon)_: 
* `High Availability` (Alta disponibilidade)
* `Elasticity` (Elasticidade)
* `Agility` (Agilidade)