package templateMethod.modelo;

public abstract class ImpostoTemplate implements Imposto {

	@Override
	public double calcula(Orcamento orcamento) {
		if(seMaiorTaxacao(orcamento))
			return maiorTaxacao(orcamento);
		else
			return menorTaxacao(orcamento);
	}
	
	public abstract boolean seMaiorTaxacao (Orcamento orcamento);
	
	public abstract double maiorTaxacao(Orcamento orcamento);
	
	public abstract double menorTaxacao(Orcamento orcamento);
	
}
