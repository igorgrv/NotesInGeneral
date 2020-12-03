# DevOps

DevOps is short for **Dev**elopment **Ope**rations.

* Devops is an approach based on **Lean** and **Agile** principles;
* Business Owners, developers, and QA collaraborate to **deliver software in a continuos manner**;
* Devops is perfect to enterprise apps that have diverse and composed of multiple languages, databases ans so on;
* Goes from an idea all the way to production;



<img src="https://blog.caelum.com.br/wp-content/uploads/2029/02/devops-tools.png" alt="devops" style="zoom: 67%;" />

One of the tenets (principles) of DevOps, is to **develop and test on a production-like environment**, that means, that DevOps has a challenge of the available environment matching the production environment!

## How the DevOps work?

### Principles

#### Develop/Test vs Production-like system

The goal of the DevOps is to allow development and QA teams to develop and test agains systems that behave like a production environment.

1. First, it allows the app to be tested in an environment that is close to the **actual production environment**;
2. Second, it allows the app delivery processes themselves (hot deploy)

<img src="/Users/igorromero/NotesInGeneral/images/devopworks.png" alt="devopworks" style="zoom:75%;" />

#### Deploy with repeatable, reliable processes

Automation is the key for this principle. Creating a pipeline that allows continuos, automated deployment and testing means lower risk of deployment failures at release time;

#### Monitor and validate operational quality

Frequent monitoring provides early warning about operatoins and quality issues that may occur in production!

#### Amplify feedback loops

Another gool of DevOps is to **enable organization to react and make changes MORE RAPIDLY**, is a call to create communication channels to all stakeholders access and act on feedback



## Develop & Deploy & Operate

**Continuos development** is a practice in which software developers continuously **integrate their work** with other members of the team and then **test the integrated work**.

* Regular integrations results to early discover and exposure of integrations risks!

The goal of the **Deploy adoptions**, or the **continous release and deployment** is to release new features to customers as soons as possible, by creating delivery pipelines.<br>

The **operate adoptions** includes two practices (**Continuos monitoring and continuos customer feedback**);



## DevOps Capabilities

**Collaborative development** provides a common set of practices and a common platform that the practitioners are able to work together. That means, one core within collaborative development, **a practice which software developers continuosly** integrate their work with that of other members;<br>

### Deploy

**Continuous release and deployment** take the concept of continuos integration to the next step. The practice that enables release and deploy also enables the creation of **delivery pipeline**.

# Continuous Integration

Continuous Integration/Continuous Deployment **is about building, shipping and running**, and the CI takes two parts of the equations (build and ship); The greatest benefit of CI is **reduced risk**<br>

The steps support CI:

* **Development**: Rapidly implementing small changes;
* **SCM (Source Code Management)**: merge changes from multiple developers;
* **Build**: creating new deployment artifacts;
* **Package**: installing build into runtimes;

## What's the CI?

CI is a development practice that required developers to **integrate code into a shared repository** several times a day, allowing teams to detect problems early. 

* Without the CI approach, there are longer periods between integrations, that means money!
* Withot the CI, makes it exponentially more difficult to find and fix problems;

## CI in practice

There are a couple of practices that should be considered to implement CI;

* **Maintaing a Single Source Repository**: software projects involve many files and multiple people involved, tha is, is hard to manage. So teams created a SCM tool, such as **Git**, which all files will be placed in a repository;
* **Automate the build**: we shouldn't waste time every time that we want to build a project, everything should be included in a **automated build**. Althought a small change should performe all the steps. A good build tool determine what needs to be changed as part of the process;
* **Make the build self-testing**: test should be executed in a single command line that cover all the code and a failure test should cause the build to fail

CI doest not alleviate bugs, but it does make them easier to find! It's easier to find the bug because we can compare the curren version of the system to a without a bug.

# Continuous Deployment

Continuous deployment takes the lastest part of the process, **running**. Is made by:

*  **Deploy to test**;
*  **Deploy to staging**;
*  **Deploy to production**;

## Tool

Jenkins is the most popular CI/CD tool, we can use to:

