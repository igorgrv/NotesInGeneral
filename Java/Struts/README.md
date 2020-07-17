# Struts

## O que é o Struts?

* É um framework assim como o Spring, usado para implementar JAVA EE;
* Implementa o MVC;

## Funcionamento

![struts](https://netbeans.org/images_www/articles/72/web/struts/workflow.png)

o Funcionamento das requisições no struts é bem parecida com a de uma servlet:

* Client faz uma requisição -> Esta requisição passar por uma `Servlet` (definida no `web.xml`)-> A `Servlet` irá verificar a requisição e então irá acionar uma `action` (definida no `struts-config.xml`) -> a `action` irá acionar uma `.jsp`



## Getting Started

Para este projeto, iremos utilizar o **Maven**, sendo assim iremos:

1. Criar o `Maven Project` -> Seleciona padrão .web;

2. Criar a pasta “Java” em `src/main`;

3. Adicionar as dependências e `build` abaixo, no `pom.xml`:

   ```xml
   <properties>
   		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   		<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
   		<java.version>1.8</java.version>
   
   		<struts2.version>2.5.14.1</struts2.version>
   		<log4j2.version>2.10.0</log4j2.version>
   	</properties>
   
   	<dependencyManagement>
   		<dependencies>
   			<dependency>
   				<groupId>org.apache.struts</groupId>
   				<artifactId>struts2-bom</artifactId>
   				<version>${struts2.version}</version>
   				<type>pom</type>
   				<scope>import</scope>
   			</dependency>
   			<dependency>
   				<groupId>org.apache.logging.log4j</groupId>
   				<artifactId>log4j-bom</artifactId>
   				<version>${log4j2.version}</version>
   				<scope>import</scope>
   				<type>pom</type>
   			</dependency>
   		</dependencies>
   	</dependencyManagement>
   
   	<dependencies>
   		<!-- Struts 2 -->
   		<dependency>
   			<groupId>org.apache.struts</groupId>
   			<artifactId>struts2-core</artifactId>
   		</dependency>
   
   		<dependency>
   			<groupId>org.apache.logging.log4j</groupId>
   			<artifactId>log4j-core</artifactId>
   		</dependency>
   	</dependencies>
   
   	<build>
           <!-- Nome do Projeto -->
   		<finalName>struts-igor</finalName>
   		<plugins>
               
               <plugin>
                   <groupId>org.apache.maven.plugins</groupId>
                   <artifactId>maven-compiler-plugin</artifactId>
                   <configuration>
                       <source>1.8</source>
                       <target>1.8</target>
                   </configuration>
               </plugin>
               
   			<plugin>
   				<groupId>org.eclipse.jetty</groupId>
   				<artifactId>jetty-maven-plugin</artifactId>
   				<version>9.4.7.v20170914</version>
   				<configuration>
   					<webApp>
   						<contextPath>/${project.build.finalName}</contextPath>
   					</webApp>
   					<stopKey>CTRL+C</stopKey>
   					<stopPort>8999</stopPort>
   					<scanIntervalSeconds>10</scanIntervalSeconds>
   					<scanTargets>
   						<scanTarget>src/main/webapp/WEB-INF/web.xml</scanTarget>
   					</scanTargets>
   				</configuration>
   			</plugin>
   		</plugins>
   	</build>
   ```

4. Adicionar no `web.xml`:

   ```xml
   <welcome-file-list>
       <welcome-file>index</welcome-file>
   </welcome-file-list>
   
   
   <filter>
       <filter-name>struts2</filter-name>
       <filter-class>
           org.apache.struts2.dispatcher.filter.StrutsPrepareAndExecuteFilter
       </filter-class>
   </filter>
   
   <filter-mapping>
       <filter-name>struts2</filter-name>
       <url-pattern>/*</url-pattern>
   </filter-mapping>
   ```

5. Em `src/main/resouce` criar o arquivo `log4j2.xml`:

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <Configuration>
       <Appenders>
           <Console name="STDOUT" target="SYSTEM_OUT">
               <PatternLayout pattern="%d %-5p [%t] %C{2} (%F:%L) - %m%n"/>
           </Console>
       </Appenders>
       <Loggers>
           <Logger name="com.opensymphony.xwork2" level="debug"/>
           <Logger name="org.apache.struts2" level="debug"/>
           <Root level="warn">
               <AppenderRef ref="STDOUT"/>
           </Root>
       </Loggers>
   </Configuration>
   ```

6. Criar o arquivo `struts.xml` dentro de `src` com o layout abaixo:
   1. Todo arquivo `struts` irá necessitar do cabeçalho abaixo:

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE struts PUBLIC
       "-//Apache Software Foundation//DTD Struts Configuration 2.5//EN"
       "http://struts.apache.org/dtds/struts-2.5.dtd">
   ```

   2. Dentro do arquivo, teremos a TAG principal `struts` que irá conter alguns elementos como o:

      1. `package` que é utilizado para agrupar `Actions`;
         1. Dentro de `package` teremos a `action`, que conterá a URL que queremos acessar, bem como qual a Classe que ela irá buscar;
            1. Dentro de `action` teremos `result` que receberá o `return` da `testAction` e irá direcionar a `.jsp` a ser utilizada;

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE struts PUBLIC
       "-//Apache Software Foundation//DTD Struts Configuration 2.5//EN"
       "http://struts.apache.org/dtds/struts-2.5.dtd">
       
   <struts>
   	<package name="test" extends="struts-default">
   		<action name="testAction" class="TestAction">
   			<result name="sucess">/sucess.jsp</result>
   			<result name="erro">/erro.jsp</result>
   		</action>
   	</package>
   </struts>
   ```




Para que esse `struts.xml` funcione, iremos precisar que a classe `TestAction` exista, com o método `execute()`, pois caso contrário não será possível invocar o método;

* Devemos prestar atenção ao `return` no método, pois nosso `struts.xml` aguarda receber um `sucess`, caso contrário não chamará a .jsp;

```java
public class TestAction {

	public String execute () {
		System.out.println("Action acionada com sucesso");
		return "sucess";
	}
}
```



## Enviando Dados

### Action para JSP

Vamos passar uma `mensagem` para a JSP, onde através da `.JSP` abaixo seja exibida a mensagem **“Da Actions para JSP”**:

1. Vamos adicionar a mensagem na `TestAction`:

   ```java
   public class TestAction {
   
   	private String mensagem;
   	
   	public String execute () {
   		System.out.println("Action acionada com sucesso");
   		this.mensagem = "Passando uma mensagem da Action para JSP";
   		return "sucess";
   	}
   
   	public String getMensagem() {
   		return mensagem;
   	}
   
   	public void setMensagem(String mensagem) {
   		this.mensagem = mensagem;
   	}
   }
   ```

2. Adicionar a TAG `<%@ taglib prefix="s" uri="/struts-tags"%>` teremos acesso as propriedades do `struts` e uma que vamos utilizar vai ser a `<s:property />` que através do `value` irá buscar o `getMessagem`;

   ```html
   <!DOCTYPE html>
   <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
   <%@ taglib prefix="s" uri="/struts-tags"%>
   
   <html>
     <head>
       <meta charset="UTF-8">
       <title>Basic Struts 2 Application - Welcome</title>
     </head>
     <body>
       <h1>Access completed To Struts 2!</h1>
       <h2><s:property value="mensagem"/></h2>
     </body>
   </html>
   ```



### JSP para Action

Da `.jsp` podemos considerar um `<form>` com alguns `<input>` que irão ser encaminhados para nossa classe `TestAction`.

* Envie a mensagem escrita de um `TextBox` para a `TestAction`:

  1. Iremos criar uma página de formulário, chamada `MessagemForm.jsp`:

     1. Utilizando a biblioteca do `struts`, teremos acesso aos componentes:
        1. `<s:form>` -> se atentar ao campo `action`;
        2. `<s:textfield>` -> se atentar ao campo `name`;

     ```html
     <body>
     	<s:form action="testAction">
     		<s:textfield label="Mensagem" name="mensagem"></s:textfield>
     		<s:submit value="Salvar"></s:submit>
     	</s:form>
     </body>
     ```

  2. Para pegar esta mensagem iremos atribuir um `setInputMensagem` para que o formulário funcione:

     ```java
     public class TestAction {
     
     	private String mensagem;
     	
     	public String execute () {
     		System.out.println("Action acionada com sucesso");
     		System.out.println("Mensagem do Input: " + this.mensagem);
     		return "sucess";
     	}
     
     
     	public void setInputMensagem(String inputMensagem) {
     		this.mensagem = inputMensagem;
     	}
     
     	public String getInputMensagem() {
     		return mensagem;
     	}
     }
     ```



## Validações com Struts

O **Struts** possui uma classe que nos permite implementar validações, chamada `ActionSupport`, que possui um método chamado `validate()`, com um atributo, chamado `addFieldError` que o `struts` automaticamente irá atribuir a ao `name` dos `<inputs>`:

1. Na classe `RegistraUsuario`, vamos extender de `ActionSupport`;

2. Vamos fazer as validações com um `if` simples, que irá adicionar o método `addFieldError`;

   ```java
   public class RegistraUsuario extends ActionSupport{
   	public void validate() {
   		if(firstName.equals("")) addFieldError("firstName", "First name is required");
   		if(lastName.equals("")) addFieldError("firstName", "Last name is required");
   		if(age == null) addFieldError("age", "Age is required");
   		if(email.equals("")) addFieldError("firstName", "Email is required");
   		if(gender == null) addFieldError("firstName", "Gender is required");
   	}
   }
   ```

3. Precisamos informar ao `struts.xml` que caso dê erro nos `inputs` a página deve ser retornada a mesma do formulário:

   ```xml
   <package name="registroUsuario" extends="struts-default">
       	<action name="registraUsuario" class="RegistraUsuario">
       		<result name="sucesso">/sucesso.jsp</result>
       		<result name="input">/usuarioForm.jsp</result>
       	</action>
   ```



Outro modo de fazer validações é através de um arquivo `xml`, onde iremos seguir a convenção de colocar o `NomeDaClasse-validation.xml`.

1. Dentro do `RegistraUsuario-validation.xml` iremos adicionar as TAGS abaixo, que irão fazer as validações e exibir a mensagem que desejamos:

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE struts PUBLIC
       "-//Apache Software Foundation//DTD Struts Configuration 2.5//EN"
       "http://struts.apache.org/dtds/struts-2.5.dtd">
   
   <validators>
   	<validator type="requiredstring">
       	<param name="fieldName">firstName</param>
           <message>First Name is Required</message>
       </validator>
       
       <validator type="int">
       	<param name="fieldName">age</param>
           <message>Age must be written by numbers</message>
       </validator>
   </validators>
   ```

   

## TAGs

Utilizando a `taglib uri="/struts-tags"`  percebemos que nos possibilitar usar uma série de elementos do `struts`, como:

* `<s:textfield name="" label=""/>` -> que funciona como um `TextBox`;

* `<s:radio list="{ 'oi', 'tchau'}"/>` -> que funciona como um `RadioButton`;

* ```html
  <s:select 
      multiple="true" list="{'red','blue'}" headerKey="none" 
      headerValue="Selecione suas cores" />
  ```

  * `<s:select>` -> funciona como um `DropDownList`

* `<s:property value="fieldName"/>` -> que utilizamos para passar dados da `Action` para `.jsp`;

* `<s:form action="suaAction"/>` -> utilizado para se comunicar com a `Action`;

* `<s:reset value="Reset">` -> nos permite resetar todo o campo do formulário;



### Lista de Dados para JSP

Invés de passarmos no `<s:select list="{'x', 'y', 'z'}"/>`  uma lista de dados, podemos fazer assim como no **Spring** e **encapsular a lista em uma variável**, desta forma passamos somente a lista para a JSP!

1. Dentro da classe `RegistraUsuario` iremos criar dua variáveis:

   1. Uma que será responsável por popular a lista de cores;
   2. Uma para o `select`

   ```java
   public class RegistraUsuario extends ActionSupport {
       private String color;
       private List<String> colors;
    
       public String initializeFormFilds() {
   		initializeColors();
   		return "input";
   	}
   
   	public void initializeColors() {
   		this.colors = new ArrayList<String>();
   		this.colors.add("red");
   		this.colors.add("blue");
   		this.colors.add("green");
   	}
       
       //Getters and Setters
   }
   ```

2. A idéia vai ser inicializar o `Form` com as cores populadas, para isso precisamos informar ao `struts.xml` o que fazer:

   ```xml
   <package name="registroUsuario" extends="struts-default">
       	<action name="registraUsuario" class="RegistraUsuario">
       		<result name="sucesso">/sucesso.jsp</result>
       		<result name="input">/usuarioForm.jsp</result>
       	</action>
       	<action name="formLoadAction" method="initializeFormFilds" class="RegistraUsuario">
       		<result name="input">/usuarioForm.jsp</result>
       	</action>
       </package>
   ```

3. E para passar ao `list` da TAG `<s:select />` basta passarmos a variável `colors`:

   ```html
   <s:select list="colors" name="color" multiple="true" 
             headerKey="Select your favorite color" headerValue="none">
   </s:select>
   ```

   

## CRUD

Para criar o CRUD, teremos basicamente a estrutura de pastas abaixo:

```
|- Action
|--- DeleteACtion
|--- UpdateACtion
|--- AddACtion
|--- WelcomeACtion

|- Dao
|--- LoginDao
|--- ProdutoDao

|- Util
|--- ConnectionFactory

|- Model
|--- User
|--- Product
```

Será utilizado uma conexão **JDBC** com o MySQL, onde o nome será: **dbProductManagement**;

* Conterá as tabelas:
  * user;
    * `userName:String`;
    * `password:String`;
  * product;
    * `productId:Integer`;
    * `productName:String`;
    * `productCategory:String`;
    * `productPrice:Double`;

### Conexão JDBC

A classe `ConnectionFactory`, terá o método `getConnection()`, conforme abaixo:

```java
public class ConnectionFactory {

	public Connection getConnection() {
		
		Connection con = null;
		
		try {
			Class.forName("com.mysql.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://localhost/dbproductmanagement?useTimezone=true&serverTimezone=UTC&useSSL=false", "root","igor123");
		} catch (Exception e){			
			e.printStackTrace();
		}
		return con;
	}
}
```

Será necessário baixar o `.jar` do **Mysql Connection**;

### Model

Teremos duas entidades:

* User;
* Product;

```java
public class User {

	private String userName;
	private String password;

	public User() {	}
	
	public User(String userName, String password) {
		super();
		this.userName = userName;
		this.password = password;
	}
    
    //Getter and Setter
}

//--------------------------------------------------------
public class Product {

	private String productId;
	private String productName;
	private String productCategory;
	private Integer productPrice;

	public Product() {	}

	public Product(String productName, String productCategory, Integer productPrice) {
		this.productName = productName;
		this.productCategory = productCategory;
		this.productPrice = productPrice;
	}
    
    //Getter and Setter
}
```

### Validando Login

#### Dao

```java
public class UserDao {
	
	public static boolean isUserValid(User userDetails) {
		
		boolean validStatus = false;
		try {
			Connection conn = ConnectionFactory.getConnection();
			Statement st = conn.createStatement();
			ResultSet rs = st.executeQuery("SELECT * FROM user WHERE userName = '" + userDetails.getUserName()
					+ "' AND password = '" + userDetails.getPassword() + "'");
			while (rs.next()) {
				validStatus = true;
			}

			conn.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return validStatus;
	}
}
```

#### Action

Para fazer a Action, a ideia vai ser verificar com o método `isUserValid` se o usuário existe, se existir a Action retorna `sucess` se não existir, retorna a própria página;

```java
public class LoginAction extends ActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	String userName;
	String password;

	public String execute() {
		String statusCode = "";
		System.out.println("execute() method called");
		
		boolean isUserValid = UserDao.isUserValid(new User(userName, password));
		if (isUserValid) {
			statusCode = "success";
		} else {
			statusCode = "input";
		}
		return statusCode;
	}
    
    //Getters and Setters
}
```

#### View

Teremos duas `views` , uma de Login e uma de Bem-vindo, sempre utilizando a tag do struts:

```html
<!-- login.jsp -->
<%@ taglib prefix="s" uri="/struts-tags" %> 
<html>
    <body>
        <div align="center">
            <h2>Login</h2>
            <s:form action="loginAction" class="loginForm">
                <s:textfield name="userName" label="User Name" class="formTextField" />
                <s:password name="password" label="Password" class="formTextField" />
                <s:submit value="Login" class="actionBtn" />
            </s:form>
        </div>
    </body>
</html>

<!-- welcome.jsp -->
<html>
    <body>

        <div align="center">
            <h2>Welcome</h2>
        </div>

	</body>
</html>
```



#### struts.xml

Como mapeamos, temos que:

1. Criar o `package` que extende de `struts-default`;
2. Criar a `action` que receberá o `submit` do `form`, onde se o retorno for `sucess` iremos chamar a `welcomeAction` que irá chamar então a página `welcome.jsp`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE struts PUBLIC
    "-//Apache Software Foundation//DTD Struts Configuration 2.5//EN"
    "http://struts.apache.org/dtds/struts-2.5.dtd">

<struts>

	<constant name="struts.devMode" value="true" />

	<package name="productManagementApp" extends="struts-default">
		<action name="loginAction" class="com.struts.igor.action.LoginAction">
			<result name="success" type="redirect">welcomeAction</result>
			<result name="input">/login.jsp</result>
		</action>
		<action name="welcomeAction" class="com.struts.igor.action.WelcomeAction">
			<result name="success">/welcome.jsp</result>
			<result name="error">/error.jsp</result>
		</action>
	</package>

</struts>
```



### Read - Populando Produtos

Para popular os produtos na tela `welcome` teremos que usar um `iterator` que funciona como um `for`, desta forma poderemos exibir a lista de produtos!

#### View

Iremos setar que vamos receber a lista de produtos, com o parâmetro `products`:

```html
<!-- welcome.jsp -->
<table width="750" class="productTable" align="center">
    <thead>  
        <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Product Price</th>
            <th colspan="2">Actions</th>
        </tr>
    </thead>

    <s:iterator value="products" var="product">
        <tr>
            <td>
                <s:property value="#product.productId"/>
            </td>
            <td>
                <s:property value="#product.productName"/>
            </td>
            <td>
                <s:property value="#product.productCategory"/>
            </td>
            <td>
                <s:property value="#product.productPrice"/>
            </td>
            <td>
                <a
                   href="">
                    <button class="actionBtn">Update</button>
                </a> 
            </td>
            <td>
                <a href="">
                    <button class="actionBtn">Delete</button>
                </a>
            </td>
        </tr>
    </s:iterator>

</table>
```

#### Action 

Como precisamos popular os dados na `welcome.jsp`, no método `execute()` teremos que mandar carregar a lista de produtos, proveniente do `ProductDao`, que será criado posteriormente:

```java
public class WelcomeAction extends ActionSupport{
	
	private List<Product> products;
	
	public void initializeProducts() {
		products = ProductDao.getAllProducts(); 
	}
	
	@Override
	public String execute() {
		System.out.println("WELCOME execute() method called");
		initializeProducts();
		return "success";
	}
    
    //Get and Set products
}
```

#### Dao

```java
public class ProductDao {
	
	private static Connection conn = ConnectionFactory.getConnection();
	private static PreparedStatement stmt;
	
	public static List<Product> getAllProducts(){
		
		List<Product> productList = new ArrayList<Product>();
		String sql = "SELECT * FROM product";
		
		try {
			
			stmt = conn.prepareStatement(sql);
			ResultSet rs= stmt.executeQuery();
			while(rs.next())
			{
				Product product = new Product();
				product.setProductId(rs.getString("productId"));
				product.setProductName(rs.getString("productName"));
				product.setProductCategory(rs.getString("productCategory"));
				product.setProductPrice(rs.getInt("productPrice"));
				
				productList.add(product);
			}
			
			stmt.execute();
			rs.close();
			stmt.close();
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return productList;
	}
}
```



### Create - Adicionando Produtos

Para adicionar, iremos precisar:

1. Criar um método `addProduct` na camada DAO;
2. Criar uma `view` para um novo `form`;
3. Criar a `action` para o `form`;
4. Instruir os direcionamentos do `struts` pelo `struts.xml`;



#### View

```html
<%@ taglib prefix="s" uri="/struts-tags" %>    
<html>
	<body>
		<div align="center">
			<h2>Add New Product</h2>
			<s:form action="addAction" class="formTable">
				<s:textfield name="productName" label="Product Name" class="formTextField"/>
				<s:textfield name="productCategory" label="Product Category" class="formTextField"/>
				<s:textfield name="productPrice" label="Product Price" class="formTextField"/>
				<s:submit value="Add Product" class="actionBtn"/>
			</s:form>
		</div>
	</body>
</html>
```

#### Action

```java
public class AddAction extends ActionSupport {

	private String productId;
	private String productName;
	private String productCategory;
	private Integer productPrice;

	public String execute() {
		String statusCode = "";

		Product product = new Product(productName, productCategory, productPrice);
		int recordedProduct = ProductDao.addProduct(product);
		if (recordedProduct == 1) {
			statusCode = "success";
		} else {
			statusCode = "error";
		}
		return statusCode;
	}
    
    //Getters and Setters
}
```

#### Dao

```java
public class ProductDao {
	
	private static Connection conn = ConnectionFactory.getConnection();
	private static PreparedStatement stmt;
	
	public static int addProduct(Product product){
		int status = 0;
        String sql = "INSERT INTO product (productName,productCategory,productPrice) VALUES(?,?,?)"
		try	{
			PreparedStatement stmt= conn.prepareStatement(sql);
			stmt.setString(1, product.getProductName());
			stmt.setString(2, product.getProductCategory());
			stmt.setInt(3, product.getProductPrice());
			status = stmt.executeUpdate();
			
            stmt.close();
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return status;
	}
}
```

#### struts.xml

```xml
<action name="addAction" class="com.struts.igor.action.AddAction">
    <result name="success" type="redirect">welcomeAction</result>
    <result name="error" >/addProduct.jsp</result>
</action>
```

### Delete - Deletando Produtos

O detalhe em `deleteProduct` será no `<button>` da `welcome.jsp`, pois iremos passar dentro de `<a href=''>` a `action` com o `productId`;

#### View

```html
<td>
    <a href="deleteAction?productId=<s:property value="#product.productId"/>">
        <button class="actionBtn">Delete</button>
    </a>
</td>
```

#### Action

```java
public class DeleteAction extends ActionSupport{

	private String productId;
	
	public String execute() {
		String statusCode = "";
		System.out.println("Delete execute() method called");
		System.out.println("Product Id = "+productId);
		int recordUpdated = ProductDao.deleteProduct(productId);
		if (recordUpdated == 1) {
			statusCode = "success";
		} else {
			statusCode = "error";
		}
		return statusCode;
	}
}
```

#### Dao

```java
public static int deleteProduct(String productId) {
    int status = 0;
    try{
        stmt = conn.prepareStatement("DELETE FROM product where productId = ?");
        stmt.setString(1, productId);
        status = stmt.executeUpdate();

        stmt.close();
    } catch(Exception e) {
        e.printStackTrace();
    }
    return status;
}
```

#### struts.xml

```xml
<action name="deleteAction" class="com.struts.igor.action.DeleteAction">
    <result name="success" type="redirect">welcomeAction</result>
    <result name="error">/error.jsp</result>
</action>
```



### Update - Atualizando Produtos

Para o `update` teremos que ter duas `actions`:

* `UpdateDataAction` -> que irá popular os dados no `updateProduct.jsp`;
* `updateAction` -> que irá executar o método de atualizar;

#### View

```html
<!-- welcome.jsp -->
<td>
    <a
       href="updateDataAction?productId=<s:property value="#product.productId"/>">
        <button class="actionBtn">Update</button>
    </a> 
</td>

<!-- updateProduct.jsp -->
<body>

	<div align="center">
		<h2>Update Product</h2>
		<s:form action="updateAction" class="formTable">
			<s:textfield name="productId" label="Product Id" class="formTextField" readonly="true"/>
			<s:textfield name="productName" label="Product Name" class="formTextField"/>
			<s:textfield name="productCategory" label="Product Category" class="formTextField"/>
			<s:textfield name="productPrice" label="Product Price" class="formTextField"/>
			<s:submit value="Update Product" class="actionBtn"/>
		</s:form>
	</div>

</body>
```

#### Action

```java
public class UpdateDataAction extends ActionSupport{

	String productId;
	String productName;
	String productCategory;
	Integer productPrice;
	
	public String execute() {
		System.out.println("execute() method called");
		Product product = ProductDao.getProductById(productId);
		productId = product.getProductId();
		productName = product.getProductName();
		productCategory = product.getProductCategory();
		productPrice = product.getProductPrice();
		return "success";
	}
    
    //Getters and Setters
}



public class UpdateAction extends ActionSupport{

	String productId;
	String productName;
	String productCategory;
	Integer productPrice;
	
	public String execute() {
		String statusCode = "";
		System.out.println("execute() method called");
		Product product = new Product(productId, productName, productCategory, productPrice);
		int recordUpdated = ProductDao.updateProduct(product);
		if (recordUpdated == 1) {
			statusCode = "success";
		} else {
			statusCode = "error";
		}
		return statusCode;
	}
    
    //Getters and Setters
}
```

#### Dao

Para o `update` precisaremos pegar o `ProductById` de forma que seja possível exibir no formulário e também precisaremos do método de atualizar em si:

```java
public static int updateProduct(Product product)
{
    int status = 0;
    String sql = "UPDATE product SET productName=?, productCategory=?, productPrice=? WHERE productId=?";
    try	{
        stmt = conn.prepareStatement(sql);
        stmt.setString(1, product.getProductName());
        stmt.setString(2, product.getProductCategory());
        stmt.setInt(3, product.getProductPrice());
        stmt.setString(4, product.getProductId());
        status = stmt.executeUpdate();
        System.out.println(status);
        System.out.println(stmt);
    }
    catch(Exception e){
        e.printStackTrace();
    }
    return status;
}

public static Product getProductById(String productId)
{
    Product product = null;
    try
    {
        stmt = conn.prepareStatement("SELECT * FROM product WHERE productId = ?");
        stmt.setString(1, productId);
        ResultSet rs = stmt.executeQuery();

        if(rs.next()) {
            product = populaTarefa(rs);
        }

    } catch(Exception e) {
        e.printStackTrace();
    }

    return product;
}

private static Product  populaTarefa(ResultSet rs) throws SQLException {
    Product product = new Product();

    // popula o objeto produto
    product.setProductId(rs.getString("productId"));
    product.setProductName(rs.getString("productName"));
    product.setProductCategory(rs.getString("productCategory"));
    product.setProductPrice(rs.getInt("productPrice"));

    return product;
}
```

#### struts.xml

```xml
<action name="updateDataAction" class="com.struts.igor.action.UpdateDataAction">
    <result name="success">/updateProduct.jsp</result>
    <result name="error">/error.jsp</result>
</action>
<action name="updateAction" class="com.struts.igor.action.UpdateAction">
    <result name="success" type="redirect">welcomeAction</result>
    <result name="error">/error.jsp</result>
</action>
```



## Intereceptors/Session

Com o Login feito, ainda não implementamos nenhuma lógica que “barra” o usuário de entrar na `welcome.jsp`, para isto precisaremos:

* Adicionar a dependência abaixo:

  ```xml
  <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>4.0.1</version>
      <scope>provided</scope>
  </dependency>
  ```

* Setar uma `session`, dentro de `LoginAction`;
* Implementar o `LogOutAction`, que irá dar um `invalidate()` na `session`;
* Criar um `LoginInterceptor`;



### Criando uma Sessão

Para criar uma sessão, basta implementarmos na classe `LoginAction`,dentro do método `execute()`,o comando abaixo. Este comando irá gravar na sessão o atributo `loggedUser` com o `userName` registrado no login:

```java
public String execute() {
		String statusCode = "";
		System.out.println("execute() method called");
		ServletActionContext.getRequest().getSession().setAttribute("loggedUser", userName);
```



### LogOutAction

Devemos ter a possibilitar de ‘deletar’ a sessão registrada, para isso, iremos criar a classe `LogOutAction`, onde dentro do `execute()` teremos que usar o `invalidate()`;

```java
public class LogOutAction extends ActionSupport {

	public String execute() {
		ServletActionContext.getRequest().getSession().invalidate();
		return "input";
	}
}
```

#### struts.xml

Precisamos mapear essa `action` no `struts.xml` para informa-lo o que fazer;

```xml
<action name="logOutAction" class="com.struts.igor.action.LogOutAction">
    <result name="input">/login.jsp</result>
</action>
```

### LoginInterceptor

Parar criar o interceptor, precisaremos:

1. Criar o pacote, `interceptor`;
2. Criar a classe `LoginInterceptor` que irá implementar `Interceptor` -> esta interface irá implementar outros métodos;
3. Dentro de `intercept` irá ficar nossa lógica de verificação se o parâmetro `loggedUser` está na sessão;

```java
public class LoginInterceptor implements Interceptor {

	@Override
	public void destroy() {
		System.out.println("destroy() called");
	}

	@Override
	public void init() {
		System.out.println("init() called");
	}

	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		Object user = ServletActionContext.getRequest().getSession().getAttribute("loggedUser");
		if(user== null){
			if(invocation.getAction().getClass().equals(LoginAction.class)) {
				return invocation.invoke();
			}
			return "input";
		}
		return invocation.invoke();
	}

}
```

#### struts.xml

Iremos adicionar no `struts.xml` a tag `<interceptor>` que será responsável por verificar cada requisição:

```xml
<package name="productManagementApp" extends="struts-default">
		<interceptors>
			<interceptor class="com.struts.igor.interceptor.LoginInterceptor"
				name="loginInterceptor" />
			<interceptor-stack name="loginStack">
				<interceptor-ref name="loginInterceptor" />
				<interceptor-ref name="defaultStack" />
			</interceptor-stack>
		</interceptors>
		<default-interceptor-ref name="loginStack" />
```

#### View

Para que a gente “barre” o acesso de quem não tem o `loggedUser`, iremos criar o `header` e adicionar em cada página com o `<%@ include file="header.jsp" %>`

```html
<body>
    <%
        if(session.getAttribute("loggedUser") == null) {
        	response.sendRedirect("login.jsp");
        }
    %>

    <div class="topnav">
    <a href="welcomeAction">Home</a>
    <a href="addProduct.jsp">Add Product</a>
    <a href="logoutAction" style="float:right">Logout</a>
    </div> 

</body>
```

