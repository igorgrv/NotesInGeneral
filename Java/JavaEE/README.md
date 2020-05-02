# O Java EE
O Java EE nada mais é, do que o Java para Web.
# Sumário
1. [Maven](#maven)
	* [Criando um projeto Web](#mavenprojeto)
	* [Pom.xml](#pomxml)
	* [Web.xml](#webxml)
	* [Servidor no Maven](#servidormaven)

# <a name="maven"></a>Maven
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