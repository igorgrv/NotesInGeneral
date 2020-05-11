
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
3. [JSP](#jsp)
	* [Scriptlet](#scriptlet)
	* [Expressions Language](#el)
	* [JSTL](#jstl)
	* [CRUD - SERVLET](#crudservlet)
4. [JDBC](#jdbc)
	* [Testando Conexão](#testejdbc)
	* [DAO](#dao)
	* [CRUD - DAO](#cruddao)
5. [JPA & Hibernate](#jpa)
	* [Criando projeto](#projetocjpa)
	* [Anotações](#persistence)
	* [Criando uma Entidade](#criandoentidade)
	* [CRUD - JPA](#crudjpa)
	* [Estados da JPA](#estadosjpa)
		 * [Managed](#managed)
		 * [Detached](#detached)
		 * [Removed](#removed)
  * [JPQL](#jpql)
     * [Consulta com critério](#consultacriterio)
     * [Consulta com parâmetros](#consultparametro)
     * [Consulta com JOIN FETCH](#consultajoin)
  * [API Criteria](#apicriteria)
  * [OpenEntityManagerInView](#openentity)
  * [Lock Otimista](#lockotimista)
  * [Cache](#cache)
  * [Hibernate Statistics](#hibernatestat)
6. [Web Services/API](#webservice)

# Maven
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

# <a name="jsp"></a>JSP (Java Server Page)
Desenvolver com servlets, passando o conteúdo HTML utilizando um `PrintWriter` não é uma boa prática, pois imagine criar todo HTML através da Servlet... <br><br>Para trabalhar com requisições, foi criado a **JSP (Java Server Page)** de modo é possível **utilizar códigos HTML & códigos Java** juntos!<br><br>
* A Servlet processa as informações vindas do Request e passa para a JSP via `req.getRequestDispatcher`, que então irá renderiza a página no servidor antes de envia-las via response ao usuário!

	<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/servlet2.PNG?raw=true" width=400>

Para utilizar códigos java dentro de uma JSP, temos algumas opções:
* ScriptLet `<%= %>`;
* JSTL;

## <a name="scriptlet"></a>Scriptlet
O Scriptlet é utilizado para implementar códigos Java, dentro de uma JSP, utilizando `<% %>`  para demarcar início e término do código em Java. Por exemplo:
* A sintaxe `<%=` é equivalente a `<% out.println()` -> PrintWriter
```html
<%
	String scriptlet = "scriptlet na JSP";
%>

<html>
	<body>
		Um exemplo do uso do <%= scriptlet %>
	</body>
</html>
```
Mas como iremos mandar o código da Servlet para a JSP?
1. Iremos informar a Servlet qual a JSP que iremos passar, utilizando o `req.getRequestDispatcher("/suaJsp")`;
2. Com o Dispatcher, iremos informar a JSP o atributo que estamos passando, com o método `setAttribute`;
3. Encaminhar ao servidor com o método `forward` o `req` e `res`;
```java
protected void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
	Empresa empresa = new Empresa();
	String parameter = req.getParameter("nomeEmpresa");
	empresa.setNome(parameter);
	
	RequestDispatcher rd = req.getRequestDispatcher("/empresaJsp.jsp");
	req.setAttribute("empresa", empresa.getNome());
	rd.forward(req, res);
}
```
```html
<%
	String nomeEmpresa = (String) request.getAttribute("empresa");
%>

<html>
<body>
	A empresa cadastrada foi: <%= nomeEmpresa %>
</body>
</html>
```

## <a name="el"></a>Expressions Languages
**EL**  veio para facilitar a integração entre HTML e JAVA, de forma que fique mais simples o código dentro da JSP, utilizando a expressão `${}`.<br>
Exemplo com **Scriptlet**:
```html
<%
	String nomeEmpresa = (String) request.getAttribute("empresa");
%>

<html>
<body>
	A empresa cadastrada foi: <%= nomeEmpresa %>
</body>
</html>
```
Exemplo com **Expression Language**:
```html
<html>
	<body>
		A empresa cadastrada foi: ${empresa}
	</body>
</html>
```
## <a name="jstl"></a>JSTL
A **JavaServer Pages Standard Tag Library _(JSTL)_**, como o nome diz, é uma biblioteca que **em conjunto com a EL**, pode implementar diversos códigos do java, como:
* for;
* forEach;
* if;
* while;
* formatar datas;


#### Como usar JSTL?
1. Será necessário baixar os [.jar](https://mvnrepository.com/artifact/javax.servlet/jstl/1.2)/dependencias para implementa-las;
```xml
<!-- https://mvnrepository.com/artifact/javax.servlet/jstl -->
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>jstl</artifactId>
    <version>1.2</version>
</dependency>
```
2. Para utilizar em uma página JSP, será necessário adicionar um "cabeçalho" antes;
	* jstl/core -> contém as condicionais (for, foreach, if e etc);
	* fmt -> para formatar datas
```java
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
```
#### <a name="foreach"></a>forEach - Listando 
Para exibir uma lista com objetos/dados, podemos utilizar o método `<c:forEach>`, que irá exigir:
* `items="${ }"` -> será o atributo que foi passado pela Servlet;
* `var=""` -> será a varíavel que será chamada dentro da tag `li`

```html
<body>
    Lista de empresas: <br />
    <ul>
        <c:forEach items="${empresas}" var="empresa">
            <li>${empresa.nome }</li>
        </c:forEach>
    </ul>
</body>
```
#### <a name="url"></a> URL <c: url >
O método `<c:url value="" var="">` basicamente carrega o nome do projeto e pode ser utizado na `action`  de um `<form>`!
* Exemplo **form sem JSTL**:
```html
<form action="/gerenciador/novaEmpresa" method="POST">
```
* Exemplo **form com JSTL**:
```html
<form action="<c:url value="/novaEmpresa" />" method="POST">

//ou

<c:url value="/novaEmpresa" var="nova"/>
<form action="${nova}" method="POST">
```
#### <a name="if"></a> If <c: if >
Com JSTL podemos realizar condicionais:
* Preencha como nulo em caso de nenhum nome de empresa for preenchido:
```html
<c:if test="${not empty empresa}">
	A empresa cadastrada foi: ${empresa}
</c:if>

<c:if test="${empty empresa}">
	Nenhuma empresa foi cadastrada :(
</c:if>
```
#### <a name="fmt"></a> formatDate <fmt: formatDate>
Quando extraimos a data direto do Java, vem um monte de código esquisito, para formatar no padrão brasileiro, temos a TAGLIB FMT:
```html
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<fmt:formatDate value="${empresa.dataAbertura}" pattern="dd/MM/yyyy"/>
```
* Para utilizar **_LocalDateTime_** - nova api Java, é necessário fazer um **_parseDate_** e depois utilizar o **_formatDate_**:
	```html
	<fmt:parseDate value="${empresa.dataAbertura}" pattern="yyyy-MM-dd" var="parsedDate"/>
	<td><fmt:formatDate value="${parsedDate}" pattern="dd/MM/yyyy" /></td>
	```
* Para receber uma String e passar para um LocalDate, é necessário utilizar um `DateTimeFormatter`
	```java
	String stringData= "01/04/2020";
	DateTimeFormatter formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy");
	LocalDate dataLocalDate = LocalDate.parse(stringData, formatador);

## <a name="crudservlet"></a>1º modo - JSP + Servlet
### Anotações Servlet
Relembrando alguns métodos:
* `@WebServlet("/novaEmpresa")` -> anotação para invocar a servlet;
* `req.getParameter("nomeEmpresa")` -> responsável por **receber** parametros (via GET ou POST);
* `req.setAttribute("atributoParaJSP", empresa.getNome())` -> responsável por **passar** os atributos para a JSP ter acesso;
* `req.getRequestDispatcher("pagina.jsp")` -> após processar o codigo irá direcionar para a página;
	* Recebe um tipo `RequestDispatcher rd`;
* `rd.forward(req, res)` -> último método, para encaminhar ao servidor toda requisição e resposta;
* `res.sendRedirect("outraServlet")` -> substitui o Dispatcher

### Cadastrando
Para realizar o **cadastro de uma empresa**, precisamos:
1. Modelo: Empresa e Banco (simulará um banco de dados);
2. Formulário JSP (formEmpresa.jsp);
3.  Servlet (empresaServlet);
4. Formulário Retorno do cadastro (empresaCadastrada);

Empresa e Banco
```java
public class Banco {

	private static List<Empresa> empresas = new ArrayList<Empresa>();
	private static int chaveIdSequencial = 1;
	
	public List<Empresa> getEmpresas(){
		return Banco.empresas;
	}

	public void adiciona(Empresa e) {
		e.setId(Banco.chaveIdSequencial++);
		Banco.empresas.add(e);
	}
}

public class Empresa {

	//iremos utilizar métodos da classe wrapper para fazer parse de String
	private Integer id;
	private String nome;
	private LocalDateTime dataAbertura = LocalDateTime.now();
	private LocalDateTime dataCadastro = LocalDateTime.now();
	
	//getters and setters
}
```
formNovaEmpresa.jsp
```html
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:url value="/novaEmpresa" var="nova"/>

<html>
	<body>
		<form action="${nova }" method="POST">
			Nome Empresa: <input type="text" name="nomeEmpresa">
			Nome Abertura: <input type="text" name="dataAbertura">
			<input type="submit" value="Salvar">
		</form>
	</body>
</html>
```
empresaServlet
```java
@WebServlet("/novaEmpresa")
public class cadastraEmpresaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		Empresa empresa = new Empresa();
		
		//Recebendo parâmetro da URI e atribuindo ao nome da Emrpesa
		String nomeEmpresa= req.getParameter("nomeEmpresa");
		empresa.setNome(nomeEmpresa);

		//Inserindo data de abertura
		String parametroDataAbertura = req.getParameter("dataAbertura");
		DateTimeFormatter formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		LocalDate dataAbertura = LocalDate.parse(parametroDataAbertura, formatador);
		empresa.setDataAbertura(dataAbertura);

		//Inserindo data de cadastro do sistema
		LocalDateTime hoje = LocalDateTime.now();
		empresa.setDataCadastro(hoje);

		//Inserindo no banco de dados	
		Banco banco = new Banco();
		banco.adiciona(empresa);
		
		//irá mandar requisição para servlet Lista
		RequestDispatcher rd = req.getRequestDispatcher("/listaEmpresa");
		req.setAttribute("empresa", empresa.getNome());
		rd.forward(req, res);
	}
}
```
#### Redirect - evitando Refresh 
Por enquanto se o usuário apertar F5 e fizer um refresh, a Servlet irá cadastrar novamente os usuários, pois ao realizar o refresh, estamos requisitando que a servlet `/novaEmpresa` seja chamada novamente.
* Para evitar este tipo de problema, precisamos alterar a servlet `/novaEmpresa`, onde inves de enviar um **despachador**, iremos **redirecionar** ao navegador!
	```java
	req.setAttribute("empresa", empresa.getNome());
	
	//sem utilizar /
	res.sendRedirect("listaEmpresasServlet");
			
	//	RequestDispatcher rd = req.getRequestDispatcher("/listaEmpresasServlet");
	//	req.setAttribute("empresa", empresa.getNome());
	//	rd.forward(req, res);
	```
	
### Listando
Para LISTAR as empresas cadastradas, precisamos:
* Passar a lista de empresas com o atributo via método `setAttribute`
* Formulário JSP (listaEmpresa.jsp);

listaEmpresaServlet
```java
@WebServlet("/listaEmpresasServlet")
public class ListaEmpresasServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		Banco banco = new Banco();
		
		List<Empresa> empresas = banco.getEmpresas();
		req.setAttribute("empresas", empresas);
		
		RequestDispatcher rd = req.getRequestDispatcher("listaEmpresa.jsp");
		rd.forward(req, res);
	}
}
```
listaEmpresa.jsp
```html
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
	<body>
		<h2>Lista de empresas: </h2>
			<table border="1">
		<tr>
			<th>Id</th>
			<th>Nome</th>
			<th>Data Abertura</th>
			<th>Data Cadastro</th>
			<th colspan="2">Ações</th>
		</tr>
			<c:forEach items="${empresas}" var="empresa">
				<tr>
					<td>${empresa.id}</td>
					<td>${empresa.nome}</td>

					<fmt:parseDate value="${empresa.dataAbertura}" pattern="yyyy-MM-dd"	var="parsedDateAbertura" />
					<td><fmt:formatDate value="${parsedDateAbertura}" pattern="dd/MM/yyyy" /></td>
					
					<fmt:parseDate value="${empresa.dataCadastro}" pattern="yyyy-MM-dd"	var="parsedDateCadastro" />
					<td><fmt:formatDate value="${parsedDateCadastro}" pattern="dd/MM/yyyy" /></td>
					
					<td>
						<a href="/gerenciador/removeEmpresa?id=${empresa.id}">Remover</a>
					</td>
					<td>
						<a href="/gerenciador/alteraEmpresa?id=${empresa.id}">Alterar</a>
					</td>
				</tr>
			</c:forEach>
	</table>
	</body>
</html>
```

### Removendo

```java
public class Banco {
	public void remove(Integer id) {
			Banco.empresas.removeIf(empresa -> empresa.getId()==id);
		}
}


@WebServlet("/removeEmpresaServlet")
public class RemoveEmpresaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String parameter = req.getParameter("id");
		Integer id = Integer.valueOf(parameter);
		
		Banco banco = new Banco();
		banco.remove(id);
		
		res.sendRedirect("listaEmpresasServlet");
	}

}
```
### Atualizar/Editar
Para atualizar/editar, será **necessário** utilizar **duas Servlets**:
* para chamar o `mostraEmpresaServlet` 
* para atualizar de fato a Empresa -> `atualizarEmpresaServlet`.
	* Necessário, assim como para deletar, passar o id

```html
//listForm
<td>
	<a href="/gerenciador/mostraEmpresaServlet?id=${empresa.id}">Alterar</a>
</td>


//formAtualiza
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<c:url value="/atualizaEmpresa" var="nova"/>

<html>
	<body>
		<form action="${nova}" method="POST">
				<input type="hidden" name="id" value="${empresa.id}">
				Nome Empresa: <input type="text" name="nome" value="${empresa.nome}">
				
				<fmt:parseDate value="${empresa.dataAbertura}" pattern="yyyy-MM-dd"	var="parsedDateAbertura" />
				Data Abertura: <input type="text" name="dataAbertura" value="<fmt:formatDate value="${parsedDateAbertura}" pattern="dd/MM/yyyy" />">
				<input type="submit" value="Salvar">
		</form>
	</body>
</html>
```
```java
//mostraEmpresaServlet
@WebServlet("/mostraEmpresaServlet")
public class MostraEmpresaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String parameter = req.getParameter("id");
		Integer id = Integer.valueOf(parameter);
		
		Banco banco = new Banco();
		Empresa empresa = banco.findById(id);
		
		req.setAttribute("empresa", empresa);
		
		RequestDispatcher rd = req.getRequestDispatcher("/formAtualizaEmpresa.jsp");
		rd.forward(req, res);
	}

}


//AtualizaServlet
@WebServlet("/atualizaEmpresa")
public class AtualizaEmpresa extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		//Coletando o ID
		String parameter = req.getParameter("id");
		Integer id = Integer.valueOf(parameter);
		
		//Atualizando o nome
		String nome = req.getParameter("nome");
		
		//Atualizando data de abertura
		String parametroDataAbertura = req.getParameter("dataAbertura");
		DateTimeFormatter formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		LocalDate dataAbertura = LocalDate.parse(parametroDataAbertura, formatador);
					
		Banco banco = new Banco();
		Empresa empresa = banco.findById(id);
		empresa.setNome(nome);
		empresa.setDataAbertura(dataAbertura);
		
		res.sendRedirect("listaEmpresasServlet");
	}

}
```


# <a name="jdbc"></a>JDBC
O JDBC (**_Java Database Connectivity_**) , veio com o intuito de criar um padrão para os Softwares de Banco de Dados (MySQL, SQL Server e etc), onde este padrão, permitiria que o Desenvolvedor trocasse de DB sem afetar o código.<br>
O JDBC, utiliza uma **_Fábrica de Conexões_**, que necessita de alguns atributos:
- driver(jar ou dependencia); 
- ip;
- porta;
- usuario;
 - senha;

```java
public class ConnectionFactory {

	public Connection getConnection() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			return DriverManager.getConnection("jdbc:mysql://localhost/meuBancoDeDados?useTimezone=true&serverTimezone=UTC&useSSL=false", "root","");
		} catch (SQLException e){		
			throw new RuntimeException(e);
		}
	}
}
```
## <a name="testejdbc"></a>Testando Conexão
Para testar a conexão, basta a partir da nossa `ConnectionFactory` criarmos um objeto do tipo `Connection`.
```java
public class TesteConexao {
	public static void main (String[] args) throws SQLException {
		ConnectionFactory con = new ConnectionFactory();
		Connection conexao = con.getConnection();
		System.out.println("conectado");
		
		conexao.close();
	}
}
```
* Possíveis erros:
	* `MySQLNonTransientConnectionException:` ->  utilizar conector mais novo;
	* `Establishing SSL connection without server's identity` -> Adicione depois do BD -> _useTimezone=true&serverTimezone=UTC&useSSL=false_

## <a name="dao"></a>DAO
O DAO (**_Data Access Object_**) é uma camada de acesso aos dados -_posteriormente substituido por um repositorio_ - que nos permite executar as rotinas no DB, evitando que ocorra códigos repetidos!<br>
Para tarbalharmos _querys_ utilizamos o tipo  `PrepareStatement`, que recebe o tipo `Connection`e uma `String`.

* Exemplo **INSERT** SEM camada DAO:
	```java
	public static void main(String[] args) throws SQLException {
			Connection con = new ConnectionFactory().getConnection();

			String sql = "insert into contatos (nome,email,endereco,dataNascimento) value (?,?,?,?)";
			PreparedStatement stmr = con.prepareStatement(sql);
			stmr.setString(1, "teste");
			stmr.setString(2, "teste");
			stmr.setString(3, "teste");
			stmr.setDate(4, new java.sql.Date(Calendar.getInstance().getTimeInMillis()));
			stmr.execute();

			stmr.close();
			System.out.println("Dados inseridos");

			con.close();
	}
	```
### <a name="cruddao"></a> CRUD -  DAO
```java
public class UsuarioDao {
	private Connection con = new ConnectionFactory().getConnection();
	private PreparedStatement stmt;

	public void adicionar(Usuario usuario) {
		String sql = "INSERT INTO usuarios (nome, matricula, senha, data_cadastro) VALUES (?,?,?,?)";
		try {
			stmt = con.prepareStatement(sql);
			stmt.setString(1, usuario.getNome());
			stmt.setString(2, usuario.getMatricula());
			stmt.setString(3, usuario.getSenha());
			stmt.setDate(4, new java.sql.Date(System.currentTimeMillis()));

			stmt.execute();
			stmt.close();
			con.close();

		} catch (SQLException e) {
			throw new RuntimeException("Erro na insercao " + e);
		}
	}

	public List<Usuario> getLista () {
		List<Usuario> lista = new ArrayList<Usuario>();
		String sql = "SELECT * FROM usuarios";
		try {
			stmt=con.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery();

			while(rs.next()) {
				Usuario u1 = new Usuario();
				u1.setId(rs.getInt("id"));
				u1.setNome(rs.getString("nome"));
				u1.setMatricula(rs.getString("matricula"));
				u1.setData_cadastro(rs.getDate("data_cadastro"));

				lista.add(u1);
			}

			stmt.execute();
			rs.close();
			stmt.close();
			con.close();
		} catch (SQLException e) {
			throw new RuntimeException("Erro no list " + e);
		}

		return lista;
	}

	public void remove (Usuario usuario) {
		String sql = "DELETE FROM usuarios WHERE id = ?";
		try {
			stmt=con.prepareStatement(sql);
			stmt.setInt(1, usuario.getId());
			stmt.execute();

			stmt.close();
			con.close();
		} catch (SQLException e) {
			throw new RuntimeException("Id incorreto " + e);
		}
	}

	public boolean existeUsuario(Usuario usuario) {

		if (usuario == null) {
			throw new IllegalArgumentException("Usuario não deve ser nulo");
		}

		try {
			stmt = con.prepareStatement("select * from usuarios where matricula = ? and senha = ?");
			stmt.setString(1, usuario.getMatricula());
			stmt.setString(2, usuario.getSenha());
			ResultSet rs = stmt.executeQuery();

			boolean encontrado = rs.next();
			rs.close();
			stmt.close();

			return encontrado;
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}

	public Usuario buscaId (int id) {

		try {
			stmt = con.prepareStatement("SELECT * FROM usuarios WHERE id = ?");
			stmt.setInt(1, id);
			ResultSet rs = stmt.executeQuery();

			if(rs.next()) {
				return populaTarefa (rs);
			}			
			rs.close();
			stmt.close();

			return null;
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}

	private Usuario populaTarefa(ResultSet rs) throws SQLException {
		Usuario user = new Usuario();

		// popula o objeto tarefa
		user.setId(rs.getInt("id"));
		user.setNome(rs.getString("nome"));
		user.setMatricula(rs.getString("matricula"));
		user.setSenha(rs.getString("senha"));

		return user;
	}

	public void alteraUser (Usuario usuario) {
		String sql = "UPDATE usuarios SET nome = ?, matricula=?, senha = ? where id = ?";
		try {
			stmt=con.prepareStatement(sql);
			stmt.setString(1, usuario.getNome());
			stmt.setString(2, usuario.getMatricula());
			stmt.setString(3, usuario.getSenha());
			stmt.setInt(4, usuario.getId());

			stmt.execute();
			stmt.close();
			con.close();
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
}
```

# <a name="jpa"></a>JPA & Hibernate
O JPA (**_Java Persistence API_**) é uma **especificação** que veio após o JDBC, de modo que:
* Facilitase o uso de sintaxes do SQL;
* Trabalha com Objetos e não com Relacionamento;
* Cria/Gerencia o Banco de dados;
* Menos verboso;

A implementação mais conhecida é a **Hibernate**;

## <a name="projetocjpa"></a>Criando projeto com JPA
Para facilitar, o projeto será criado com o Maven, utilizando as **dependência do JPA e do MySQL**. Como Banco de Dados, será utilizado o **[MariaDB Server](https://mariadb.com/kb/en/mariadb-server-10-4-12/)**.
```xml
<dependencies>
	<!-- https://mvnrepository.com/artifact/org.hibernate/hibernate-core -->
	<dependency>
		<groupId>org.hibernate</groupId>
		<artifactId>hibernate-core</artifactId>
		<version>5.4.15.Final</version>
	</dependency>
	
	<dependency>
		<groupId>mysql</groupId>
		<artifactId>mysql-connector-java</artifactId>
		<version>8.0.18</version>
	</dependency>
</dependencies>
```
### <a name="persistence"></a>persistence.xml
O JPA recebe sua configuração através de um arquivo xml chamado `persistence.xml`, que deve estar em  **_src/main/resources/META-INF_**. Este arquivo é responsável por mapear:
* driver;
* jdbc;
* usuario;
* senha
* dialeto (mysql);
* show_sql / format_sql -> irá exibir o código SQL;
* hbm2ddl.auto -> responsável por atualizar/criar as tabelas

persistence.xml (sem Spring)
```xml
<persistence xmlns="http://java.sun.com/xml/ns/persistence"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://java.sun.com/xml/ns/persistence http://java.sun.com/xml/ns/persistence/persistence_2_0.xsd"
	version="2.0">

	<persistence-unit name="cursos">
		<provider>org.hibernate.jpa.HibernatePersistenceProvider</provider>
		<class>br.com.igor.jpa.model.Cliente</class>

		<properties>
			<property name="javax.persistence.jdbc.driver" value="com.mysql.jdbc.Driver" />
			<property name="javax.persistence.jdbc.url" value="jdbc:mysql://localhost/igor_jpa?serverTimezone=UTC" />
			<property name="javax.persistence.jdbc.user" value="root" />
			<property name="javax.persistence.jdbc.password" value="root" />

			<property name="hibernate.dialect" value="org.hibernate.dialect.MySQL5InnoDBDialect" />
			<property name="hibernate.show_sql" value="true" />
			<property name="hibernate.format_sql" value="true" />

			<property name="hibernate.hbm2ddl.auto" value="update" />
		</properties>
		
  </persistence-unit>
</persistence>
```

## <a name="persistence"></a> Anotações
O Hibernate utiliza diversas **anotações** para nos ajudar a trabalhar com as tabelas e colunas.<br>

CÓDIGO BASE:
* `@Entity` -> indica o objeto para se tornar persistível (MODELO)
* `@Table(name="tarefas")` -> indica que será a Tabela com nome XXXX
  
P/ COLUNAS:
* `@Id` --> indica que aquele atributo é um ID
	*  `@GeneratedValue` -> serve para deixar o Hibernate responsavel por gerenciar o ID
		*  `GenerationType.AUTO` -> Valor padrão, deixa com o provedor de persistência a escolha da estratégia mais adequada  de acordo com o banco de dados.
		* `GenerationType.IDENTITY` -> Identificador único serão gerados pela coluna de auto incremento do banco de dados.
*  `@Column(name = "nomeDaColuna", nullable = false)` -> irá criar a coluna com este nome;
	* `@Column(nullable = false)` -> Indica que não pode ser nulo
* `@Size(min=10, max=256, message = "Deu ruim")`;

Para LocalDateTime:
* `@DateTimeFormat(pattern="dd/MM/yyyy")`
	* `@Temporal(TemporalType.DATE)`  -> Temporal utilizado para datas / TemporalType indica o tipo de dado
	* `@Temporal(TemporalType.TIME)`  -> TemporalType, retorna o horário

Para Enum:
* `@Enumerated`
	* `@Enumerated(EnumType.STRING)`  ->indica que será retornado os valores da String

P/ RELACIONAMENTOS:
* `@ManyToOne` -> List -> Muitas Movimentações para Uma Conta -> Será criada uma  coluna com **_chave estrangeira_**
* `@OneToMany`
* `@ManyToMany` -> Muitas Movimentações para Muitas Categorias -> _Uma Movimentação pode estar em Muitas Categorias e Uma Categoria pode ter Muitas Movimentações_ -> Quando criada, será criada uma **_tabela relacionamento_**;
	* `@JoinTable(name="NomeDaTabela")`
* `@OneToOne` -> Um Cliente possui Uma Conta -> _Uma Conta só tem Um Cliente_
	* `@JoinColumn(unique=true)` -> faz com que os id pertençam somente ao id da outra tabela

## <a name="criandoentidade"></a> Criando uma Entidade
```java
@Entity
public class Conta {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String titular;
	private Integer agencia, numero;
	private BigDecimal saldo;
	
	//Getters and Setters
}
```

Criando método `main` para que a JPA crie a tabela:
```java
public static void main(String[] args) {
	EntityManagerFactory emf = Persistence.createEntityManagerFactory("conta");
	EntityManager em = emf.createEntityManager();
	
	em.close();
}
```
Para checar se ocorreu, será exibido no console, mas também é possível através do **MySQL Console (MariaDB)**:
```sql
show databases;
use igor_jpa;

show tables;
desc nomeDaTabela; #irá conferir os atributos da tabela

+---------+--------------+------+-----+---------+----------------+
| Field   | Type         | Null | Key | Default | Extra          |
+---------+--------------+------+-----+---------+----------------+
| id      | bigint(20)   | NO   | PRI | NULL    | auto_increment |
| agencia | int(11)      | YES  |     | NULL    |                |
| numero  | int(11)      | YES  |     | NULL    |                |
| titular | varchar(255) | YES  |     | NULL    |                |
+---------+--------------+------+-----+---------+----------------+
```

## <a name="crudjpa"></a> CRUD - JPA
Para realizar a inserção de dados no DB, utilizamos a classe `EntityManager` (que recebe a fabrica de conexão). Onde basicamente temos os métodos abaixo:
- `find` --> pode-se utilizar como WHERE [Tarefa localizaPorId = manager.find(Tarefa.class, 1L)]
 - `remove` --> utilizado como DELETE
 - `merge` --> utilizado como UPDATE
 - `persist` --> utilizado como INSERT [manager.persist(tarefa);]

**PORÉEMMM**... quando queremos realizar operações de **inserção, remoção ou atualização** é necessário utilizar através de uma **transação**, com `.getTransaction().begin();` e  `em.getTransaction().commit();`
* _A transação é um mecanismo para manter a consistência das alterações de estado no banco, visto que todas as operações precisam ser executadas com sucesso, para que a transação seja confirmada._

### Inserindo
```java
public static void main(String[] args) {
	EntityManagerFactory emf = Persistence.createEntityManagerFactory("conta");
	EntityManager em = emf.createEntityManager();
	
	Conta conta = new Conta();
	conta.setAgencia(123);
	conta.setNumero(123456);
	conta.setTitular("igor");
	
	em.getTransaction().begin();
	em.persist(conta);
	em.getTransaction().commit();
	
	em.close();
}
```
### Procurando e Atualizando
Para localizar através do `id` a JPA possui o método `find`, onde não é necessário criar uma `query`:
```java
public static void main(String[] args) {
	EntityManagerFactory emf = Persistence.createEntityManagerFactory("conta");
	EntityManager em = emf.createEntityManager();
	
	Conta conta = em.find(Conta.class, 1L);
	conta.setSaldo(BigDecimal.valueOf(350.00));
	
	em.getTransaction().begin();
	em.merge(conta);
	em.getTransaction().commit();
	
	em.close();
}
```
### Procurando e Removendo
```java
public static void main(String[] args) {
	EntityManagerFactory emf = Persistence.createEntityManagerFactory("conta");
	EntityManager em = emf.createEntityManager();
	
	Conta conta = em.find(Conta.class, 1L);
	
	em.getTransaction().begin();
	em.remove(conta);
	em.getTransaction().commit();
	
	em.close();
}
```
## <a name="estadosjpa"></a>Estados da JPA
### <a name="managed"></a>Managed
Quando o objeto está no estado **_managed_**, significa que poderá sofrer alterações pela JPA, ou seja, está em **sincronização automática** - qualquer tipo de alteração que o objeto tiver, a JPA irá fazer um **update** no banco. <br>
Isto ocorre quando passamos o objeto, através do `EntityManager`, ou seja, enquanto não houver um `close()`, a JPA estará verificando o objeto.

### <a name="detached"></a>Detached
Quando o objeto esteve no estado managed e houve um `close` do `EntityManager`, o objeto passa a ser um objeto **_detached_**, ou seja, a JPA não está mais sincronizando.

### <a name="removed"></a>Removed
O objeto passa a estar no estado **_removed_** quando utilizamos o método `removed(obj)`;

## <a name="jpql"></a>JPQL
O JPQL (**_Java Persistence Query Language_**) é uma linguagem de consultas, enquanto o SQL (**_Structured Query Language_**) é voltado ao relacionamento.<br>

Utilizando o objeto Movimentação como exemplo:
* Exemplo **SQL**:
	```sql
	select * from movimentacao;
	```
* Exemplo **JPQL**:
	```sql
	select mfrom Movimentacao m; //com Objeto
	```
Para que  o JPA entenda a consulta, utilizamos a classe `TypedQuery<?>` que recebe o Objeto da pesquisa:
```java
public static void main(String[] args) {
	EntityManagerFactory emf = Persistence.createEntityManagerFactory("conta");
	EntityManager em = emf.createEntityManager();
	
	String jpql = "select c from Conta c";
	
	TypedQuery<Conta> query = em.createQuery(jpql, Conta.class);
	List<Conta> contas = query.getResultList();
	
	contas.forEach(c -> System.out.println(c.getTitular()));
}

```
### <a name="consultacriterio"></a>Consulta com critério

* Exemplo **SQL**:	
	```sql
	select * from movimentacao where conta_id = 2;
	```

* Exemplo **JPQL**:
	```sql
	select mfrom Movimentacao m where m.conta.id = 2;
	```

### <a name="consultparametro"></a>Consulta com parâmetros
Quando é utilizado parâmetros com JPA, invez de utilizarmos o `(?, ?, ?)`, utilizamos um **_named parameter_** que se torna mais fácil de trabalhar.
```sql
public static void main(String[] args) {
	
	Conta conta = new Conta();
	conta.setId(2L);
	
	String jpql = "SELECT c FROM Conta c WHERE c.id = :pId";
	TypedQuery<Conta> query = em.createQuery(jpql, Conta.class);
	
	//parâmetro
	query.setParameter("pId", conta.getId());
	
	List<Conta> contas = query.getResultList();
	contas.forEach(c -> System.out.println(c.getTitular()));
}
```

### <a name="consultajoin"></a>Consulta com JOIN FETCH
Quando desejamos utilizar como atributo duas tabelas distintas, utilizamos o `join fetch` para que a tabela que realizamos o `fetch` carregue automaticamente os valores!
```sql
public List<Produto> getProdutos(Integer contaId, Integer usuarioId) {

	String jpql = "SELECT c FROM Conta c JOIN FETCH c.Usuario u WHERE c.id = :pContaId AND u.id = :pUsuarioId";
	TypedQuery<Conta> query = em.createQuery(jpql, Conta.class);
	
	//parâmetro
	query.setParameter("pContaId ", contaId);
	query.setParameter("pUsuarioId", usuarioId);
	
	List<Conta> contas = query.getResultList();
	contas.forEach(c -> System.out.println(c.getTitular()));
}
```
**PORÉEEMMMM...** Caso não seja informado um dos `ids` teremos um problema na query, sendo assim, teriamos que realizar **vários ifs** para verificar se foi passado os dois parâmetros, ou um parâmetro, o que seria muito verboso.<br>
Para resolver o problema de termos muitos parâmetros para realizar consulta, foi criada a **_API Criteria_**!

## <a name="apicriteria"></a> API Criteria
Conforme explicado a cima, a `CriteriaQuery` é muito utilizada quando temos **+1 parâmetro** a ser computador na consulta SQL.
1. Para criar uma query do tipo `CriteriaQuery`, iremos utilizar o `EntityManager` passando o método `getCriteriaBuilder()` que irá retornar um tipo `CriteriaBuilder`
	*  _Este Builder, possui diversos outros métodos adicionais do SQL, como_ `equals(), like();` 
2. O tipo `CriteriaQuery<?>` precisa receber a Classe que será feito o `FROM` e para instanciar esta Classe, iremos utilizar o `.class` no `createQuery`;
3. Com o `CriteriaQuery` criado, podemos utilizar os métodos: `from() | get() | join()`;
4. A partir do método `from()`, recebemos a Interface `Root<?>`, onde poderemos traçar o caminho dos atributos!
	* Para traçar o caminho, utilizamos o método `get("nomeColuna")`, que irá retornar um `path` e como estamos passando uma String, devemos colocar dentro do `<>`;
5. Ao final, devemos adicionar a cláusula `WHERE`, que receberá o um Array de `Predicate`;

### Consulta simples com criteria
```java
public List<Produto> getProdutos(String nome, Integer categoriaId, Integer lojaId) {
	CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
	CriteriaQuery<Produto> query = criteriaBuilder.createQuery(Produto.class);
	
	Root<Produto> from = query.from(Produto.class);
	Path<String> nomePath = from.<String>get("nome");
	Path<Integer> categoriaPath = from.join("categorias").<Integer>get("id");
	Path<Integer> lojaPath = from.<Loja>get("loja").<Integer>get("id");
	
	List<Predicate> predicates = new ArrayList<Predicate>();
	
	if(!nome.isEmpty()) {
		Predicate like = criteriaBuilder.like(nomePath, nome);
		predicates.add(like);
	}
	if(!nome.isEmpty()) {
		Predicate categoriaEqual = criteriaBuilder.equal(categoriaPath, categoriaId);
		predicates.add(categoriaEqual);
	}
	if(!nome.isEmpty()) {
		Predicate lojaEqual = criteriaBuilder.equal(lojaPath, lojaId);
		predicates.add(lojaEqual);
	}
	
	query.where((Predicate[])predicates.toArray(new Predicate[0]));
	
	TypedQuery<Produto> typedQuery = em.createQuery(query);
	return typedQuery.getResultList();
}
```
## <a name="openentity"></a> OpenEntityManagerInView
Por padrão, o Spring ao abrir um `EntityManager` ele fechará após a execução.
* Exemplo: quando utilizamos o método `find()` o Spring, irá fazer a consulta no DB e então irá fechar o `EntityManager` automaticamente.

O problema em fechar o `EntityManager` automáticamente, é quando temos na JSP, uma consulta que irá necessitar que o `EntityManager` continue aberto.
* Exemplo: Temos uma página que possui a opção de Filmes, onde cada Filme, possui uma categoria (Ação, Ficção e etc). Ao editarmos o Filme, o `EntityManager` irá fazer um `findById()` e após ter encontrado irá encerrar-lo. Mas e as categorias???? Irá gerar um erro, pois não foram carregadas.

Para corrigir este tipo de problema, o Spring possui o `OpenEntityManagerInView` que pode ser configurado dentro da classe `Configurador extends WebMvcConfigurerAdapter`, que ser feito através de um `InterceptorRegistry`
```java
@Bean
	public OpenEntityManagerInViewInterceptor getOpenEntityManagerInViewInterceptor() {
		return new OpenEntityManagerInViewInterceptor();
	}
	
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addWebRequestInterceptor(getOpenEntityManagerInViewInterceptor());
	}
```

## <a name="lockotimista"></a> Lock Otimista
Imaginemos um cenário, onde dois analistas estão editando um livro (alterando o título, preço e etc). O que vai acontecer quando um dos analistas alterar o preço e salvar, enquanto o outro estiver alterando o título? **PROBLEMA!** pois a aplicação irá entender o último registro feito, ou seja, se o último foi feito a alteração do título (com o preço antigo), será gravada todas informações do formulário do analista que estava trocando o preço!
* Para resolver este problema, o Spring possui uma anotação chamada `@Version`, onde basta que seja adicionada a Classe, que ele irá gerenciar e evitar este tipo de erro:

```java
public class Produto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Version
	private int versao;

	//Getters and Setters
}
```

## <a name="cache"></a> Cache
Para evitar diversos `SELECT`na aplicação, podemos utilizar o Cache, de forma que a JPA irá primeiro verificar no Cache se ja foi feito a consulta, caso contrário, será feito um único `SELECT` .
* O cache serve para melhorar a perfomance da aplicação!

Para configurar o Cache, iremos precisar inserir novas propriedades a **_configuração do JPA_**:
Via xml:
```xml
<property name="hibernate.cache.use_second_level_cache" value="true" />
<property name="hibernate.cache.use_query_cache" value="true" />
<property name="hibernate.cache.use_second_level_cache" value="org.hibernate.cache.ehcache.SingletonEhCacheRegionFactory" />
```
Via Java: 
`.setProperty("hibernate.cache.use_second_level_cache", "true");`
`
.setProperty("hibernate.cache.region.factory_class","org.hibernate.cache.ehcache.SingletonEhCacheRegionFactory");`
`.setProperty("hibernate.cache.use_query_cache", "true");`

```java
@Bean
	public LocalContainerEntityManagerFactoryBean getEntityManagerFactory(DataSource dataSource) {
		LocalContainerEntityManagerFactoryBean entityManagerFactory = new LocalContainerEntityManagerFactoryBean();

		entityManagerFactory.setPackagesToScan("br.com.igor");
		entityManagerFactory.setDataSource(dataSource);

		entityManagerFactory
				.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

		Properties props = new Properties();

		props.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL5InnoDBDialect");
		props.setProperty("hibernate.show_sql", "true");
		props.setProperty("hibernate.hbm2ddl.auto", "create-drop");

		//Cache
		props.setProperty("hibernate.cache.use_second_level_cache", "true");
		props.setProperty("hibernate.cache.region.factory_class", "org.hibernate.cache.ehcache.SingletonEhCacheRegionFactory");
		props.setProperty("hibernate.cache.use_query_cache", "true");


		entityManagerFactory.setJpaProperties(props);
		return entityManagerFactory;
	}


```
Desta forma, já está habilitado o Cache ao JPA, agora iremos colocar a anotação `@Cache(usage = ....)` cada as Classes que queremos que seja armazenado no cache as consultas:
```java
@Entity
@Cache(usage=CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Produto {
    // Conteúdo da classe
}
```
### Cache nas Querys
Indo na classe DAO/Repository, iremos adicionar na `TypedQuery` o código abaixo:
```java
TypedQuery<Produto> typedQuery = em.createQuery(query.where(conjuncao));
typedQuery.setHint("org.hibernate.cacheable", "true");

return typedQuery.getResultList();
```

## <a name="hibernatestat"></a> Hibernate Statistics
O Hibernate Statistics nos permite acompanhar a quantidade de consultas (**_miss_**) que foram feitas e também a quantidade de **_hits_** (cache). Basta que:
* Seja incluído dentro da classe `Configurador`:
	```java
	@Bean
	public Statistics statistics(EntityManagerFactory emf) { 
	    return emf.unwrap(SessionFactory.class).getStatistics();
	}
	```
* Seja adicionado as propriedades da JPA
	```java
	Bean
	public LocalContainerEntityManagerFactoryBean getEntityManagerFactory(DataSource dataSource) {
	    ...    
	    props.setProperty("hibernate.generate_statistics", "true");
	    ...
	}
	```
* Adicionar a JSP:
	```html
	<tr>
	    <td>Cache</td>
	    <!-- Hit -->
	    <td></td>
	    <!-- Miss -->
	    <td></td>
	    <! -- Conections -->
	    <td></td>
	</tr>
	<tr>
	    <td>Cache</td>
	    <!-- Hit -->
	    <td>${statistics.queryCacheHitCount}</td>
	    <!-- Miss -->
	    <td>${statistics.queryCacheMissCount}</td>
	</tr>
	```




## <a name="crudjpa"></a> CRUD - JPA
Para realizar a inserção de dados no DB, utilizamos a classe `EntityManager` (que recebe a fabrica de conexão). Onde basicamente temos os métodos abaixo:
- `find` --> pode-se utilizar como WHERE [Tarefa localizaPorId = manager.find(Tarefa.class, 1L)]
 - `remove` --> utilizado como DELETE
 - `merge` --> utilizado como UPDATE
 - `persist` --> utilizado como INSERT [manager.persist(tarefa);]

**PORÉEMMM**... quando queremos realizar operações de **inserção, remoção ou atualização** é necessário utilizar através de uma **transação**, com `.getTransaction().begin();` e  `em.getTransaction().commit();`
* _A transação é um mecanismo para manter a consistência das alterações de estado no banco, visto que todas as operações precisam ser executadas com sucesso, para que a transação seja confirmada._

### Inserindo
```java
public static void main(String[] args) {
	EntityManagerFactory emf = Persistence.createEntityManagerFactory("conta");
	EntityManager em = emf.createEntityManager();
	
	Conta conta = new Conta();
	conta.setAgencia(123);
	conta.setNumero(123456);
	conta.setTitular("igor");
	
	em.getTransaction().begin();
	em.persist(conta);
	em.getTransaction().commit();
	
	em.close();
}
```
### Procurando e Atualizando
Para localizar através do `id` a JPA possui o método `find`, onde não é necessário criar uma `query`:
```java
public static void main(String[] args) {
	EntityManagerFactory emf = Persistence.createEntityManagerFactory("conta");
	EntityManager em = emf.createEntityManager();
	
	Conta conta = em.find(Conta.class, 1L);
	conta.setSaldo(BigDecimal.valueOf(350.00));
	
	em.getTransaction().begin();
	em.merge(conta);
	em.getTransaction().commit();
	
	em.close();
}
```
### Procurando e Removendo
```java
public static void main(String[] args) {
	EntityManagerFactory emf = Persistence.createEntityManagerFactory("conta");
	EntityManager em = emf.createEntityManager();
	
	Conta conta = em.find(Conta.class, 1L);
	
	em.getTransaction().begin();
	em.remove(conta);
	em.getTransaction().commit();
	
	em.close();
}
```
## <a name="estadosjpa"></a>Estados da JPA
### <a name="managed"></a>Managed
Quando o objeto está no estado **_managed_**, significa que poderá sofrer alterações pela JPA, ou seja, está em **sincronização automática** - qualquer tipo de alteração que o objeto tiver, a JPA irá fazer um **update** no banco. <br>
Isto ocorre quando passamos o objeto, através do `EntityManager`, ou seja, enquanto não houver um `close()`, a JPA estará verificando o objeto.

### <a name="detached"></a>Detached
Quando o objeto esteve no estado managed e houve um `close` do `EntityManager`, o objeto passa a ser um objeto **_detached_**, ou seja, a JPA não está mais sincronizando.

### <a name="removed"></a>Removed
O objeto passa a estar no estado **_removed_** quando utilizamos o método `removed(obj)`;

## <a name="jpql"></a>JPQL
O JPQL (**_Java Persistence Query Language_**) é uma linguagem de consultas, enquanto o SQL (**_Structured Query Language_**) é voltado ao relacionamento.<br>

Utilizando o objeto Movimentação como exemplo:
* Exemplo **SQL**:
	```sql
	select * from movimentacao;
	```
* Exemplo **JPQL**:
	```sql
	select mfrom Movimentacao m; //com Objeto
	```
Para que  o JPA entenda a consulta, utilizamos a classe `TypedQuery<?>` que recebe o Objeto da pesquisa:
```java
public static void main(String[] args) {
	EntityManagerFactory emf = Persistence.createEntityManagerFactory("conta");
	EntityManager em = emf.createEntityManager();
	
	String jpql = "select c from Conta c";
	
	TypedQuery<Conta> query = em.createQuery(jpql, Conta.class);
	List<Conta> contas = query.getResultList();
	
	contas.forEach(c -> System.out.println(c.getTitular()));
}

```
### <a name="consultacriterio"></a>Consulta com critério

* Exemplo **SQL**:	
	```sql
	select * from movimentacao where conta_id = 2;
	```

* Exemplo **JPQL**:
	```sql
	select mfrom Movimentacao m where m.conta.id = 2;
	```

### <a name="consultparametro"></a>Consulta com parâmetros
Quando é utilizado parâmetros com JPA, invez de utilizarmos o `(?, ?, ?)`, utilizamos um **_named parameter_** que se torna mais fácil de trabalhar.
```sql
public static void main(String[] args) {
	
	Conta conta = new Conta();
	conta.setId(2L);
	
	String jpql = "SELECT c FROM Conta c WHERE c.id = :pId";
	TypedQuery<Conta> query = em.createQuery(jpql, Conta.class);
	
	//parâmetro
	query.setParameter("pId", conta.getId());
	
	List<Conta> contas = query.getResultList();
	contas.forEach(c -> System.out.println(c.getTitular()));
}
```


# <a name="webservice"></a>Web Services/API
Em uma aplicação comum, a conversa entre o **_Request e Response_** é feito para o **navegador**, mas e se queremos utilizar, por exemplo, um celular? Televisão? Jogo? <br>
Invés de sempre devolvermos um HTML, podemos mandar **somente os dados** de uma maneira **diferente**, por exemplo, através protocolo HTTP, utilizando:
* json;
* xml;

Para trabalharmos com json ou xml, o java possui bibliotecas:
* GSON: [gson-2.8.5.jar.zip](https://caelum-online-public.s3.amazonaws.com/1001-servlets-parte2/06/gson-2.8.5.jar.zip);
	```xml
	<dependency>
	  <groupId>com.google.code.gson</groupId>
	  <artifactId>gson</artifactId>
	  <version>2.8.6</version>
	</dependency>
	```
* XStream: [xstream-1.4.10-jars.zip](https://caelum-online-public.s3.amazonaws.com/1001-servlets-parte2/06/xstream-1.4.10-jars.zip)

E a tal API (**_Application Programming Interface_**)?
* Grandes provedores de Web Services, possuem **vários serviços** com várias funcionalidades, e precisamos saber:
	* Qual o endereço?
	* Qual o método HTTP?
	* Qual o formato (json ou xml)?
	* Qual os parâmetros a serem enviados?
* Tudo acima, faz parte da definição de uma **API DE SERVIÇO**!

**_"No contexto de _Web Service_, a API define a interface das funcionalidades que o serviço oferece"_**

## <a name="json"></a>Json
Para retornarmos um json, podemos utilizar a biblioteca **gson**, que através de um `List`, podemos transforma-lo no formato .json!
```java
@WebServlet("/jsonServlet")
public class JsonServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		List<Empresa> empresas = new Banco().getEmpresas();
		
		Gson gson = new Gson();
		String json = gson.toJson(empresas);
		
		res.setContentType("application/json");
		res.getWriter().print(json);		
	}

}
```
	
```json
[{"id":1,"nome":"Igor","dataCadastro":{"date":{"year":2020,"month":5,"day":9},"time":{"hour":1,"minute":3,"second":37,"nano":79212300}},"dataAbertura":{"year":2020,"month":4,"day":1}}]
```