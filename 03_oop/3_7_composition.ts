{
  /**
   *  Favor COMPOSITION over inheritance 🔥
   * -> Composition  : 구성, 구성요소
   */

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

  /**
   * 기능단위로 클래스를 분리한다.
   * -> 우유거품기 : CheapMilkSteamAutomation , 카라멜믹서 : CaramelMixAutomation
   * -> 기능단위로 만들어진 클래스를 바탕으로 필요한 클래스에 주입해서 사용할 수 있다.
   * -> DI : Dependency Injection(의존성 주입)
   */
  class CheapMilkSteamAutomation {
    private steamMilk(): void {
      console.log('steaming sweet milk...🥛');
    }
    addMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class CaramelMixAutomation {
    private getCaramel(): boolean {
      console.log('getting caramal from sugar...🍬');
      return true;
    }
    mixCaramel(cup: CoffeeCup): CoffeeCup {
      const caramal = this.getCaramel();
      return {
        ...cup,
        hasCaramel: caramal,
      };
    }
  }

  class CafeLatteMachine extends CoffeeMachine {
    constructor(beans: number, private _serialNumber: string, private milkFrother: CheapMilkSteamAutomation) {
      // CheapMilkSteamAutomation DI
      super(beans);
    }

    get serialNumber() {
      return this._serialNumber;
    }

    makeCoffee(shots: number): CoffeeCup {
      const _coffee = super.makeCoffee(shots);
      return this.milkFrother.addMilk(_coffee);
    }
  }

  class CaramelCoffeeMachine extends CoffeeMachine {
    constructor(beans: number, private caramelMixer: CaramelMixAutomation) {
      // CaramelMixAutomation DI
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const _coffee = super.makeCoffee(shots);
      return this.caramelMixer.mixCaramel(_coffee);
    }
  }

  // class CaramelCafeLatteMachine extends CafeLatteMachine, CaramelCoffeeMachine {}
  // -> 다중 상속 불가!!!
  // -> Composition 이용 ✅

  class CaramelCafeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      private milkFrother: CheapMilkSteamAutomation,
      private caramelMixer: CaramelMixAutomation
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const _coffee = super.makeCoffee(shots);
      const coffeeWithMilk = this.milkFrother.addMilk(_coffee);
      return this.caramelMixer.mixCaramel(coffeeWithMilk);
    }
  }

  // CaramelCafeLatteMachine은 주입된 milkFrother, caramelMixer가 어떻게 구현되었는지 알 필요없이 필요한 기능인지 여부를 판단하고 그냥 재사용할 수 있다.
  // -> BUT 여기에는 치명적인 단점이 있다.
  // -> CafeLatteMachine, CaramelCoffeeMachine, CaramelCafeLatteMachine는 CheapMilkSteamAutomation와 CaramelMixAutomation는 타이트하게 커플링을 맺고 있다.
  // -> 타이트하게 커플링을 맺고 있다 === CheapMilkSteamAutomation와 CaramelMixAutomation가 항상 필요하다.
  // -> 만약 CheapMilkSteamAutomation와 CaramelMixAutomation가 아닌 다른 거품기나 믹서기를 사용하게 되면 각각의 CafeLatteMachine, CaramelCoffeeMachine, CaramelCafeLatteMachine 클래스는
  //    역시 업데이트 되어야 한다.
  // -> CheapMilkSteamAutomation와 CaramelMixAutomation는 항상 이런 형태로만 존재할 수 밖에 없다.
  // ✅ 클래스와 클래스간의 관계가 서로 밀접하게 연결짓는 것은 좋지 않다.
}
