package br.com.cognizant.dojoPilha;

import java.util.ArrayList;
import java.util.List;

public class Pilha {
	
	private List<String> pilha = new ArrayList<String>();
	private String [] pilhas;
	
	public void push(String item) {
		pilha.add(item);
	}

	public List<String> getPilha() {
		return pilha;
	}

	public void pop() {
		pilha.remove(pilha.size() -1);
	}

	public boolean isEmpty() {
		if(pilha.size() > 0) {
			return false;
		} else {
			return true;
		}
	}

}
