var bitcoin = require('bitcoinjs-lib');
var fs = require('fs');

var outputFile = "wallet.dat"

// var stream = fs.createWriteStream(outputFile);

var keyPair = bitcoin.ECPair.makeRandom({network: bitcoin.networks.testnet});
var private = keyPair.toWIF();
var address = keyPair.getAddress();
fs.appendFile(outputFile, "Private key: " + private + "\n" + "Address: " + address + "\n")
console.log("Keys Created! they are located in your wallet.dat file")