* Automate builds;
* Unit/Integration/Deployments tests;
* Trigger on a schedule build;
* Trigger when a commit is made;



# CI & CD Pipeline

![cicdpipeline](/Users/igorromero/NotesInGeneral/images/cicdpipeline.png)

# Simulation of Jenkins + Kubectl + Helm + IBM Cloud

1. Deploy a Jenkins Server to Docker;

   ```
   docker run -p 8080:8080 -p 50000:50000 jenkins
   docker ps (to take the container id)
   docker exec -it -u root \containerId bash
   ```

2. Install 2 plugins:

   1. Kubectl (allow us to configure jenkins on IBM Cloud)

   2. Helm (install and management kubernetes application, share our applications as kubernetes charts, create reproducible builds, manage releases of helm packages)

      ```
      # kubectl
      curl -LO https://storage.googleapis.com/kubernetes-release...
      
      # Helm
      curl https://raw.githubusercontent.com/kubernetes/helm/master > get\_helm.sh\
      sed 's/openssl sha/openssl sha1/' < get\_helm;sh >get\_helml.sh\
      chmod 700 get\_helml.sh\
      ./get\_helml.sh -v v2.4.1
      ```

3. To connect Kubenertes on IBM Cloud we'll config Kubernetes client

   1. The jenkins server installed is running Docker outside of the ibm cloud, we need Kubernets to authenticate information from IBM Cloud. This information is used to configure jenkins server so it can communicate with kubernetes;

4. Configure the build process in Jenkins;

   1. New Items → item name
   2. Add build → add shell → past the comando to run the kubectl

5. Deploy an application



# Alura - Integração Contínua (CI)

## Entendendo o problema

Quando um projeto possui muitos desenvolvedores, geralmente cada um roda o código **localmente** e **depois** que a task foi **concluída é feito o merge** e ai que mora o problema.

* Quando demoramos para juntar todos os códigos que estão sendo desenvolvidos, temos um **problema de sincronia**!

![problem](https://caelum-online-public.s3.amazonaws.com/1629+-+integracao_continua/01/1_2_1_grafico.png)

* Geralmente o que acontece é do produto final ser **entregue somente no final da sprint** o que resulta em pouco teste.

O **ideal** é que tenhamos **a integração contínua**, ou seja, **pequenas alterações todo dia!**.

## Controle de versão

Para que uma equipe trabalhe em **sincronia** se utilizam de **VCS (Version Control System)**, onde o mais conhecido é o **Git**.

* No VCS devemos ter **tudo aquilo que é necessário para construção do projeto** (.jar, libs que podem ser construidas com um ` build` não precisam estar dentro do repositório);

O padrão de VCS mais famoso é o **Multi-repo**, onde **cada projeto** é um repositório.

* Algumas empresas adotam o **mono-repo**, onde todos os projetos ficam em um único repositório, o que gera uma grande demanda para clonagem e montagem de ambiente...

### Branching Models

O código deve ter uma linha principal, onde as **ramificações/branchs** irão partir deste ponto em específico e voltar, geralmente chamado de **MASTER**, que seria o _core_ da aplicação.

<img src="https://caelum-online-public.s3.amazonaws.com/1629+-+integracao_continua/02/2_1_2_ramificacao.png" alt="ramificacao" style="zoom: 67%;" />

* PORÉM, seguindo o princípio da CI, devemos **alterar de maneira contínua o repositório principal**

<br>

Modelos de branch mais famosos:

* **Temporárias (Branchs locais)**: utilizadas localmente para organização e dps realizar o commit;
* **Feature Branch**: utilizada para implementar alguma funcionalidade nova;
* **Historical Branch (master/dev)**: alteraçoes baseado na cronologia do projeto;
* **Environment Branch (Staged/Prod)**: para ambientes de deploy;
* **Maintenance Branch (Release/Hotfix)**: para ajuste de bugs;



## DevOps

**DevOps** é um movimento cultura que fisa a **integração e otimização** do processo de aprendizagem dos integrantes da equipe, **não é um cargo**, mas uma **visã ode organização do trabalho** que visa criar um pipeline **veloz, seguro e integrado**;