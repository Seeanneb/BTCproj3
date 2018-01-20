var bitcoin = require('bitcoinjs-lib');
var bip39 = require('bip39');
var fs = require('fs');
var prompt = require('cli-prompt')
var crypto = require('crypto')

var outputFile = "wallet.dat"

var entropy = crypto.randomBytes(16)

var mnemonic = bip39.entropyToMnemonic(entropy.toString('hex'))
var seed = bip39.mnemonicToSeed(mnemonic)
var seedHex = bip39.mnemonicToSeedHex(mnemonic)

var hdMaster = bitcoin.HDNode.fromSeedHex(seedHex)

var keyChain = []


function generateKeyChain(){
for (var i = 0; i < 20; i++){
	var key = hdMaster.derivePath('m/' + [i])
	keyChain.push(key)
 }
}

function generateAddress(){
for (var j = 0; j < keyChain.length; j++){
	var pubKey = keyChain[j].keyPair.getPublicKeyBuffer()
	var redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(bitcoin.crypto.hash160(pubKey))
    var scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript))
    var address = bitcoin.address.fromOutputScript(scriptPubKey)
    console.log(address)
 }
}
generateKeyChain();
generateAddress();

// var key0 = hdMaster.derivePath('m/0')
// var key1 = hdMaster.derivePath('m/1')

// var pubKey = key.keyPair.getPublicKeyBuffer()
// var redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(bitcoin.crypto.hash160(pubKey))
// var scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript))
// var address = bitcoin.address.fromOutputScript(scriptPubKey)

// console.log(mnemonic)
// console.log(keyChain)

