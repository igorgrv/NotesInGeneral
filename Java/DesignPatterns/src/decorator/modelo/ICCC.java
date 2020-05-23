package decorator.modelo;

public class ICCC extends Imposto {

	
	public ICCC(Imposto outroImposto) {
		super(outroImposto);
	}
	
	public ICCC() {}

	@Override
	public double calcula(Orcamento orcamento) {
		if (orcamento.getValor() < 1000.00) {
			return orcamento.getValor() * 0.05 + calculaOutroImposto(orcamento);
		} else if (orcamento.getValor() <= 3000.00) {
			return orcamento.getValor() * 0.07 + calculaOutroImposto(orcamento);
		} else {
			return (orcamento.getValor() * 0.08) + 30.00;
		}
	}


}
