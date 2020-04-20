# O início com Java
O surgimento do Java veio com padrões que outras linguagens já utilizavam, então, o que torna o Java diferente é a **plataforma**, porquê? <br>
A plataforma Java é:
- Portátil;
- Fácil;
- Segura;
- Amplamente utilizada por outras linguágens;


## Sumário
1. [História](#historia)
2. [Versões/Instalação](#versoes)
3. [Compilando/Rodando primeiro código](#compilando)


## <a name="historia"></a>Um pouco sobre a historia...
James Gosling, este foi o "pai" do Java _(linguagem em si foi criada por um grupo)_. James trabalhava na **Sun Microsystems** que na época era uma start-up que era voltada a trabalhar com Hardware, que na época era o que dava dinheiro! - **_Foi um fracasso_**.
A Sun foi atacar o problema que ocorria na década de 90 - _muitos dispositivos eletrônico  e cada eletrônico precisava de um código fonte, ou seja, para cada televisão/VHS era necessário reescrever o código._ Criaram então um "processador/hardware" que **traduzia** o código para cada tipo de aparelho, **porém** por ser **necessário um hardware novo** para equipamento, se tornou algo que as fabricantes **não queriam!**<br> **Anos depois...** surgiu o BUM da web, então a ideia de uma "máquina virtual/tradutor" se encaixou como **software**, porque agora existiam Sistemas operacionais distintos que caia no mesmo problemas dos hardwares, **cada software precisava de um código distinto para S.O. diferentes**.

<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/java.png?raw=true" widht=500 height=200>

- A **JVM** é a máquina virtual, mas o conceito de integração com sistemas existe para várias áreas do Java, como para banco de dados e etc...!

## <a name="versoes"></a>Versões do Java/Instalação
O java teve grandes versões:
- Java 5;
- Java 8;

_A Oracle invez de lançar diversas versões a cada 3 anos, estará lançando versões semestralmente, atualmente está na versão 14._

### Instalando
Devemos prestar atenção ao instalar o Java, pois existe o Java para:
- Rodar aplicações (JRE - Java Runtime Environment = JVM + Bibliotecas);
- Criar aplicações (JDK - Java Development Kit = JRE + Bibliotecas);

1. Baixaremos a [versão JDK](https://www.oracle.com/java/technologies/javase-downloads.html) que irá vir o JRE junto;
2. Devemos instalar no Path do Windows o caminho do Java;
	* Ir até Sistemas > Configurações avançadas > Variáveis de ambiente >  Adicionar diretório c:/Program Files/Java/Jdk/bin;

## <a name="compilando"></a>Compilando/Rodando primeiro código

Com um bloco de notas, escreva o código base e salve como **_.java_**.

```java
public class OlaMundo {
	public static void main (String[] args){
		System.out.println("Olá mundo");
	}
}
```
Entendendo:
*  Os códigos Java, precisam estar dentro de uma **Classe**;
* O `main`é o código principal, será responsável por identar que é o método que será **executável**;

### Compilando...
Para compilar o código, será utilizado o **Prompt de comando**!
* Dicas de navegabilidade pelo prompt:
	* cd -> volta a pasta inicial;
	* cd . . -> volta uma pasta;
	* dir -> desmontra todos arquivos da pasta;
	* type nomeArquivo -> ira abrir o arquivo e exibir o conteudo;
- A JVM não "entende" códigos .java - ela entende códigos **_.class_** - sendo assim é necessário compilar o arquivo .java com o código `javac nomeArquivo.java`;
- Após gerar o `nomeArquivo.class`, poderemos utilizar o comando `java nomeArquivo` para ver o resultado;