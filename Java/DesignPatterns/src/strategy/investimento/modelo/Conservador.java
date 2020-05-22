package strategy.investimento.modelo;

public class Conservador implements Investimento{

	@Override
	public double investe(Investidor investidor) {
		//de 1000 -> 8% retornado = 80
		return investidor.getSaldo() * 0.08;
	}

}
