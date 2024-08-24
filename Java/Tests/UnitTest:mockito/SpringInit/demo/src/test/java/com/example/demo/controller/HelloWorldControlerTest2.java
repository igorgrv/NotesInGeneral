// package com.example.demo.controller;

// import static org.junit.jupiter.api.Assertions.assertEquals;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.http.MediaType;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.RequestBuilder;
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

// @WebMvcTest(HelloWorldController.class)
// public class HelloWorldControlerTest2 {
  
//   @Autowired
//   private MockMvc mockMvc;

//   @Test
//   public void returnHelloWorld() throws Exception {
//     RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/").accept(MediaType.APPLICATION_JSON);
//     String response = mockMvc.perform(requestBuilder)
//         .andReturn().getResponse().getContentAsString();

//         assertEquals("HelloWorld", response);
//   }
// }
