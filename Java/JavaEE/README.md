# O Java EE
O Java EE nada mais é, do que o Java para Web.
# Sumário
1. [Maven](#maven)
	* [Criando um projeto Web](#mavenprojeto)
	* [Pom.xml](#pomxml)
	* [Web.xml](#webxml)
	* [Servidor no Maven](#servidormaven)
2. [Servlet](#servlet)
	* [Tomcat](#tomcat)
	* [Dynamic Web Project](#dynamic)
	* [Criando Servlet](#criandoservlet)
	* [GET / POST](#getpost)
	* [doPost & doGet](#dopost)

### O que faz o Maven?
* Build mais simples;
* Servidor gerado através do próprio maven;
* Gerencia o projeto;
* Gerencia .jars/dependencias;

Além, do Maven, existe outro gerenciador de projetos, chamado **GRADLE**, feito para projetos **GROOVY** e também para projetos Java;

### Download/Install
Para [baixar o maven](https://maven.apache.org/download.cgi), devemos utilizar a versão `bin.zip` (por utilizar o Windows). Mas o que fazemos com o .zip?
1. Descompacte o zip em uma pasta - sugestão: junto com o jdk;
2. Vá em Sistemas > Config. avançada do sistema > Variáveis de ambiente > Adicione as variáveis;
3. Crie as variáveis:
	* M3 -> coloque o caminho `apache-maven-3.6.3-bin\apache-maven-3.6.3\bin`;
	* M3_HOME -> coloque o caminho `apache-maven-3.6.3-bin\apache-maven-3.6.3`
4. No Path, adicione a variável `%M3%`;
5. Abra o terminal e teste com `mvn --help`, deve aparecer dados do Maven;

### Gerando .jar com Maven
Para gerar um `.jar` é necessário:
1. Acessar via terminal, o diretório do projeto
2. Executar a linha de comando `mvn package`
3. Será gerado um .jar na pasta **target**;

### Adicionando .jar
Toda configuração relacionada ao maven, estará no arquivo **_pom.xml_**. Este arquivo é responsável por declarar o ArtifactID, GroupId, versão e por **adicionar** as dependencias/.jar!<br><br> 
**Mas onde encontrar as dependencias?** O maven possui um repositório, chamado [mvnrepository](https://mvnrepository.com/).
* Com o jar selecionado no mvnRepository, basta copiar o código entre `<dependency>` e `</dependency>` e colar no pom.xml

### Fases do Maven
O maven possui diversas fases, seguindo:
1. `mvn package` -> irá criar o .jar
2. `mvn install` -> instala o .jar no repositorio local
3. `mvn deploy` -> irá fazer um deploy no servidor

## <a name="mavenprojeto"></a>Criando um projeto Web
Para criar um projeto Maven, alguns critérios são requisitados. como:
* **Artifact ID**-> é o nome do projeto;
* **Group ID** -> é o caminho (_br.com.igor.projeto_)

Para criar no Eclipse, basta ir em:
* **File > New > Other > Maven Project > Next > Selecionar Artifact Id Web-app > Next > Preencher o Artifact Id e Group ID**;

Maven irá baixar diversos plugins e então será gerado um projeto Web!

* Neste tipo de projeto, a pasta `src/main/java` não é criada, portanto **É NECESSÁRIO CRIA-LA** ;
## <a name="pomxml"></a>Pom.xml
O Pom.xml é o **arquivo** de configuração **do Maven** e nele será atribuido as dependências.
* Quando iniciamos um projeto, haverá um erro na página .jsp, **por estar faltando a dependencia Servlet**, sendo assim, temos que adicionar o código abaixo:
```xml
<dependencies>
	<dependency>
		<groupId>javax.servlet</groupId>
		<artifactId>javax.servlet-api</artifactId>
		<version>4.0.1</version>
		<scope>provided</scope>
	</dependency>
</dependencies>
```
Além de adicionar a Servlet, precisaremos configurar o arquivo **web.xml** 
## <a name="webxml"></a>Web.xml
Para que o projeto se torne Web, iremos precisar:
1. Adicionar **_(Caso não exista)_** dentro da pasta **src > main** a pasta **_webapp > WEB-INF_**
2. Criar um arquivo web.xml dentro desta pasta;
3. Adicionar ao web o código abaixo:
```xml
<web-app version="4.0"
	xmlns="http://xmlns.jcp.org/xml/ns/javaee"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee 
   http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd">
		<display-name>nomeProjeto</display-name>
		
		<welcome-file-list>
			<welcome-file>index.html</welcome-file>
			<welcome-file>index.htm</welcome-file>
			<welcome-file>index.jsp</welcome-file>
			<welcome-file>default.html</welcome-file>
			<welcome-file>default.htm</welcome-file>
			<welcome-file>default.jsp</welcome-file>
		</welcome-file-list>

		//Exemplo em caso de erro
		<error-page>
			<error-code>404</error-code>
			<location>/views/index.jsp</location>
		</error-page>
		
		//Para configurar sessão
		<session-config>
			<session-timeout>2</session-timeout>
		</session-config>
		
		//código SPRING por exemplo

</web-app>
```
4. Para utilizar o Spring, será adicionado:
```xml
<servlet>
	<servlet-name>springmvc</servlet-name>
	<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
	<init-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>/WEB-INF/spring-context.xml</param-value>
	</init-param>
	<load-on-startup>1</load-on-startup>
</servlet>

<servlet-mapping>
	<servlet-name>springmvc</servlet-name>
	<url-pattern>/</url-pattern>
</servlet-mapping>
```

## <a name="servidormaven"></a> Servidor no Maven
Temos três conhecidos servidores containers:
* Tomcat;
* Jetty;
* JBoss;

Para adicionar o Jetty, teremos de adicionar a dependencia do jetty ao `pom.xml`:
```xml
  <build>
    <finalName>primeiroMaven</finalName>
	    <plugins>
			<plugin>
				<groupId>org.eclipse.jetty</groupId>
				<artifactId>jetty-maven-plugin</artifactId>
				<version>9.4.28.v20200408</version>
				<configuration>
					<scanIntervalSeconds>10</scanIntervalSeconds>
				</configuration>
			</plugin>
		</plugins>
  </build>
</project>
```
Após adicionar o plugin, o maven irá baixar diversas coisas.
### Como iniciar o servidor no Eclipse?
Para iniciar o servidor pelo Eclipse, basta ir em:
* Run as > Maven build... > Em goals colocar: `clean package jetty:run` > em workspace selecionar o projeto > Apply > Run

### Como iniciar o servidor no Terminal?
Para iniciar o servidor pelo Terminal, basta:
1. Abrir o terminal
2. Selecionar o diretório do projeto
3. Digitar `mvn jetty:run`

### Entendendo as pastas do projeto

<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/mavenfolder.png?raw=true" width=600 >

# <a name="servlet"></a>Servlet
Para iniciar um projeto com Servlet, iriamos começar com a instalação de um servidor **Apache Tomcat**.

### Mas o que é a Servlet?
A Servlet é um objeto que fica **dentro do tomcat**, onde pela tradução do nome, é um _Servidorzinho_, utilizada para **páginas dinâmicas**.
* Através da `URI` do navegador, podemos fazer um **request** ao objeto Servlet, que irá executar determinado código e devolver através de um **response** as informações!

<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/servlet1.PNG?raw=true" width="600">

## <a name="tomcat"></a>Tomcat
Para baixar, basta baixar o .zip no site do [Tomcat](https://tomcat.apache.org/download-90.cgi) e depois extrai-lo.
### Como startar um servidor com Eclipse?
1. Dentro do Eclipse, abra a  aba **"Servers"**;
2. Clique em "Click to create a new server...";
3. Selecione a pasta Tomcat > Tomcat 9 > selecione o local onde foi extraido o Tomcat > finish;
4. Para testar, veja se foi criada a pasta "Servers" 
5. Clique em "Start the Server" (Ctrl + alt + R) e para Pausar (Ctrl + alt + S)
6. Irá gerar um monte de códigos no console em vermelho, onde a última mensagem deve ser: `INFO: Server startup in [457] milliseconds`
7. Acesse o endereço `localhost:8080`

### Para que serve o tomcat?
O Tomcat, será responsável por:
* Entender o Protocolo HTTP (Protocolo da WEB);
* Gerar HTML como **resposta**;

## <a name="dynamic"></a>Dynamic Web Project
Apesar do Maven, proporcionar todo um gerenciamento do projeto, podemos nós mesmos gerenciar o projeto através do **_Dynamic Web Project_**, como cria-lo?
1. Dentro do Eclipse, vamos em File > New > Other > Dynamic Web Project;
2. Colocaremos um nome ao projeto;
3. Eclipse ja entenderá que temos um servidor apache (Tomcat) > Next > Next;
4. Flegar o "generate web.xml" > desta forma será criado nosso `web.xml` > Finish;
5. Adicione o Projeto ao Tomcat (basta arrastar o projeto para o servidor);
6. Crie um arquivo `.html` dentro da pasta `WebContent` e acesse através `localhost:8080/nomeProjeto/seu.html`

**POSSÍVEIS ERROS**: ao criar o projeto, pode ser apresentado _"erro de incompatibilidade com Java Facets"_, isto se deve a versão do Tomcat vs Versão do JDK. Para ajustar, basta:
*  Selecionar o projeto > Properties > Java Facets > Altere a versão para 12;

### Entendendo as pastas do projeto (com spring)
Os arquivos .html que não seguem o modelo MVC, devem ficar na pasta `WebContent`.<br>
<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/dynamicfolder.png?raw=true" width="600">

## <a name="criandoservlet"></a>Criando Servlet
Como sabemos, a Servlet nada mais é do que uma classe Java que será criada um objeto através do Tomcat. Para cria-la:
1. Crie um package **_br.com.gerenciador.servlet_**;
2. Crie a classe **_HelloServlet_** que irá extender `HttpServlet`;
3. A classe Servlet, possui um método chamado `service` que irá ter como atributos um `request` e um `response`!
4. Para que a servlet seja "chamada" pelo navegador, precisamos passar um caminho, através da anotação `@WebServlet(urlPatterns = "/hello")`;
5. Para passar algo visível ao navegador, iremos através do `response` passar uma estrutura HTML, utilizando o método `resp.getWriter();`
6. Acesse através do navegador `http://localhost:8080/gerenciador/hello`
```java
@WebServlet(urlPatterns = "/hello")
public class HelloServlet extends HttpServlet{

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		PrintWriter out = resp.getWriter();
		out.println("<html>");
        out.println("<body>");
        out.println("Parabéns, você escreveu sua primeira servlet");
        out.println("</body>");
        out.println("</html>");
	}
}
```

## <a name="getpost"></a>GET / POST
* **GET:** basicamente é um protocolo enviado através da URI;
* **POST:** irá na requisição "escondida";

### Requisição via GET
Para receber parâmetros que vieram via `URI`, temos o nosso protoco `request`, que recebe as requisições e o método `getParameter()` que recebe o parâmetro da requisição!
* Para passar o parâmetro na `URI`, devemos seguir o padrão HTTP - passando após o nome da requisição Servlet (`nomaEmpresa`) um `?`  e o nome do atributo `nome`
	 * `http://localhost:8080/gerenciador/novaEmpresa?nome=IgorLTDA`

```java
@WebServlet("/novaEmpresa")
public class NovaEmpresa extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String parameter = req.getParameter("nome");
		PrintWriter writer = res.getWriter();
		writer.println("<html><body>O nome da empresa cadastrada foi: " + parameter + "</body></html>");
	}
}
```
* Caso seja necessário mais parâemtros, devemos atribuir ao caracter `&outroParametro=XXXX`

### Requisição via POST
Para realizar via POST, precisaremos de um formulário HTML!
1. No formulário, iremos criar um `form` que receberá dois atributos:
	* `action=""` -> deve ser o caminho completo da Servlet;
	* `method=""` -> é o tipo de requisição HTTP (GET ou POST);
2. O `name` do input, deve ser igual ao `req.getParameter` para que a servlet saiba receber corretamente os dados!
```html
<html>
	<body>
		<form action="/gerenciador/novaEmpresa" method="POST">
			Nome Empresa: <input type="text" name="nomeEmpresa">
			<input type="submit" value="Salvar">
		</form>
	</body>
</html>
```
## <a name="dopost"></a>doPost & doGet
Basicamente, quando utilizamos o método `service` da Servlet, podemos atribuir métodos GET e POST, porém e se quisermos impedir que naquela URL seja acessado o método GET por exemplo?
* `doPost` -> só lida com métodos POST;
* `doGet` -> só lida com métodos GET;
