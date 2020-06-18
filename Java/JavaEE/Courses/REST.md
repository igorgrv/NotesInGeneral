# JAVA WEB SERVICES - REST & SOAP

Course - [JavaWebServices - Udemy](https://cognizant.udemy.com/course/java-web-services/).

* _To skip the SOAP - skip the section 4 till 7 and section 9 till 16;_

## What is a Webservice?

A Web Service is a network communication between a client and an application, through the HTTP protocol. They exchange messages or data, such as .XML or .json.

## Types of Webservices
SOAP and REST.

* SOAP, use XML and HTTP POST to exchange the message with the client. JAX-WS is the Java API for XML based webservices.
* RESTFul, use all the HTTP Protocols and support .XML, .JSON and others. JAX-RS is the Java API for restful webservices.

## What are the benefits of a web service?

* Interoperability: works in different platforms/languages and in different S.O. (Windows or Linux);
* Loosely Coupled (fracamente acoplada): we can use one application today or consume one webservice today and tomorrow it's possible to change it easily;
* Extensibility;
* Mashups (misturar);

## APACHE CXF 
It is a web service engine, which provides us various tools to build and run web services. The Apache CXG comes with the engine for both types of web services, soap, and rest.

### How does it work?
JSON -> REST ENGINE (Apache CXF) ->  Java Object -> JAX-RS
<br>
and then the JAX-RS makes the reverse way;

### How to use it?

Using the spring boot, we only need to add the depency:

```xml
cfx-spring-boot-strater-jaxrs
```

and, into the `application.properties`:

```
cxf.jaxrs.component-scan=true

//to configure the path
server.context-path=/restws
```

# REST

REST stands for Representational State Transfer. <br><br>As explained above, the browser that we are accessing the notes is acting as a **web service consumer**. The WebSite acts as a **provider** and shows the content back to the browser. This communication is made by HTTP protocol.<br>

### The Principles of an RESTful service

Four different operation:

* CREATE | POST METHOD -> `localhost/patients` _using a .json file to send the POST_
* READ / GET METHOD -> `localhost/patients/123` _to GET the second id_
* UPDATE / PUT METHOD -> `localhost/patients` _using a .json file to send the PUT_
* DELETE / DELETE METHOD -> `localhost/patients/123` _to DELETE the second id_

### Multiple Formats

With REST we can **conseme and produce**, different types of formats, such as:

* XML;
* .json;
* text (name=igor);

### When to use it?

To use REST, we need:

* Well defined contract.
  * The provider and client have a mutual understanding of the contract, that is, they know HOW the data will be exchanged and WHAT data;
  * This is why in REST we used to have a lot of documentions;
* Multiple data formats;
* Caching;

### Steps

* Create the Spring Boot Project;
* Create the Beans;
* Create the Endpoints;
* Mark them with Annotations;
* Configure;