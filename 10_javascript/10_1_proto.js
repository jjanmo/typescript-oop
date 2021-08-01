/**
 * Prototype
 * javascript : proto-based OOP -> ES6 class-like 역시 내부적으로 proto-based 이다
 * ✅ 자바스크립트에서의 프로토타입은 자바스크립트의 근본적인 개념이다.
 *
 * 프로토타입 : 자바스크립트의 상속을 위해서 필요한 것!
 *
 * Prototype-based Programming
 * - a style of OOP
 * - behavior reuse (inheritance)
 * - by reusing existing objects that serve as prototype
 */

function CoffeeMachine(shots) {
  this.shots = shots;
  // this.makeCoffee = () => {
  //   console.log('making coffee ... ☕️');
  // };
}

CoffeeMachine.prototype.makeCoffee = () => {
  console.log('making coffee ... ☕️');
};

const coffeeMahine1 = new CoffeeMachine(2);
const coffeeMahine2 = new CoffeeMachine(4);

console.log(coffeeMahine1);
console.log(coffeeMahine2);

// -> 인스턴스가 생성될때 마다 makeCoffee라는 메소드가 생성된다. => Instance member level
// -> 만약에 인스턴스가 수백개라면 같은 기능을 가진 makeCoffee 메소드가 수백개가 메모리에 올라가는 것이다. 이는 비효율적인 메모리 사용이라고 할 수 있다.
// -> 이러한 상황을 극복하기 위해서 prototype에 한 번만 makeCoffee 메소드를 만들면 메모리를 효율적으로 사용할 수 있다. => Prototype member level

function LatteMachine(milk) {
  this.milk = milk;
}
// Q. LatteMachine은 CoffeeMachine을 상속받아서 만들고 싶다면,

LatteMachine.prototype = Object.create(CoffeeMachine.prototype);

// Object.create(proto) : 새로운 객체에 프로토타입이어야할 객체인 proto를 할당하여 새로운 객체를 생성한다.
// -> { } 이렇게 리터럴로 객체를 생성하면, 이 객체의 프로토타입은 Object.prototype이다.

const latteMachine = new LatteMachine(20);
console.log(latteMachine);
latteMachine.makeCoffee();
