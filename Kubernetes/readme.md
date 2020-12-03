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

O Kubernetes NÃO é só um orquestrador de containers, ele possui diversos recursos/soluções que podem ser implementadas!![Screen Shot 2020-12-02 at 22.29.35](/Users/igorromero/Library/Application Support/typora-user-images/Screen Shot 2020-12-02 at 22.29.35.png)

O Kubernetes, para gerenciar os cluster, utilizasse de 2 tipos de denominações:

* **Master**
  * Gerencia o cluster;
  * Mantem os **PODs** (é onde fica o container) atualizados (reinicia e inicia);
  * Gerencia os recursos (para criar novos recursos, criamos pelo master);
* **Node**
  * É onde irá **executar** as aplicações;

<img src="/Users/igorromero/Library/Application Support/typora-user-images/Screen Shot 2020-12-02 at 22.32.10.png" alt="Screen Shot 2020-12-02 at 22.32.10" style="zoom:67%;" />

### Master

O Master possui o chamado **Control Planes**, onde ficam alguns serviços, como:

* API;
  * Este é o serviços **responsável por gerenciar os recursos**!
  * Utilizamos do **_Kubectl_** para se comunicar via request com a API, onde podemos criar um arquivo que poderá criar, ler, remover os recursos do cluster!

<img src="/Users/igorromero/Library/Application Support/typora-user-images/Screen Shot 2020-12-02 at 22.41.13.png" alt="Screen Shot 2020-12-02 at 22.41.13" style="zoom: 33%;" />

* C-M (Control Manager);
* Sched (Schedule);
* ETCD;



### Node

O Node, possui para cada VM um par de serviços:

* Kubelet;
* K-proxy (realiza a comunicação entre os nodes);

<img src="/Users/igorromero/Library/Application Support/typora-user-images/Screen Shot 2020-12-02 at 22.38.44.png" alt="Screen Shot 2020-12-02 at 22.38.44" style="zoom:50%;" />



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



## Recursos

### Pods

No Docker, trabalhamos com containers, no mundo Kubernetes, trabalhamos com **Pods**, que **podem** conter **um ou mais containers**.<br>

Quando quisermos criar um container, iremos através do **kubectl** fazer uma requisição a API, para que **seja criado um POD**, onde internamente irá conter um container;<br>

* Toda vez que um POD é criado, um **endereço IP **é atribuído ao POD, onde **cada container**, irá estar em uma porta daquele IP, ou seja, _compartilham o mesmo endereço IP_;
  * Por compartilhar o mesmo endereço de IP, os Pods se comunicam via localhost!
* Todo Pod é **efêmero** (devem ser substituidos a qualquer momento), ou seja, se um POD falhar, **OUTRO POD NASCE**, não necessariamente com o mesmo endereço de IP;
  * Um Pod, só falha se TODOS os containers falharem;

#### Comandos

| Kubectl                                  | O que faz                                                    |
| ---------------------------------------- | ------------------------------------------------------------ |
| `kubectl run nomePod --image=nomeImagem` | **Cria** um Pod com a imagem x                               |
| `kubectl get pods`                       | **Exibe** todos os Pods                                      |
| `kubectl get pod nomePode --watch`       | **Exibe** em tempo de execução, todos os Pods ou Pod específico; |
| `kubectl describe pod nomePod`           | **Exibe** a descrição do Pod                                 |
| `kubectl edit pod nomePod`               | **Abre** um arquivo `yaml` que pode ser editado              |
| `kubectl apply -f ./seuArquivo.yaml`     | **Executa** o script                                         |
| `kubectl delete nomePod`                 | **Deleta** o pod de modo imperativo                          |
| `kubectl delete -f ./arquivo.yaml`       | **Deleta** o pod de modo declarativo                         |
| `kubectl exec -it nomePod -- bash`       | **Abre** o terminal do container                             |



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

   