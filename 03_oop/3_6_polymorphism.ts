{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasHazelnut?: boolean;
    hasCaramel?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private coffeeBeans: number = 0;
    private static BEANS_GRAM_PER_SHOT: number = 10;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(shots: number) {
      return new CoffeeMachine(shots);
    }

    setCoffeeBeans(coffeeBeans: number) {
      if (coffeeBeans < 0) {
        throw new Error('value for coffee beans should be greater than 0');
      }
      this.coffeeBeans += coffeeBeans;
    }
    clean() {
      console.log('cleaning the machine...🧼');
    }

    private grindCoffeeBeans(shots: number) {
      console.log('before grinding', this.coffeeBeans);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error('not enough coffee beans');
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
      console.log('after grinding', this.coffeeBeans);
    }

    private preheat(): void {
      console.log('heating up......🔥');
    }

    private extract(shots: number): CoffeeCup {
      console.log('pulling......☕️');
      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindCoffeeBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  class CafeLatteMachine extends CoffeeMachine {
    constructor(beans: number, private _serialNumber: string) {
      super(beans);
    }

    get serialNumber() {
      return this._serialNumber;
    }

    addMilk() {
      console.log('adding sweet milk...🥛');
    }

    makeCoffee(shots: number): CoffeeCup {
      const _coffee = super.makeCoffee(2);
      this.addMilk();
      return {
        ..._coffee,
        hasMilk: true,
      };
    }
  }

  class CaramelCoffeeMaker extends CoffeeMachine {
    mixSweetCaramel() {
      console.log('mixing sweet caramel...🍬');
    }

    makeCoffee(shots: number): CoffeeCup {
      const _coffee = super.makeCoffee(shots);
      this.mixSweetCaramel();
      return {
        ..._coffee,
        hasCaramel: true,
      };
    }
  }

  const caramelMaker = new CaramelCoffeeMaker(30);
  const caramelCoffee = caramelMaker.makeCoffee(2);
  console.log(caramelCoffee);

  /**
   * ⭐️⭐️⭐️⭐️⭐️
   * CoffeeMachine
   * CafeLatteMachine
   * CaramelCoffeeMaker
   * -> 위 3가지의 관계가 중요하다.
   *
   * 1. CoffeeMachine은 CoffeeMaker이다.
   * 2. CafeLatteMachine는 CoffeeMachine이다. -> CafeLatteMachine은 CoffeeMaker이다.
   * 3. CaramelCoffeeMaker는 CoffeeMachine이다 -> CaramelCoffeeMaker는 CoffeeMaker이다.
   * -> 만약에 아래 machines를 CoffeeMaker[] 로 타입을 정하면, 배열 안의 요소들이 각각 다른 타입을 갖더라고 인터페이스로 규약해놓은 메소드만을 사용하게 된다.
   *
   * ✅ 다형성이란, 하나의 인터페이스 혹은 부모 클래스를 상속 받은 자식 클래스들이 인터페이스와 부모 클래스의 메소드들을 다른 방식으로 다양하게 구성함으로서
   *    조금 여러가지 객체를 생성할 수 있도록 만드는 것을 말한다.
   * ✅ 인터페이스와 부모 클래스에 있는 동일한 함수를 사용함으로서 각각의 자식 클래스의 내부 구현 사항을 신경쓰지않고 약속된(규약된) 메서드(API)를 사용함으로서
   *    좀 더 간단하게 이를 사용할 수 있도록 도와주는 것을 추상화라고 할 수 있다.
   */

  const machines: CoffeeMaker[] = [
    new CoffeeMachine(20),
    new CafeLatteMachine(30, 'S123455667'),
    new CaramelCoffeeMaker(30),
    new CoffeeMachine(20),
    new CafeLatteMachine(30, 'S123455667'),
    new CaramelCoffeeMaker(30),
  ];

  machines.forEach((machine, index) => {
    console.log(`--------${index + 1}  coffee ☕️---------`);
    machine.makeCoffee(2);
  });
}
