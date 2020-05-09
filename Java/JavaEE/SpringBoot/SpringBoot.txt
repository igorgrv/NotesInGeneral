# CRUD - Spring Boot C/ JSP

## Spring Initializer
Atraves do initializer, podemos montar o projeto com as dependencias;<br>
Dependências utilizadas:
* **DevTools** -> faz com que as atualizações sejam automaticas;
	*  **LiveReload** -> faz com que a pagina mesmo se atualize sozinha;
* **Spring JPA** -> Dependencias do JPA, para conexão e gestão do banco de dados;

Para utilizar a JSP é necessário adicionar as dependências abaixo:
```xml
<dependency>
	<groupId>org.apache.tomcat.embed</groupId>
	<artifactId>tomcat-embed-jasper</artifactId>
	<scope>provided</scope>
</dependency>

<dependency>
	<groupId>javax.servlet</groupId>
	<artifactId>jstl</artifactId>
</dependency>
```
Adicionar ao arquivo propetiers
```xml
spring.mvc.view.prefix= /WEB-INF/views/
spring.mvc.view.suffix= .jsp
```

## Configurando JPA - MySQL
```
#Spring
spring.mvc.view.prefix= /WEB-INF/views/
spring.mvc.view.suffix= .jsp

#DataSource
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost/XXXXXXX?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=

#JPA
spring.jpa.hibernate.ddl-auto = update
spring.jpa.properties.hibernate.format_sql = true
spring.jpa.properties.hibernate.show_sql = true
```
### Configurando JPA - H2
```
#DataSource
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.url=jdbc:h2:mem:forum
spring.datasource.username=sa
spring.datasource.password=

#JPA
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto = update
spring.jpa.properties.hibernate.format_sql = true
spring.jpa.properties.hibernate.show_sql = true

#H2
# console.enabled allow us to have a h2 console
# console.path is how we're going to access the h2 interface
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```
* Open the console by: `http://localhost:8080/h2-console`

## INICIO MVC
1. Crie a classe Model (cuidado ao implementar o package, coloque dentro do mesmo package da configuração);
2. Crie a **interface** Repository, que `extends JpaRepository<suaClasse, Long`