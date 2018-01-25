var bitcoin = require('bitcoinjs-lib');
var bip39 = require('bip39');
var fs = require('fs');
// var prompt = require('cli-prompt')
var crypto = require('crypto')

var outputFile = "wallet.dat"
var entropy = crypto.randomBytes(16)
var keyChain = []
var mnemonic = bip39.entropyToMnemonic(entropy.toString('hex'))
module.exports.keyChain = keyChain
module.exports.mnemonic = mnemonic


function createWallet(){
	// var mnemonic = bip39.entropyToMnemonic(entropy.toString('hex'))
	var seed = bip39.mnemonicToSeed(mnemonic)
	var seedHex = bip39.mnemonicToSeedHex(mnemonic)
	var hdMaster = bitcoin.HDNode.fromSeedHex(seedHex) 
	console.log(mnemonic)
	// return mnemonic;

	for (var i = 0; i < 20; i++) {
		var key = hdMaster.derivePath('m/' + [i])
		keyChain.push(key)
	}
	for (var j = 0; j < keyChain.length; j++){
		var pubKey = keyChain[j].keyPair.getPublicKeyBuffer()
		var redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(bitcoin.crypto.hash160(pubKey))
	    var scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript))
	    var address = bitcoin.address.fromOutputScript(scriptPubKey)

	    console.log((j+1) + " " +address)

	 }
	 
}

function addKeys(){
	var seed = bip39.mnemonicToSeed(mnemonic)
	var seedHex = bip39.mnemonicToSeedHex(mnemonic)
	var hdMaster = bitcoin.HDNode.fromSeedHex(seedHex) 
	// console.log(mnemonic)

	var newLenght = keyChain.length + 10;

	for (var i = keyChain.length; i < newLenght  ; i++) {
		var key = hdMaster.derivePath('m/' + [i] )
		keyChain.push(key)
		
	}
	for (var j = 0; j < keyChain.length; j++){
		var pubKey = keyChain[j].keyPair.getPublicKeyBuffer()
		var redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(bitcoin.crypto.hash160(pubKey))
	    var scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript))
	    var address = bitcoin.address.fromOutputScript(scriptPubKey)

	    // console.log((+1) + " " +address)
	 }
}


// createWallet();
// console.log(mnemonicArray)
// addKeys();


