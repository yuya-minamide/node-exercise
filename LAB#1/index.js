import mySum from "./module.js";

const myArr = [1, 2, 3, 4, 5];
const result = mySum(...myArr);
console.log(result);

const mySecondArr = myArr.map((num) => num * 2);
const average = mySecondArr.reduce((acc, curr) => acc + curr, 0) / mySecondArr.length;

const filteredArr = mySecondArr.filter((num) => {
	if (num > average) {
		console.log(num);
		return true;
	}
	return false;
});

setTimeout(() => {
	console.log("Goodbye");
}, 3000);

const Employee = {
	name: "Yuya",
	email: "yuya@aaa.com",
	department: "web development",
	startDate: "2023-04-01",
};

console.log(Employee);
