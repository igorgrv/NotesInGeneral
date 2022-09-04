# Java Async



## CompletableFuture

Métodos:

* `.supplyAsync()`

  * Chama uma thread no background e retorna imediatamente
  * Retorna: `CompletableFuture<T>`

* `.thenAccept()`

  * Espera a chamada terminar para ter o resultado;

  * Recebe um valor da chamada anterior:

    * ```java
      CompletableFuture
        .supplyAsync(() -> myService.call())
        .thenAccept((result) -> sysout(resultOfMyService.call));
      ```

  * Retorna: `CompletableFuture<Void>`;
  * Normalmente utilizado no **final** das chamadas;

* `.join()`

  * Segura a thread `main` até que o processo do CompletableFuture seja concluído

    * Ex.:

      * ```java
        CompletableFuture
          .supplyAsync(() -> myService.call())
          .thenAccept((result) -> sysout(resultOfMyService.call))
          .join();
        ```

* `.thenApply()`

  * Utilizado para **transformar** o dado;

    * ```java
      CompletableFuture
        .supplyAsync(() -> myService.call())
        .thenApply((result) -> result.upperCase())
        .thenAccept((result) -> sysout(resultOfMyService.call))
        .join();
      ```

      