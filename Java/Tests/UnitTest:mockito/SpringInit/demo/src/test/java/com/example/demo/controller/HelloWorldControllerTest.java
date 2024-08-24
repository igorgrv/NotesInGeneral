// package com.example.demo.controller;

// import static org.mockito.Mockito.when;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// import com.example.demo.entity.Item;
// import com.example.demo.service.HelloWorldService;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.http.MediaType;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.RequestBuilder;
// import org.springframework.test.web.servlet.ResultActions;
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

// @WebMvcTest(HelloWorldController.class)
// public class HelloWorldControllerTest {

//   @Autowired
//   private MockMvc mockMvc;

//   @MockBean
//   private HelloWorldService helloWorldService;

//   @Test
//   public void returnHelloWorld() throws Exception {
//     RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/").accept(MediaType.APPLICATION_JSON);
//     ResultActions response = mockMvc.perform(requestBuilder);

//     response
//         .andExpect(status().isOk())
//         .andExpect(content().string("HelloWorld"))
//         .andReturn();
//   }

//   @Test
//   public void returnDummyItem() throws Exception {
//     RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/dummy-item").accept(MediaType.APPLICATION_JSON);
//     mockMvc.perform(requestBuilder)
//       .andExpect(status().isOk())
//       .andExpect(content().json("{quantity:100,price:10,name:Ball,id:1}"))
//       .andReturn();
//   }

//   @Test
//   public void returnDummyItemService() throws Exception {
    
//     when(helloWorldService.retrieveItem()).thenReturn(new Item(1, "Ball", 10, 100));

//     RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/dummy-item-service").accept(MediaType.APPLICATION_JSON);
//     mockMvc.perform(requestBuilder)
//       .andExpect(status().isOk())
//       .andExpect(content().json("{quantity:100,price:10,name:Ball,id:1}"))
//       .andReturn();
//   }
// }
