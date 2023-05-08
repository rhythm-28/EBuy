const func = (a) => {
  return new Promise((resolve, reject) => {
    if (a > 0) {
      resolve("Promise Resolved");
    } else reject("Promise got rejected");
  });
};
func(-5)
  .then((a) => console.log(a))
  .catch((a) => console.log(a));

const person = {
  getName: function () {
    console.log(this.fName + this.lName);
  },
};
const person1 = {
  fName: "Ridam",
  lName: "Garg",
};
person.getName.call(person1);
