var bitcoin = require('bitcoinjs-lib');
var bip39 = require('bip39');
var fs = require('fs');
var prompt = require('cli-prompt')
var crypto = require('crypto')

var outputFile = "wallet.dat"

var entropy = crypto.randomBytes(16)

var mnemonic = bip39.entropyToMnemonic(entropy.toString('hex'))
var seed = bip39.mnemonicToSeed(mnemonic)

var mnemonicArray = mnemonic.split(" ")
// console.log(mnemonicArray)



fs.appendFile(outputFile, "Mnemonic Seed: " + mnemonic + "\n" + "Seed Hex: " + hexSeed + "\n")
// console.log(Array.isArray(mnemonic)) FALSE



