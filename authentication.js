var BitGoJS = require('bitgo');

if (process.argv.length < 3) {
    console.log("usage:\n\t" + process.argv[0] + " " + process.argvp[1] + " " );
    process.exit(-1)
}
var accessToken = process.argv[2]
var bitgo = new BitGoJS.BitGo({env: 'test', accessToken: accessToken});

console.log("BitGo library version " + bitgo.version());
bitgo.session({}).then(function(res){
    console.log(res);
})
.catch(function(err) {
    console.log(err)
});