package decorator.modelo;

public abstract class Imposto {
	
	private Imposto outroImposto;
	public Imposto(Imposto outroImposto) {
		this.outroImposto = outroImposto;
	}
	
	public Imposto() {
		this.outroImposto = null;
	}
	
	public abstract double calcula(Orcamento orcamento);
	
	public double calculaOutroImposto(Orcamento orcamento) {
		return (outroImposto == null ? 0 : this.outroImposto.calcula(orcamento));
	}
}
