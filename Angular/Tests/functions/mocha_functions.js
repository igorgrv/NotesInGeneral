function myAsyncFunction(callback){
	setTimeout(function(){
		callback("hello");
	},5000);
}

module.exports = {
	myAsyncFunction
}