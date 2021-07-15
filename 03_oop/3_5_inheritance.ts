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

  const maker = new CoffeeMachine(30);
  console.log(maker.makeCoffee(2));

  class CafeLatteMachine extends CoffeeMachine {
    // 자식에서 생성자를 사용하는 경우에는 반드시 부모의 생성자 함수를 호출해야한다. 이런 경우 super()를 호출할 수 있다.
    constructor(beans: number, private _serialNumber: string) {
      super(beans);
    }

    get serialNumber() {
      return this._serialNumber;
    }

    addMilk() {
      console.log('adding sweet milk...🥛');
    }

    //overriding
    makeCoffee(shots: number): CoffeeCup {
      const _coffee = super.makeCoffee(2); // 부모의 메소드를 이용하고 싶다면 super를 사용한다.
      this.addMilk();
      return {
        ..._coffee,
        hasMilk: true,
      };
    }
  }

  const maker1 = new CafeLatteMachine(50, 'S120987374');
  console.log(maker1.makeCoffee(2));
  console.log(maker1.serialNumber);
}
