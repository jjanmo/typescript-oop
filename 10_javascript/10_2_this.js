/**
 * javascript 의 this는 this가 호출되는 문맥에 따라서 결정된다.
 * -> 지니의 램프처럼 누가 지니를 부르냐에 따라서 주인이 결정되는 것과 유사하다. 🧞‍♂️
 *
 */

console.log(this); // window in browser

function func() {
  console.log(this);
}

func(); // window
console.dir(func);
window.func(); // 위와 동일

console.clear();

class Counter {
  count = 0;

  increase() {
    console.log(this);
  }

  arrowIncrease = () => {
    console.log(this);
  };
}

const counter = new Counter();
counter.increase(); // this : counter (instance)
const caller = counter.increase;
caller(); // window.caller() => window에는 caller가 없기 때문에 undefined를 출력

class RealCounter {}
const realCounter = new RealCounter();
realCounter.run = counter.increase;
realCounter.run(); // this : realCounter (instance)

// caller()에서의 this를 제대로 나오게 하기 위한 방법
// 1) binding
console.log('1) ----------------');
const bindedIncrease = counter.increase.bind(counter);
bindedIncrease();

// 2) arrow function
console.log('2) ----------------');
// 클래스 내부에서 함수(메소드)를 만들때 화살표 함수를 이용해서 만든다.
// 화살표 함수는 스스로 this를 갖기 못하고 함수가 생성될 때의 상위 스코프의 this를 가져와서 바인딩한다.
const arrowIncrease = counter.arrowIncrease;
arrowIncrease();
