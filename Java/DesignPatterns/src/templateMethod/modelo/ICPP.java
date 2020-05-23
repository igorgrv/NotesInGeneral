package templateMethod.modelo;

public class ICPP extends ImpostoTemplate {


	@Override
	public boolean seMaiorTaxacao(Orcamento orcamento) {
		return orcamento.getValor() > 500;
	}

	@Override
	public double maiorTaxacao(Orcamento orcamento) {
		return orcamento.getValor() * 0.07;
	}

	@Override
	public double menorTaxacao(Orcamento orcamento) {
		return orcamento.getValor() * 0.05;
	}

}
