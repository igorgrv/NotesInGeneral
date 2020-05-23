package decorator.teste;

import decorator.modelo.ICMS;
import decorator.modelo.ISS;
import decorator.modelo.Imposto;
import decorator.modelo.Orcamento;

public class TestaDecorator {

	public static void main(String[] args) {
		 Imposto impostoComplexo = new ISS(new ICMS());

         Orcamento orcamento = new Orcamento(500.0);

         double valor = impostoComplexo.calcula(orcamento);

         System.out.println(valor);
	}

}
