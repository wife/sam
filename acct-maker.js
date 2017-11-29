var SteamUser = require('steam-user');
var SteamStore = require('steamstore');
var SteamTotp = require('steam-totp');
var readlineSync = require('readline-sync');
var fs = require('fs');

var client = new SteamUser();
var user = new SteamUser();
var store = new SteamStore();

var username, password;
var mem;
var cookieArray = {};



client.logOn();

client.on('loggedOn', function(details) {
  createAccount();
});

user.on('loggedOn', function(details) {
  console.log("Acct saved");
var fs = require('fs');
var kel = username + ":" + password + "\n";
fs.appendFileSync('acct.txt', kel);
  process.exit(1);
  });

user.on('webSession', function(sessionID, cookies) {
  cookieArray = cookies;
});
function makeid() {
  var text = "eclip";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
function createAccount() {
var kek = makeid();
var kekpls = makeid();
  username = kek;
mem = kek + ":" + kekpls + "\n";
  password = kekpls;
  var email = "0@duk.wtf";
  client.createAccount(username, password, email, function (result) {
    if (result == SteamUser.Steam.EResult.OK) {
      
      initClient();
    } else {
      console.log('Error code: ' + result);
      process.exit(1);
    }
  });
}

function initClient() {
  client.logOff();
  client = null;
  user.logOn({
    'accountName': username,
    'password': password
  });
}

