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

  // 추상클래스
  // -> 추상클래스는 객체(인스턴스)를 생성할 수 없다.
  // -> 추상클래스 자체만으로 객체 생성을 목적으로 하지않는다.
  // -> 부모 클래스로서 사용되는 추상클래스는 필요한 것을 정의해 놓고 자식마다 달라질 수 있는 메소드(행동)에 대해선
  //    그 앞에 abstract 으로 정의하여(메소드 앞에 abstract 키워드를 적는다) 자식 클래스가 해당 메소드를 무조건
  //    구현하도록 강제하게 된다.또한 해당 메소드에 대해선 추상메소드이기 때문에 구현사항을 작성해서는 안된다.

  abstract class CoffeeMachine implements CoffeeMaker {
    private coffeeBeans: number = 0;
    private static BEANS_GRAM_PER_SHOT: number = 10;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
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

    protected abstract extract(shots: number): CoffeeCup;

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

    // 원래는 makeCoffee를 overriding 했지만 추상클래스(추상메소드)를 사용하게 되면 그럴 필요가 없다.
    protected extract(shots: number): CoffeeCup {
      this.addMilk();
      return {
        shots,
        hasMilk: true,
      };
    }
  }

  class CaramelCoffeeMaker extends CoffeeMachine {
    mixSweetCaramel() {
      console.log('mixing sweet caramel...🍬');
    }

    protected extract(shots: number) {
      this.mixSweetCaramel();
      return {
        shots,
        hasCaramel: true,
      };
    }
  }

  const caramelMaker = new CaramelCoffeeMaker(30);
  const caramelCoffee = caramelMaker.makeCoffee(2);
  console.log(caramelCoffee);

  const machines: CoffeeMaker[] = [
    new CafeLatteMachine(30, 'S123455667'),
    new CaramelCoffeeMaker(30),
    new CafeLatteMachine(30, 'S123455667'),
    new CaramelCoffeeMaker(30),
  ];

  machines.forEach((machine, index) => {
    console.log(`--------${index + 1}  coffee ☕️---------`);
    machine.makeCoffee(2);
  });
}

/**
 *  Q. 추상클래스를 사용하다보면 뭔가 인터페이스와 비슷하다는 느낌을 받는다. 자바를 배울 때도 그랬고, 자바를 잊고(?)
 *     타입스크립트를 통해 OOP를 배우는 지금도 역시 헷갈리는 중이다. 하지만 그 때보다는 조금은 더 그 차이점에 대해서
 *     말할 수 있을 거 같다.
 *     📌 REF : https://stackoverflow.com/questions/1913098/what-is-the-difference-between-an-interface-and-abstract-class
 *
 *     interface
 *     - 인터페이스를 구현한다는 문맥에서 느낌이 오듯이 설계도 역할인 인터페이스를 보고 해당 클래스를 구현한다.
 *     - 단순히 설계도 역할이기 때문에 메모리적으로 비싼작업이 아니다. 또한 인터페이스 안에는 껍데기(패턴)만을 제시하고
 *       구체적인 구현은 들어있지 않다.
 *     - 설계도이기 때문에 이 자체로 객체(인스턴스)를 생성할 수 없다.
 *
 *     abstarct
 *     - 말그대로 추상클래스로서 클래스로서의 역할을 한다. 인터페이스와 다르게 메모리적으로 다소 비싼작업이다.
 *     - 클래스이지만 객체(인스턴스)를 생성할 수 없다.
 *     - 인터페이스와는 다르게 특정 구현 메소드가 있을 수 있다. 그 중에서 추상 키워드를 메소드 앞에 적으면 그 메소드는
 *       추상적으로 제시하고(인터페이스처럼 설계도만 제시) 이를 상속받는 자식클래스에서 반드시 구현해야한다.
 */
