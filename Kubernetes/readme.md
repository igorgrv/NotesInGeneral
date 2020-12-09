# Kubernetes

O Kubernetes é um **orquestrador de containers**, onde através de um **cluster** (uma ou mais VM que trabalham em conjunto), é possível iniciar novas VMs através de uma **escalabilidade horizontal**.<br>

Por orquestrar os containers, o Kubernetes, é capaz de:

* Iniciar um container sozinho;
* Reiniciar um container em caso de falha;
* Criar novas VMs

Um cluster com Kubernetes, pode ser criado:

* AWS;
* Azure;
* Google Cloud;
* MiniKube;

## Aprofundando

O Kubernetes NÃO é só um orquestrador de containers, ele possui diversos recursos/soluções que podem ser implementadas

<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/kubernetes_1.png?raw=true" alt="recursos" style="zoom:67%;" />

O Kubernetes, para gerenciar os cluster, utilizasse de 2 tipos de denominações:

* **Master**
  * Gerencia o cluster;
  * Mantem os **PODs** (é onde fica o container) atualizados (reinicia e inicia);
  * Gerencia os recursos (para criar novos recursos, criamos pelo master);
* **Node**
  * É onde irá **executar** as aplicações;

<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/kubernetes_node.png?raw=true" alt="recursos" style="zoom:67%;" />

### Master

O Master possui o chamado **Control Planes**, onde ficam alguns serviços, como:

* API;
  * Este é o serviços **responsável por gerenciar os recursos**!
  * Utilizamos do **_Kubectl_** para se comunicar via request com a API, onde podemos criar um arquivo que poderá criar, ler, remover os recursos do cluster!

<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/kubernetes_master.png?raw=true" alt="recursos" style="zoom:67%;" />

* C-M (Control Manager);
* Sched (Schedule);
* ETCD;



### Node

O Node, possui para cada VM um par de serviços:

* Kubelet;
* K-proxy (realiza a comunicação entre os nodes);

<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/kubernetes_node_2.png?raw=true" alt="recursos" style="zoom:67%;" />



## Instalando

