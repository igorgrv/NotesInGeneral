package chainOfResponsibility.requisicoes.modelo;

public class RespostaCSV implements Resposta {

	private Resposta respostaQualquer;

	@Override
	public void resposta(Requisicao req, Conta conta) {
		if(req.getFormato() == Formato.CSV) {
			System.out.println(conta.getTitular() + "," + conta.getSaldo());
		} else {
			respostaQualquer.resposta(req, conta);
		}
	}

	@Override
	public void setProximo(Resposta respostaQualquer) {
		this.respostaQualquer = respostaQualquer;
	}

}
