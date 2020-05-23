package chainOfResponsibility.requisicoes.modelo;

public interface Resposta {

	void resposta(Requisicao req, Conta conta);
	void setProximo(Resposta respostaQualquer);
}
