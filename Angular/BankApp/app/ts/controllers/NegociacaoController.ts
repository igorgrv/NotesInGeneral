import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacao, Negociacoes, NegociacaoAPI } from '../models/index';
import { tempoDeExecucao } from '../helpers/index';
import { NegociacaoService } from '../service/index';

export class NegociacaoController {

    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');
    private _service = new NegociacaoService();

    constructor() {
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._negociacoesView.update(this._negociacoes);
    }

    @tempoDeExecucao()
    adiciona(event: Event) {

        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (!this.ehDiaUtil(data)) {
            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');
    }

    private ehDiaUtil(data: Date): boolean {
        if (data.getDay() == DiaDaSemana.Domingo || data.getDay() == DiaDaSemana.Sabado) {
            return false;
        } else {
            return true;
        };
    }

    importaDados() {
        function isOK(response: Response) {
            if (!response.ok) 
                throw new Error(response.statusText);
            return response;
        }

        this._service.obterNegociacoes(isOK)
            .then((negociacoes: Negociacao[]) => {
                negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
                this._negociacoesView.update(this._negociacoes);
            });
    }
}

enum DiaDaSemana {
    Domingo, //por padrão o Enum entende que se começa com 0
    Segunda, // 1
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado, // 6
}