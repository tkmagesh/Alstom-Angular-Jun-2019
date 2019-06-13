(function(){
	function addSync(x,y){
		console.log(`	[@Service] processing ${x} and ${y}`);
		var result = x + y;
		console.log(`	[@Service] returning the result`);
		return result;
	}

	function addSyncClient(x,y){
		console.log(`[@Client] triggering the service`);
		var result = addSync(x,y);
		console.log(`[@Client] result = ${result}`);
	}

	window['addSyncClient'] = addSyncClient

	function addAsyncCallback(x,y, callback){
		console.log(`	[@Service] processing ${x} and ${y}`);
		setTimeout(function(){
			var result = x + y;
			console.log(`	[@Service] returning the result`);
			callback(result);
		},5000);
	}

	function addAsyncCallbackClient(x,y){
		console.log(`[@Client] triggering the service`);
		addAsyncCallback(x,y, function(result){
			console.log(`[@Client] result = ${result}`);
		});
	}

	window['addAsyncCallbackClient'] = addAsyncCallbackClient
})();