var temp = new Date();
var temp2 = new Date(
	Math.floor(temp.getTime() / (1000 * 60 * 60 * 24)) * (1000 * 60 * 60 * 24) +
		1000 * 60 * 60 * 24
);
console.log(temp);
console.log(temp2);
