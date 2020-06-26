package br.com.cognizant.dojoPilha;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class PilhaTest {

	@Test
	public void testandoSeFoiInseridoNaPilhaUmElemento() throws Exception {
		Pilha pilha = new Pilha();
		pilha.push("Cognizant");
		assertThat(pilha.getPilha().size(), is(1));
	}
	
	@Test
	public void testandoSeFoiRemovidoDaPilhaUmElemento() throws Exception {
		Pilha pilha = new Pilha();
		pilha.push("Cognizant");
		if(!pilha.isEmpty()) {
			pilha.pop();
		}
		assertThat(pilha.getPilha().size(), is(0));
	}
	
	@Test
	public void testandoSeRestouUmElementoDaPilha() throws Exception {
		Pilha pilha = new Pilha();
		pilha.push("Cognizant");
		pilha.push("Cognizant");
		pilha.pop();
		assertThat(pilha.getPilha().size(), is(1));
	}
	
	@Test
	public void testandoSeAPilhaEstaVazia() throws Exception {
		Pilha pilha = new Pilha();
		assertTrue(pilha.isEmpty());
	}
	
	@Test
	public void testandoSeAPilhaEstaVaziaAoInserirUmElemento() throws Exception {
		Pilha pilha = new Pilha();
		pilha.push("Cognizant");
		assertFalse(pilha.isEmpty());
	}	

}
