package strategy.investimento.modelo;

public class Investidor {

	private String titular;
	private double saldo;

	public Investidor(String titular, double saldo) {
		this.titular = titular;
		this.saldo = saldo;
	}
	
	public void deposita(double valor) {
		this.saldo += valor;
	}

	public String getTitular() {
		return titular;
	}

	public double getSaldo() {
		return saldo;
	}

}
