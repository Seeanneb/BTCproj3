var BitGoJS = require('bitgo');
var bitgo = new BitGoJS.BitGo({env: 'test', accessToken: process.env.ACCESS_TOKEN});

if (process.argv.length > 3) {
    console.log("usage:\n\t" + process.argv[0] + " " + process.argv[1] + " ");
    process.exit(-1)
}

var label = process.argv[2];
var walletPassword = process.argv[3];

//Create wallet here

bitgo.wallets().createWalletWithKeyChains(
    {"passphrase" : walletPassword,
     "label": label
    }, 
    function(err, result){
        if (err) {console.dir(err); throw new Error ("Error creating wallet!");}
        console.log("Wallet Created: " + result.wallet.id());
        console.dir(result.wallet.wallet)
        console.log("BACK THIS UP! " );
        console.log("User keychain encrypted xPrv: " + result.userKeychain.encryptedXprv);
        console.log("Backup keychain encrypted xPrv: " + result.backupKeychain.encryptedXprv)

    });