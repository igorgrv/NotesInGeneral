package chainOfResponsibility.requisicoes.modelo;

public class RespostaXML implements Resposta{

	private Resposta respostaQualquer;

	public void resposta(Requisicao req, Conta conta) {
		if(req.getFormato() == Formato.XML) {
			System.out.println("<conta><titular>" + conta.getTitular() + "</titular><saldo>" + conta.getSaldo() + "</saldo></conta>");
		} else {
			respostaQualquer.resposta(req, conta);
		}
	}

	@Override
	public void setProximo(Resposta respostaQualquer) {
		this.respostaQualquer = respostaQualquer;
	}
}
