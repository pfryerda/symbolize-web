/* TO DO */

App.populator('home', function (page) {
	console.log("loaded home");
});

App.populator('game', function (page) {
	console.log("loaded game");
});

App.populator('levels', function (page) {
	console.log("loaded levels");
});

try {
App.restore();
}
catch (err) {
App.load('game');
}