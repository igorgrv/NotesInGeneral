import {Negociacao, NegociacaoAPI } from '../models/index';

export class NegociacaoService {
    
    obterNegociacoes(handler: Function): Promise<void | Negociacao[]> {

        return fetch('http://localhost:8080/dados')
            .then(response => handler(response))
            .then(response => response.json())
            .then((dados: NegociacaoAPI[]) => dados
                .map(dado => new Negociacao(new Date(), dado.vezes, parseFloat((dado.montante / dado.vezes).toFixed(2))))
            )
            .catch(err => console.log(err.message));
    }
}