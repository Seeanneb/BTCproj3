var bitcoin = require('bitcoinjs-lib');
var fs = require('fs');
var crypto = require('crypto')

var outputFile = "wallet.dat"

// var stream = fs.createWriteStream(outputFile);

// var keyPair = bitcoin.ECPair.makeRandom({network: bitcoin.networks.testnet});
// var private = keyPair.toWIF();
// var address = keyPair.getAddress();
// fs.appendFile(outputFile, "Private key: " + private + "\n" + "Address: " + address + "\n")
// console.log("Keys Created! they are located in your wallet.dat file")

// Segwit Address
var keyPair = bitcoin.ECPair.makeRandom({network: bitcoin.networks.testnet});
var pubKey = keyPair.getPublicKeyBuffer()

var redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(bitcoin.crypto.hash160(pubKey))
var scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript))
var address = bitcoin.address.fromOutputScript(scriptPubKey)

console.log(address)

