package strategy.investimento.modelo;

import java.util.Random;

public class Moderado implements Investimento{

	private Random random;
	
	public Moderado() {
        this.random = new Random();
      }
	
	@Override
	public double investe(Investidor investidor) {
		if(random.nextInt(2) == 0) {
			return investidor.getSaldo() * 0.025;
		}else {
			return investidor.getSaldo() * 0.07;
		}
	}
}
