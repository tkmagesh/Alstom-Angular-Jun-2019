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

	window['addSyncClient'] = addSyncClient;

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

	window['addAsyncCallbackClient'] = addAsyncCallbackClient;

	var addAsyncEvents = (function(){
		
		var callbacks = [];

		function process(x,y){
			console.log(`	[@Service] processing ${x} and ${y}`);
			setTimeout(function(){
				var result = x + y;
				console.log(`	[@Service] returning the result`);
				callbacks.forEach(callback => callback(result));
			},5000);
		}

		function subscribe(callback){
			callbacks.push(callback);
		}

		return { process, subscribe };
	})();

	window['addAsyncEvents'] = addAsyncEvents;


	function addAsyncPromise(x,y){
		console.log(`	[@Service] processing ${x} and ${y}`);
		var p = new Promise(function(resolveFn, rejectFn){
			setTimeout(function(){
				var result = x + y;
				console.log(`	[@Service] returning the result`);
				resolveFn(result);
			},5000);
		});
		return p;
	}

	window['addAsyncPromise'] = addAsyncPromise;


	/*function addAsyncPromiseClient(x,y){
		console.log(`[@Client] triggering service`);
		var p = addAsyncPromise(x,y);
		p.then(function(result){
			console.log(`[@Client] result = ${result}`);
		});
	}*/

	async function addAsyncPromiseClient(x,y){
		console.log(`[@Client] triggering the service`);
		var result = await addAsyncPromise(x,y);
		console.log(`[@Client] result = ${result}`);
	}

	window['addAsyncPromiseClient'] = addAsyncPromiseClient;

})();

/*  Promise client code */
/*
//Followup operation is Async
var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	var doubleResultPromise = new Promise(function(resolveFn, rejectFn){
		setTimeout(function(){
            var doubleResult = result * 2;
            resolveFn(doubleResult);
        }, 4000);
    });
	return doubleResultPromise;
})

//Followup operation is sync
 var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	var doubleResultPromise = new Promise(function(resolveFn, rejectFn){
		var doubleResult = result * 2;
		resolveFn(doubleResult);
    });
	return doubleResultPromise;
})

var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	var doubleResultPromise = Promise.resolve(result * 2);
	return doubleResultPromise;
})

var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	return result * 2;
})

*/