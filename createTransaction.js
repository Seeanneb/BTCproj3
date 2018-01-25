var bitcoin = require('bitcoinjs-lib')
var request = require('request')
var prompt = require('cli-prompt')
var keyChain = require('./createMnemonic')
var mnemonic = require('./createMnemonic')

var satoshiToBTC = function(value){
	return value * 0.00000001
}

var broadcast_tx = function(tx){
	console.log('tx in hex = ' + tx.toHex());

	var options = {
		url: 'https://api.blockcypher.com/v1/btc/test3/txs/push',
		method: 'POST',
		json: {
			"tx": tx.toHex()
		} 
	};

	request(options, function(error, response, body){
		if (error) throw error;
		console.log("Transaction results: ", body);
		console.log("Transaction sent with hash: ", tx.getId());
	});
}

var tx_fee = 10000

prompt("Enter your private key: ", function(private){
	var network = bitcoin.networks.testnet;
	var keyPair = bitcoin.ECPair.fromWIF(private, network)
	var source_address = keyPair.getAddress()

	var url = "https://api.blockcypher.com/v1/btc/test3/addrs/"+source_address+"?unspentOnly=true";

	request (url, function(error, response, body){
		if (!error && response.statusCode == 200) {
			var json = JSON.parse(body);
			var unspent = json.txrefs;
			var totalUnspent = 0
			for (var i = 0; i < unspent.length; i++) {
				return totalUnspent += unspent[i].value;
				cosnole.log(totalUnspent)
				console.log("SEANYOLO")
			}

			console.log("SEAN DEEZ")
			console.log(totalUnspent + " total unspent")

			console.log("JSON unspent", unspent)
			console.log("Found an unspent transaction output with ", satoshiToBTC(unspent.value), " BTC.");

			prompt("Enter an address to send to: ", function(dest_address){
				var withdraw_amount = unspent.value - tx_fee;

				console.log("Unspent value (BTC)= ", satoshiToBTC(unspent.value));
				console.log("Transaction Fee (BTC)= ", satoshiToBTC(tx_fee));
				console.log("Withdraw amount (BTC)= ", satoshiToBTC(withdraw_amount));

				console.log("TransactionBuilder input tx_hash = ", unspent.tx_hash);
				console.log("TransactionBuilder input tx_output_n = ", unspent.tx_output_n)

				var txb = new bitcoin.TransactionBuilder(network);
				txb.addInput(unspent.tx_hash, unspent.tx_output_n);
				txb.addOutput(dest_address, withdraw_amount);

				txb.sign(0, keyPair);
				var tx = txb.build();
				console.log("tx = ", tx); 

				var confirm = "Send " + satoshiToBTC(withdraw_amount) + "? (Y/N): ";
				prompt(confirm, function(result){
					if (result.toUpperCase() == "Y") {
						broadcast_tx(tx);
					};
				});
			});

		} else {
			console.log("Unable to find any UTXO's");
			if (error) throw error;
		}
	});

});