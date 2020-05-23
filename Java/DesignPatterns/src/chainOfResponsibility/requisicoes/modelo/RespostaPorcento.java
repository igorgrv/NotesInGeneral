package chainOfResponsibility.requisicoes.modelo;

public class RespostaPorcento implements Resposta {


	@Override
	public void resposta(Requisicao req, Conta conta) {
		if (req.getFormato() == Formato.PORCENTO) {
			System.out.println(conta.getTitular() + "%" + conta.getSaldo());
		} else {
			System.out.println("Sem formatos restantes");
		}
	}

	@Override
	public void setProximo(Resposta respostaQualquer) {
	}

}