Para utilizar o Kubernetes, basta ter o [Docker](https://www.docker.com/get-started) instalado. Assim que o Docker for instalado:

1. Abra o Dashboard/Configuração;

2. Clique em Kubernetes;

3. Check → *Enable Kubernetes*;

4. Abra um terminal e rode

   ```bash
   kubectl get nodes
   
   ➜  ~ git:(master) ✗ kubectl get nodes
   NAME             STATUS   ROLES    AGE   VERSION
   docker-desktop   Ready    master   65s   v1.19.3
   ```

### Linux

No Linux, se faz necessário instalar manualmente o MiniKube e kubectl

```bash
# kubectl
sudo apt-get install curl -y
curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl

# minikube
curl -Lo minikube https://storage.googleapis.com/minikube/releases/v1.12.1/minikube-linux-amd64 \ && chmod +x minikube
sudo install minikube /usr/local/bin/
```

### Cloud

Para rodar o Kubernetes em uma plataforma na nuvem, existe uma [documentação](https://v1-18.docs.kubernetes.io/docs/concepts/cluster-administration/cloud-providers/) explicando como fazer!

## ***Comandos Kubectl

| Kubectl                                                      | O que faz                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `kubectl run nomePod --image=nomeImagem`                     | **Cria** um Pod com a imagem x                               |
| `kubectl get pods`                                           | **Exibe** todos os Pods                                      |
| `kubectl get configmap`                                      | **Exibe** todos os ConfigMaps                                |
| `kubectl get pods -o wide`                                   | **Exibe** mais informações sobre o Pod                       |
| `kubectl get pod nomePode --watch`                           | **Exibe** em tempo de execução, todos os Pods ou Pod específico; |
| `kubectl get svc`                                            | **Exibe** todos os Services                                  |
| `kubectl get node -o wide`                                   | **Exibe** todos os NodePorts (IP Externo atribuído)          |
| `kubectl describe pod nomePod`                               | **Exibe** a descrição do Pod                                 |
| `kubectl edit pod nomePod`                                   | **Abre** um arquivo `yaml` que pode ser editado              |
| `kubectl apply -f ./seuArquivo.yaml`                         | **Executa** o script                                         |
| `kubectl delete nomePod`                                     | **Deleta** o pod de modo imperativo                          |
| `kubectl delete -f ./arquivo.yaml`                           | **Deleta** o pod de modo declarativo                         |
| `kubectl delete pods/svc --all`                              | **Deleta** todos os pods ou sic                              |
| `kubectl exec -it nomePod -- bash`                           | **Abre** o terminal do container                             |
| `kubectl exec -it pod-volume --container="pod-volume-nginx" -- bash` | **Abre** o terminal de um container em específico            |



## Recursos

### Pods

No Docker, trabalhamos com containers, no mundo Kubernetes, trabalhamos com **Pods**, que **podem** conter **um ou mais containers**.<br>

Quando quisermos criar um container, iremos através do **kubectl** fazer uma requisição a API, para que **seja criado um POD**, onde internamente irá conter um container;<br>

* Toda vez que um POD é criado, um **endereço IP **é atribuído ao POD, onde **cada container**, irá estar em uma porta daquele IP, ou seja, _compartilham o mesmo endereço IP_;
  * Por compartilhar o mesmo endereço de IP, os Pods se comunicam via localhost!
* Todo Pod é **efêmero** (devem ser substituidos a qualquer momento), ou seja, se um POD falhar, **OUTRO POD NASCE**, não necessariamente com o mesmo endereço de IP;
  * Um Pod, só falha se TODOS os containers falharem;



#### Criando Pod - Maneira Imperativa

Para criar um Pod e checar informações sobre, utilizamos os comandos:

```bash
➜  ~ git:(master) ✗ kubectl run nginx-igor --image=nginx
pod/nginx-igor created


➜  ~ git:(master) ✗ kubectl get pods --watch
NAME         READY   STATUS              RESTARTS   AGE
nginx-igor   0/1     ContainerCreating   0          9s
nginx-igor   1/1     Running             0          12s
^C%        


➜  ~ git:(master) ✗ kubectl describe pod nginx-igor
Name:         nginx-igor
Namespace:    default
Priority:     0
Node:         docker-desktop/192.168.65.3
Start Time:   Wed, 02 Dec 2020 23:25:09 -0300
Labels:       run=nginx-igor
Annotations:  <none>
Status:       Running
IP:           10.1.0.6
IPs:
  IP:  10.1.0.6
Containers:
  nginx-igor:
    Container ID:   docker://4529d1a755d56a9dc5c6a9f37bd96f4d814e3c2a7b207ab4eeb14bf07251b335
    Image:          nginx
    Image ID:       docker-pullable://nginx@sha256:6b1daa9462046581ac15be20277a7c75476283f969cb3a61c8725ec38d3b01c3
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Wed, 02 Dec 2020 23:25:21 -0300
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-h4lvh (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  default-token-h4lvh:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-h4lvh
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                 node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age    From               Message
  ----    ------     ----   ----               -------
  Normal  Scheduled  3m29s  default-scheduler  Successfully assigned default/nginx-igor to docker-desktop
  Normal  Pulling    3m28s  kubelet            Pulling image "nginx"
  Normal  Pulled     3m18s  kubelet            Successfully pulled image "nginx" in 10.736694722s
  Normal  Created    3m17s  kubelet            Created container nginx-igor
  Normal  Started    3m17s  kubelet            Started container nginx-igor
```

#### Criando Pod - Maneira Declarativa

A maneira Declarativa é através de um arquivo, que pode ser no formato `json` ou no formato `yaml`;

```yaml
apiVersion: v1 						#declara a versão do yaml
kind: Pod									#tipo que queremos criar - Pod com letra maiúscula
metadata:
  name: pod-declarativo		#nome do pod
spec:
  containers:
    - name: nginx-container-igor
      image: nginx
      ports:
      	- containerPort: 80
  #podemos colocar diversos containers com outras imagens 
  # - name: nginx-container-2
  #		image: ubuntu
```

1. Depois de criar o arquivo, abra o terminal **no diretório do arquivo**;

2. Execute os comandos abaixo:

   ```bash
   kubectl apply -f ./seuArquivo.yaml
   
   kubectl describe pod nomeDoPode
   
   #Anote o ip que foi gerado, se o ip não for acessível, execute
   #kubectl exec -it nomePod -- bash
   #curl localhostw
   ```



### Service - SVC

Como vimos os **pods não possuem um IP fixo**, ou seja, como faremos para comunicar um POD com o outro?

<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/kubernetes_svc.png?raw=true" alt="recursos" style="zoom:67%;" />

O **SVC (Service)** é o recursos responsável por:

* Abstrair para expor um ou mais pods;
* Prove um IPs fixo para fazer a comunicação;
* Prove um DNS para um ou mais pods;
* Possuem um LoadBalancer!

Ou seja, através de um **SVC**, podemos mapear um IP para acessa-lo e o SVC irá se comunicar com o POD. 

<br>

Na prática, um POD irá se comuincar com o SVC e esse SVC irá se comuincar com o outro POD.

<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/kubernetes_service2.png?raw=true" alt="recursos"/>

#### Configurando SVC

Para criar/configurar um SVC, precisamos configurar:

* Um **`ClusterIP`** → expõe dentro de um Cluster a comunicação entre os Pods;
* Um **`NodePort`** → expõe para o mundo o acesso a um Pod;
* Um **LoadBalancer**;

Tudo isto, é feito também através de um arquivo no formato `.json` ou `.yaml`;

<br>

#### ClusterIP

O `ClusterIP` faz a **comunicação dos PODs dentro de um cluster**, porém não como uma via de mão dupla, ou seja, configuramos o `ClusterIP` para mandar a requisição para 1 POD! Onde **para a comunicação ser estável, utiizamos LABELS**!

<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/kubernetes_clusterip.png?raw=true" alt="recursos" style="zoom:90%;" />

* Neste exemplo, TODOS PODs, encaminham requisições para o IP `pod-2`, porem o POD final `pod-2` não pode mandar para o `pod-1`.



##### Criando um ClusterIP

Para criar um SVC, 1º iremos criar 2 PODs, **configurando a porta do container**;

```yaml
# 1º Pod
apiVersion: v1
kind: Pod
metadata:
	name: pod-1
spec:
	containers:
		- name: container-pod-1
			image: nginx
			ports:
				- containerPort: 80
				
# 2º Pod
apiVersion: v1
kind: Pod
metadata:
	name: pod-2
spec:
	containers:
		- name: container-pod-2
			image: nginx
			ports:
				- containerPort: 80
```

Para o SVC se comunicar com o POD, precisamos definir o **nome da label**, mapeando qualquer chave ou valor

```yaml
#pod-2
metadata:
	name: pod-2
	labels:
		minhaLabel: minha-label-pod
		app: segundo-pod
```

Agora para criar um SVC, precisamos configurar o `selector` informando o nome da label do Pod e **também informar a porta** de entrada e saída, ou seja,a 

* saída → `targetPort`→ deve ser a **porta do pod** 
* entrada → `port` → fica livre a escolha.

```yaml
apiVersion: v1
kind: Service 				#aqui declaramos o SVC
metadata:
	name: svc-pod-2
spec:
	type: ClusterIP			#não é um container, é um tipo
	selector:
		app: segundo-pod
	ports:
		- port: 9000
			targetPort: 80
		
```

Agora basta criar todos os Pods e o SVC:

```bash
kubectl apply -f ./pod-1.yaml
kubectl apply -f ./pod-2.yaml
kubectl apply -f ./svc-pod-2.yaml

kubectl get svc
✗ kubectl get svc
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP    15h
svc-pod-2    ClusterIP   10.100.170.34   <none>        9000/TCP   5s

#10.100.170.34 é o IP para realizar a comunicação
```

Com o IP em mãos, podemos entrar dentro de um Pod e pedir uma requisição, então veremos que o `svc-pod-2` irá chamar o `pod-2`!

* Lembre-se de utilizar a `port` q foi mapeado (9000);

```bash
✗ kubectl exec -it pod-1 -- bash
root@pod-1:/# curl 10.100.170.34:9000

# irá exibir informações do pod-2
```

<br>

Podemos entender, que a comunicação entre Pods, **acontece pela Label**, ou seja, se deletarmos o `pod-2` e subirmos um novo, este `pod-2` não terá o mesmo IP, porém terá a **mesma label**, portanto é desta forma que o SVC sabe se comunicar!

#### NodePort

O `NodePort`, funciona **como um `ClusterIP`**, porém expõe para o mundo o acesso aos Pods também, ou seja, iremos acessar o SVC com o NodePort configurado, que então irá acessar o Pod!

<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/kubernetes_nodeport.png?raw=true" alt="recursos" style="zoom:67%;" />

##### Criando NodePort

Para criar um `NodePort`, seguiremos com a mesma config que fizemos para o `ClusterIP`, a única diferença será no `nodePort`, que será o parâmetro que definiremos a porta ao mundo externo ao Cluster;

```yaml
apiVersion: v1
kind: Service
metadata:
  name: svc-pod-1
spec:
  type: NodePort
  selector:
    app: primeiro-pod
  ports:
    - port: 80
      nodePort: 30000 #A porta pode variar de 30.000 - 32.0000
```

Agora basta deixarmos o Pod configurado com a label `app: primeiro-pod` e pedirmos ao `kubectl` para configura-lo:

```bash
✗ kubectl apply -f ./pod-1.yaml 
pod/pod-1 configured

✗ kubectl apply -f ./svc-pod-1.yaml
service/svc-pod-1 created

✗ kubectl get svc
NAME         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
kubernetes   ClusterIP   10.96.0.1        <none>        443/TCP        16h
svc-pod-1    NodePort    10.109.169.250   <none>        80:30000/TCP   22s
svc-pod-2    ClusterIP   10.100.170.34    <none>        9000/TCP       59m

✗ kubectl get nodes -o wide
NAME             STATUS   ROLES    AGE   VERSION   INTERNAL-IP    EXTERNAL-IP   OS-IMAGE         KERNEL-VERSION    CONTAINER-RUNTIME
docker-desktop   Ready    master   16h   v1.19.3   192.168.65.3   <none>        Docker Desktop   5.4.39-linuxkit   docker://19.3.13
```

Se acesasrmos em um navegador a url: `localhost:30000` iremos estar vendo a imagem do `pod-1`

#### LoadBalancer

O `LoadBalancer` do SVC, é também um `nodePort` e `clusterIP` ao mesmo tempo! Para utilizarmos, basta alterarmos o `type` !

```yaml
apiVersion: v1
kind: Service
metadata:
  name: svc-pod-loadbalancer
spec:
  type: LoadBalancer
  selector:
    app: primeiro-pod
  ports:
    - port: 80
    	nodePort: 30000
```

Agora, se integrarmos a um servidor Cloud, automaticamente será configurado o LoadBalancer na plataforma!

<br>

## Banco de Dados

Até o momento, aprendemos a fazer a comunicação entre Pods, então, vimos que se queremos uma **comunicação interna**, ou seja, dentro do Cluster, utilizamos do `ClusterIP`. No caso de um BD, a comunicação ao BD não precisa estar aberta ao mundo, apenas aos Pods!<br>

<br>

Para criar um Pod de um Banco de dados, iremos criar também um `ClusterIP`!

1. Criando um Pod do BD com a imagem do `mysql` da Alura;

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
   	name: igor-news-bd
   	labels:
   		app: igor-news-bd
   spec:
   	containers:
   		-	name: igor-news-bd-container
   			image: aluracursos/mysql-db:1
   			ports:
   				- containerPort: 3306
   ```

2. Agora criamos um `clusterIp` que irá se comunicar com este Pod, então utilizaremos também a porta `3306`:

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
   	name: igor-news-bd-svc
   spec:
   	type: ClusterIP
   	selector:
   		app: igor-news-bd
   	ports:
   		- port: 3306
   ```

3. Abra o terminal na pasta onde esta o arquivo e suba o Pod e o SVC

   ```bash
   kubectl apply -f ./igor-news-db.yaml
   kubectl apply -f ./igor-news-db-svc.yaml
   
   ✗ kubectl get svc -o wide
   NAME               TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)    AGE   SELECTOR
   igor-news-db-svc   ClusterIP   10.96.85.6   <none>        3306/TCP   67s   app=igor-news-bd
   
   ✗ kubectl get pods
   NAME           READY   STATUS             RESTARTS   AGE
   igor-news-bd   0/1     CrashLoopBackOff   4          2m31s
   
   # O BD crashou!
   ```

<br>

O BD crashou pq faltou **informarmos as VARIÁVEIS DE AMBIENTE**, como :

* Database;
* User;
* Password

<br>

### ConfigMap

O Kubernetes nos disponibiliza uma forma elegante de criarmos variáveis de ambiente, através de um `ConfigMap`!<br>

As variáveis podem ser definidas de 2 formas em um arquivo `json` ou `yaml`:

* Através do `env`  ou do `envFrom`;

#### ConfigMap → env

Quando utilizamos o `env`, precisamos **declarar** as variáveis no próprio Pod! No `yaml` do BD, iremos adicionar as variáveis de ambiente para config do Banco;

1. No final do arquivo, iremos adicionar a estrutura:

   ```yaml
   env:
   	- name: XXX
   		value: YYYY
   ```

2. A Documentação do MySQL, nos pede para configurar `MYSQL_ROOT_PASSWORD, MYSQL_DATABASE, MYSQL_PASSWORD`, portanto, o arquivo final ficará:

   ```yaml
   # igor-news-bd
   apiVersion: v1
   kind: Pod
   metadata:
   	name: igor-news-bd
   	labels:
   		app: igor-news-bd
   spec:
   	containers:
   		-	name: igor-news-bd-container
   			image: aluracursos/mysql-db:1
   			ports:
   				- containerPort: 3306
   			env:
   				- name: "MYSQL_ROOT_PASSWORD"
   					value: "igor123"
   				- name: "MYSQL_DATABASE"
   					value: "empresa"
   				- name: "MYSQL_PASSWORD"
   					value: "igor123"
   ```

3. No terminal, basta deletarmos o Pod antigo e adicionar este novo e verificar com o `kubectl describe pod db-igor`;

4. Caso esteja em `running` significa q está funcionando, então podemos checar o BD/tables

   ```bash
   kubectl exec -it igor-news-bd -- bash
   
   mysql -u root -p
   show databases;
   use empresa;
   SELECT * FROM usuario;
   ```

<br>

#### ConfigMap → envFrom

O `envFrom`, diferente do `env` nos permite **criar um configMap apartado** do arq de config do Pod e isto nos dá um ganho de encapsulamento e reaproveitamento!<br>

1. Crie um arquivo `db-configmap.yaml`;

2. Diferente de um Pod e de um SVC, o `configMap` não utiliza um `type` e sim um `data`, onde neste `data` irá os `values: "key"`

   ```yaml
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: igor-news-bd-configmap
   data:
     MYSQL_ROOT_PASSWORD: "igor123"
     MYSQL_DATABASE: "empresa"
     MYSQL_PASSWORD: "igor123"
   ```

3. Se subirmos o `configMap` e rodarmos um `describe` iremos ver as variáveis:

   ```bash
   ✗ kubectl get configMap
   NAME                     DATA   AGE
   igor-news-bd-configmap   3      33s
   
   ✗ kubectl describe configMap igor-news-bd-configmap
   Name:         igor-news-bd-configmap
   Namespace:    default
   Labels:       <none>
   Annotations:  <none>
   
   Data
   ====
   MYSQL_ROOT_PASSWORD:
   ----
   igor123
   MYSQL_DATABASE:
   ----
   empresa
   MYSQL_PASSWORD:
   ----
   igor123
   Events:  <none>
   
   ```

4. Agora dentro do `db.yaml`, precisaremos trocar o `env` por `envFrom` , passando o nome do nosso `configMap`, com a variável `configMapRef`:

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: igor-news-bd
     labels:
       app: igor-news-bd
   spec:
     containers:
       - name: igor-news-bd-container
         image: aluracursos/mysql-db:1
         ports:
           - containerPort: 3306
         envFrom:
           - configMapRef:
               name: igor-news-bd-configmap
   ```

5. Basta deletar o Pod e subi-lo novamente :)



## Projeto - Igor News

Este projeto irá fazer uma junção de Pods com SVC, onde as imagens que serão utilizadas:

* `aluracursos/mysql-db:1`
* `aluracursos/portal-noticias:1`
* `aluracursos/sistema-noticias:1`

Para cada Pod, iremos criar um SVC, onde, para o:

* Pod BD `port: 3306`→ SVC ClusterIp  `port: 3306` `selector: igor-news-bd`
* Pod Sistema-Noticias `port: 80` → SVC NodePort  `nodePort: 30001` `selector: igor-news-sistema`
* Pod Portal-noticias `port: 80` → SVC NodePort;  `nodePort: 30000` `selector: igor-news-portal`

Como **`ConfigMap`** teremos que, criar as variáveis:

* BD:

  ```YAML
  data:
    MYSQL_ROOT_PASSWORD: "igor123"
    MYSQL_DATABASE: "empresa"
    MYSQL_PASSWORD: "igor123"
  ```

* SISTEMA:

  ```yaml
  data:
    HOST_DB: igor-news-bd-svc:3306 #será o name do SVC do BD + porta
    USER_DB: root
    PASS_DB: igor123
    DATABASE_DB: empresa
  ```

* PORTAL:

  ```yaml
  data:
    MYSQL_ROOT_PASSWORD: "igor123"
    MYSQL_DATABASE: "empresa"
    MYSQL_PASSWORD: "igor123"
  ```

<br>

<br>

Configs:

* BD

  ```yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: igor-news-bd
    labels:
      app: igor-news-bd
  spec:
    containers:
      - name: igor-news-bd-container
        image: aluracursos/mysql-db:1
        ports:
          - containerPort: 3306
        envFrom:
          - configMapRef:
              name: igor-news-bd-configmap
  ```

* BD-SVC

  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: igor-news-bd-svc
  spec:
    type: ClusterIP
    selector:
      app: igor-news-bd
    ports:
      - port: 3306
  ```

* BD-CONFIGMAP

  ```YAML
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: igor-news-bd-configmap
  data:
    MYSQL_ROOT_PASSWORD: "igor123"
    MYSQL_DATABASE: "empresa"
    MYSQL_PASSWORD: "igor123"
  ```

<br>

<br>

* SISTEMA

  ```yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: igor-news-sistema
    labels:
      app: igor-news-sistema
  spec:
    containers:
      - name: igor-news-sistema-container
        image: aluracursos/sistema-noticias:1
        ports:
          - containerPort: 80
        envFrom:
          - configMapRef:
              name: igor-news-sistema-configmap
  ```

* SISTEMA-SVC

  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: igor-news-sistema-svc
  spec:
    type: NodePort
    selector:
      app: igor-news-sistema
    ports:
    - port: 80
      nodePort: 30001
  ```

* SISTEMA-CONFIGMAP

  ```YAML
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: igor-news-sistema-configmap
  data:
    HOST_DB: igor-news-bd-svc:3306 #será o name do SVC do BD + porta
    USER_DB: root
    PASS_DB: igor123
    DATABASE_DB: empresa
  ```

<br>

<br>

* PORTAL

  ```yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: igor-news-portal
    labels:
      app: igor-news-portal
  spec:
    containers:
      - name: igor-news-portal-container
        image: aluracursos/portal-noticias:1
        ports:
          - containerPort: 80
        envFrom:
          - configMapRef:
              name: igor-news-portal-configmap
  ```

* PORTAL-SVC

  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: igor-news-portal-svc
  spec:
    type: NodePort
    selector:
      app: igor-news-portal
    ports:
    - port: 80
      nodePort: 30002
  ```

* PORTAL-CONFIGMAP

  ```yaml
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: igor-news-portal-configmap
  data:
    IP_SISTEMA: http://localhost:30001
  ```

  

## More Resources

### ReplicaSets - RS

Quando falamos que o Kubernete tem o poder de **recriar um Pod**, é o `ReplicaSet` o responsável por isso!

#### Criando RS

Para criar um `ReplicaSet` é bem simples, pois basicamente criaremos um **`template`**, que terá as informações do `pod`:

1. Crie um arquivo `yaml`;

2. Diferente dos outros recursos (SVC ou Pod), o `replicaSet` utiliza outro tipo de `apiVersion`!

3. No `spec` iremos criar um **`template`**, que terá as informações do Pod:

   ```yaml
   apiVersion: apps/v1
   kind: ReplicaSet
   metadata:
     name: igor-news-portal-replicaset
   spec:
   	template:
     	# informações do Pod
   ```

4. Adicione as informações do `metadata & spec` do template:

   ```yaml
   apiVersion: apps/v1
   kind: ReplicaSet
   metadata:
     name: igor-news-portal-replicaset
   spec:
     template:
     	#informações provenientes de um POD
       metadata:
         name: igor-news-portal
         labels:
           app: igor-news-portal
       spec:
         containers:
           - name: igor-news-portal-cotainer
             image: aluracursos/portal-noticias:1
             ports:
               - containerPort: 80
             envFrom:
               - configMapRef:
                   name: igor-news-portal-configmap
   ```

5. Por fim, basta informarmos o número de **`replicas`** que queremos e um **`selector`** que referencie a `label` do Pod, com o **`matchLabels`**

   ```yaml
   apiVersion: apps/v1
   kind: ReplicaSet
   metadata:
     name: igor-news-portal-replicaset
   spec:
     template:
       metadata:
         name: igor-news-portal
         labels:
           app: igor-news-portal
       spec:
         containers:
           - name: igor-news-portal-cotainer
             image: aluracursos/portal-noticias:1
             ports:
               - containerPort: 80
             envFrom:
               - configMapRef:
                   name: igor-news-portal-configmap
     replicas: 3
     selector:
       matchLabels:
         app: igor-news-portal
   ```

6. Se rodarmos agora um `kubectl apply -f ./replicaSet.yaml`, automaticamente será criado 3 Pods, onde caso seja feito um `delete` de um deles, outro será instanciado no mesmo momento!

   1. Podemos ver este comportamento com **`kubectl get replicaset --watch`**

<br>

### Deployment

O `Deployment` é uma melhoria do `replicaSet`, como uma **camada acima, que PERMITE VERSIONAMENTO** dos `replicaSets`.<br>

#### Criando Deployment

A criação de um Deployment é bem parecida com a do `replicaSet`, apenas muda o `kind`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: igor-news-portal-deployment
spec:
  template:
    metadata:
      name: igor-news-portal
      labels:
        app: igor-news-portal
    spec:
      containers:
        - name: igor-news-portal-cotainer
          image: aluracursos/portal-noticias:1
          ports:
            - containerPort: 80
          envFrom:
            - configMapRef:
                name: igor-news-portal-configmap
  replicas: 3
  selector:
    matchLabels:
      app: igor-news-portal
```

A diferença está nos novos comandos, que nos permitem trabalhar a versão dos códigos!

#### ***Comandos Básicos

|                           Kubectl                            |               O que faz               |
| :----------------------------------------------------------: | :-----------------------------------: |
|            `kubectl apply -f ./arquivo --record`             |  **Roda** o deploy com versionamento  |
|         `kubectl rollout history deploy nameDeploy`          |    **Exibe** as versões do arquivo    |
| `kubectl annotate deploy nameDeploy kubernetes.io/change-cause="suaMsg"` | **Altera** a descrição da atualização |
|  `kubectl rollout undo deploy nameDeploy --to-revision="2"`  |       **Volta** para a versão X       |



## Projeto - Igor News II

Aplicando o `deployment` no projeto `igor-news`, ou seja, iremos para cada `pod` criar um `deployment` e excluir o `pod` antigo!<br>

* Sistema-deployment:

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: igor-news-sistema-deployment
  spec:
    template:
      metadata:
        name: igor-news-sistema
        labels:
          app: igor-news-sistema
      spec:
        containers:
          - name: igor-news-sistema-container
            image: aluracursos/sistema-noticias:1
            ports:
              - containerPort: 80
            envFrom:
              - configMapRef:
                  name: igor-news-sistema-configmap
    replicas: 3
    selector:
      matchLabels:
        app: igor-news-sistema
  ```

* Portal-deployment:

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: igor-news-portal-deployment
  spec:
    template:
      metadata:
        name: igor-news-portal
        labels:
          app: igor-news-portal
      spec:
        containers:
          - name: igor-news-portal-cotainer
            image: aluracursos/portal-noticias:1
            ports:
              - containerPort: 80
            envFrom:
              - configMapRef:
                  name: igor-news-portal-configmap
    replicas: 3
    selector:
      matchLabels:
        app: igor-news-portal
  ```

* db-deployment:

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: igor-news-db-deployment
  spec:
    template:
      metadata:
        name: igor-news-db
        labels:
          app: igor-news-db
      spec:
        containers:
          - name: igor-news-bd-container
            image: aluracursos/mysql-db:1
            ports:
              - containerPort: 3306
            envFrom:
              - configMapRef:
                  name: igor-news-bd-configmap
    replicas: 3
    selector:
      matchLabels:
        app: igor-news-db
  ```

<br>



## More Resources

**PORÉM,** agora a aplicação possui um problema, **CADÊ OS DADOS DO BANCO?** <br>

Como os pods são efêmeros, ou seja, eles podem morrer ou nascer a qualquer momento, eles **não guardar dados**, ou seja, quando o Pod é finalizado, os dados vão junto com eles. <br>

### Volumes

Para resolver este tipo de problema, existem os **Volumes!**, tais como:

* PV → Persistent Volume (pode ser utilizado local ou Cloud);
* PVC → Persistent Volume Claim (via Cloud);

<img src="https://www.ibm.com/support/knowledgecenter/bluemix_stage/containers/images/cs_storage_pvc_pv.png" alt="IBM Knowledge Center" style="zoom:30%;" />

Quando falamos da Cloud, normalmente temos um Disco onde este Disco para se comunicar com o Pod, precisa do `pv e pvc`.

### Persistent Volume

Quando um `PV` é criado, ele está **vinculado ao `POD`** e não ao container, portanto, caso um container deixe de existir, o volume ainda continuará lá!

* Caso o pod deixe de existir, o volume também deixará, **porém os arquivos,** caso estejam vinculados a um diretório, ficaram lá e irá deixar de existir no pod;

Existem diversos tipos de `PV`, que podem ser encontrados na [documentação do Kubernetes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/):

<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/kubernetes_pv.png?raw=true" alt="recursos" style="zoom:67%;" />

#### Criando PV

Como exemplo de `PV` utilizaremos o `hostPath`.<br>

Para checarmos como volumes interagem entre containers de um mesmo Pod, iremos criar **2 containers em um Pod**;

1. A criação de um Pod ja é conhecida:

   ````yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: pod-volume
     labels:
       app: pod-volume
   spec:
     containers:
       - name: pod-volume-nginx
         image: nginx
       - name: pod-volume-jenkins
         image: jenkins
         ports:
           - containerPort: 80
   ````

2. Para adicionar um `PV` iremos declarar a TAG `volumes` **fora** do container;

   1. Declararemos um `name`;
   2. E o tipo de volume, que neste caso será o `hostPath`
      1. Que recebe um `path`. Este `path` será o caminho que o container ao salvar um arquivo irá fazer uma **cópia**.
         1. E também um `type`, que neste caso será `directory`	

   ```yaml
     containers:
       - name: pod-volume-nginx
         image: nginx
       - name: pod-volume-jenkins
         image: jenkins
         ports:
           - containerPort: 80
     volumes:
       - name: primeiro-volume
         hostPath:
           path: /Users/igorromero/kubernetesVolume
           type: Directory
   ```

3. Com o volume declarado, precisamos apenas **informar o path dentro do container**, através da tag `volumeMounts` → `mountPath`

   ```yaml
   spec:
     containers:
       - name: pod-volume-nginx
         image: nginx
         volumeMounts:
           - mountPath: /volume-dentro-do-container
             name: primeiro-volume
       - name: pod-volume-jenkins
         image: jenkins
         volumeMounts:
           - mountPath: /volume-dentro-do-container
             name: primeiro-volume
   ```

4. Basta subirmos o arquivo e então então executarmos um `exec` no container:

   ```bash
   kubectl apply -f ./arquivo-volume.yaml
   kubectl exec -it pod-volume --container="pod-volume-nginx" -- bash
   
   cd volume-dentro-do-container
   touch arquivo-test-dentro-do-container.txt
   
   # Se formos para o container do Jenkins, veremos o mesmo arquivo
   kubectl exec -it pod-volume --container="pod-volume-jenkins" -- bash
   ```

5. Note que foi criado o arquivos tanto no container, quanto dentro do `path` explicito!

### Persistent Volume Claim

O `PVC` veio para solucionar o problema de 'perder arquivos' após um Pod ser excluído.<br>

Quando temos um `pvc` , o novo Pod que vir a 'nascer' irá ter os arquivos novamente, **PORÉM** o `pvc`deve estar **Lincado com um disco!**

* No caso do uso do Google Cloud, o `pvc` deve estar vinculado com o serviço `Disk`, ou seja, o `name` do disk deve ser igual ao name do `pvc`;

#### Criando PVC

Para criar um PVC, **precisamos de um `PV`**. No caso do `PV` do Google Cloud, precisamos especificar:

* Tipo de volume: `hostPath`, `gcePersistentDisk`...
* Capacidade de armazenamento: `10Gi`
* Tipo de acesso: `ReadWriteMany, ReadWriteOnce, ReadOnly`

```yaml
#pv.yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-1
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  gcePersistentDisk:
    pdName: pv-disk #mesmo nome do disk do Google Cloud
  storageClassName: standard
```

<br>

Com o `pv` declarado, podemos agora criar um `pvc`!

1. Para que um `pv` se comunique com um `pvc` , ambos precisam:

   1. Ter a mesma capacidade → `storage`
   2. Ter o mesmo tipo de acesso → `accessModes`

   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: pvc-1
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 10Gi
   ```

2. Agora basta subir o `pvc` e configurar um Pod

<br>

Já configuramos um Pod, com o `hostPath`, que referencia um `pv`, mas e quando estamos falando de **`pvc`?**<br>

* Quando temos um `pvc` , iremos declarar que se trata de um `PersistentVolumeClaim` e passar o `ClaimName` que seria o `name` do `pvc`:

  ```yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: pod-volume
    labels:
      app: pod-volume
  spec:
    containers:
      - name: pod-volume-nginx
        image: nginx
        volumeMounts:
          - mountPath: /volume-dentro-do-container
            name: primeiro-volume
    volumes:
      - name: primeiro-volume
        persistentVolumeClaim:
            claimName: pvc-1
  ```

  