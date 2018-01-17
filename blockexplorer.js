var prompt = require('cli-prompt')
var request = require('request')

var satoshiToBTC = function(value){
	return value * 0.00000001
}

prompt('Enter a Bitcoin Address: ', function (address){
	var urlAddress = "https://blockchain.info/address/" + address + "?format=json";
	var urlPrice = "https://blockchain.info/stats?format=json"

	request(urlPrice, function(error, response, body){
		var resultPrice = JSON.parse(body).market_price_usd
		// console.log(resultPrice)
	// })


	request(urlAddress, function(error, response, body){
		if (!error && response.statusCode == 200){
			var result = JSON.parse(body)
			var received = satoshiToBTC(result.total_received)
			var sent = satoshiToBTC(result.total_sent)
			var totalBalance = satoshiToBTC(result.final_balance)
			console.log("Received: " + received + "BTC " + "(" + received*resultPrice + " USD)" ) 
			console.log("Sent: " + sent + "BTC " + "(" + sent*resultPrice + " USD)" )
			console.log("Total Balance: " + totalBalance + "BTC " + "(" + totalBalance*resultPrice + " USD)" )
		} else {
			console.log("Unable to find Address")
			if (error) throw error
		}

	})
})

})

