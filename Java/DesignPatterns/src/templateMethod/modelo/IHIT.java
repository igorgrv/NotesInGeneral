package templateMethod.modelo;

import java.util.ArrayList;
import java.util.List;

public class IHIT extends ImpostoTemplate{

	@Override
	public boolean seMaiorTaxacao(Orcamento orcamento) {
		List<String> noOrcamento = new ArrayList<String>();
		for(Item item : orcamento.getItens()) {
	          if(noOrcamento.contains(item.getNome())) 
	        	  return true;
	          else 
	        	  noOrcamento.add(item.getNome());
	        }
		return false;
	}

	@Override
	public double maiorTaxacao(Orcamento orcamento) {
		return orcamento.getValor() * 0.13 + 100;
	}

	@Override
	public double menorTaxacao(Orcamento orcamento) {
		return orcamento.getValor() * (0.01 * orcamento.getItens().size());
	}

}
