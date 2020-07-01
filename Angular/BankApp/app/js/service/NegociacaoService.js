System.register(["../models/index"], function (exports_1, context_1) {
    "use strict";
    var index_1, NegociacaoService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            NegociacaoService = class NegociacaoService {
                obterNegociacoes(handler) {
                    return fetch('http://localhost:8080/dados')
                        .then(response => handler(response))
                        .then(response => response.json())
                        .then((dados) => dados
                        .map(dado => new index_1.Negociacao(new Date(), dado.vezes, parseFloat((dado.montante / dado.vezes).toFixed(2)))))
                        .catch(err => console.log(err.message));
                }
            };
            exports_1("NegociacaoService", NegociacaoService);
        }
    };
});
