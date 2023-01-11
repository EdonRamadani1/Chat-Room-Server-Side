// random numbers between 1 and 100
let randomNumberSeed = Math.floor(Math.random() * 100) + 1;
let iterations = 0;
let randomNumber = -1;
while (randomNumber !== randomNumberSeed) {
 randomNumber = Math.floor(Math.random() * 100) + 1;
 process.stdout.write(`${randomNumber},`);
 iterations++;
}
console.log(
 `\nit took ${iterations} iterations to randomly re-generate the random number
${randomNumberSeed}`
);
