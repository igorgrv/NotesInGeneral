var expect = require('chai').expect;
const functions = require('../functions/mocha_functions');

describe('Suit de testes', function(){
	it('testando função assincrona', function(done){
		functions.myAsyncFunction(function(str){
			expect(str).to.equal("hello");
			done();
		});
	});
	it('testando com await', async (done) =>{
		var res = await functions.myAsyncFunction(function(){
			expect(str).to.equal("hello");
		});
	});
});