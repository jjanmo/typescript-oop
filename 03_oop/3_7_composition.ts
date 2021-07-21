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
    private static BEANS_GRAM_PER_SHOT: number = 10;

    constructor(private coffeeBeans: number, private milkFrother: MilkFrother, private caramelMixer: CaramelMixer) {}

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
      const _coffee = this.extract(shots);
      const coffeeWithMilk = this.milkFrother.addMilk(_coffee);
      return this.caramelMixer.mixCaramel(coffeeWithMilk);
    }
  }

  /**
   * 기능단위로 클래스를 분리한다.
   * -> 우유거품기 : CheapMilkSteamAutomation , 카라멜믹서 : CaramelMixAutomation
   * -> 기능단위로 만들어진 클래스를 바탕으로 필요한 클래스에 주입해서 사용할 수 있다.
   * -> DI : Dependency Injection(의존성 주입)
   */

  // Milk
  interface MilkFrother {
    addMilk(cup: CoffeeCup): CoffeeCup;
  }

  class CheapMilkSteamAutomation implements MilkFrother {
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

  class ColdMilkSteamAutomation implements MilkFrother {
    private steamMilk(): void {
      console.log('steaming cold milk...🥛');
    }
    addMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class LoyalMilkSteamAutomation implements MilkFrother {
    private steamMilk(): void {
      console.log('steaming loyal milk...🥛');
    }
    addMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class NoMilk implements MilkFrother {
    addMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  // Caramel
  interface CaramelMixer {
    mixCaramel(cup: CoffeeCup): CoffeeCup;
  }

  class CaramelMixAutomation implements CaramelMixer {
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

  class LoyalCaramelMixer implements CaramelMixer {
    private getCaramel(): boolean {
      console.log('getting loyal caramal from brown sugar...🥮');
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

  class NoCaramel implements CaramelMixer {
    mixCaramel(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  // Machine

  // class CafeLatteMachine extends CoffeeMachine {
  //   constructor(beans: number, private _serialNumber: string, private milkFrother: MilkFrother) {
  //     // 1) class CheapMilkSteamAutomation DI => 타이트 커플링 😱 👎
  //     // 2) interface MilkFrother를 주입한다 => 디커플링 😀 👍
  //     super(beans);
  //   }

  //   get serialNumber() {
  //     return this._serialNumber;
  //   }

  //   makeCoffee(shots: number): CoffeeCup {
  //     const _coffee = super.makeCoffee(shots);
  //     return this.milkFrother.addMilk(_coffee);
  //   }
  // }

  // class CaramelCoffeeMachine extends CoffeeMachine {
  //   constructor(beans: number, private caramelMixer: CaramelMixer) {
  //     // 1) class CaramelMixAutomation DI => 타이트 커플링 😱 👎
  //     // 2) interface CaramelMixer를 주입한다 => 디커플링 😀 👍
  //     super(beans);
  //   }

  //   makeCoffee(shots: number): CoffeeCup {
  //     const _coffee = super.makeCoffee(shots);
  //     return this.caramelMixer.mixCaramel(_coffee);
  //   }
  // }

  // class CaramelCafeLatteMachine extends CafeLatteMachine, CaramelCoffeeMachine {}
  // -> 다중 상속 불가!!!
  // -> Composition 이용 ✅

  // class CaramelCafeLatteMachine extends CoffeeMachine {
  //   constructor(beans: number, private milkFrother: MilkFrother, private caramelMixer: CaramelMixer) {
  //     super(beans);
  //   }

  //   makeCoffee(shots: number): CoffeeCup {
  //     const _coffee = super.makeCoffee(shots);
  //     const coffeeWithMilk = this.milkFrother.addMilk(_coffee);
  //     return this.caramelMixer.mixCaramel(coffeeWithMilk);
  //   }
  // }

  // CaramelCafeLatteMachine은 주입된 milkFrother, caramelMixer가 어떻게 구현되었는지 알 필요없이 필요한 기능인지 여부를 판단하고 그냥 재사용할 수 있다.
  // -> BUT 여기에는 🔥치명적인 단점🔥이 있다.
  // -> CafeLatteMachine, CaramelCoffeeMachine, CaramelCafeLatteMachine는 CheapMilkSteamAutomation와 CaramelMixAutomation는 타이트하게 커플링을 맺고 있다.
  // -> 타이트하게 커플링을 맺고 있다 === CheapMilkSteamAutomation와 CaramelMixAutomation가 항상 필요하다.
  // -> 만약 CheapMilkSteamAutomation와 CaramelMixAutomation가 아닌 다른 거품기나 믹서기를 사용하게 되면 각각의 CafeLatteMachine, CaramelCoffeeMachine, CaramelCafeLatteMachine 클래스는
  //    역시 업데이트 되어야 한다.
  // -> CheapMilkSteamAutomation와 CaramelMixAutomation는 항상 이런 형태로만 존재할 수 밖에 없다.
  // ✅ 클래스와 클래스간의 관계가 서로 밀접하게 연결짓는 것은 좋지 않다.
  // ✅ 타이트 커플링를 해결하는 방법 : 인터페이스의 활용 !!!

  // Milk
  const cheapMilkMixer = new CheapMilkSteamAutomation();
  const loyaMilkMixer = new LoyalMilkSteamAutomation();
  const coldMilkMixer = new ColdMilkSteamAutomation();
  const noMilk = new NoMilk();

  // Caramel
  const cheapCaramelMixer = new CaramelMixAutomation();
  const loyalCaramelMixer = new LoyalCaramelMixer();
  const noCaramel = new NoCaramel();

  // Machine
  // -> 인터페이스를 구현한 다양한 우유와 카라멜 클래스를 통해서 다양한 커피 머신을 만들 수 있다.
  // -> 개발자가 원하는 기능을 따로 따로 분리하고 밀접도를 낮춰서 구현함으로서 상황에 따라서 원하는 기능을 가진 것을 구현할 수 있다.

  const cafeLatteMachine = new CoffeeMachine(20, cheapMilkMixer, noCaramel);
  const loyalLatteMachine = new CoffeeMachine(20, loyaMilkMixer, noCaramel);
  const coldLatteMachine = new CoffeeMachine(20, coldMilkMixer, noCaramel);

  const loyalCaramelCoffeeMachine = new CoffeeMachine(20, noMilk, loyalCaramelMixer);
  const cheapCaramelCoffeeMachine = new CoffeeMachine(20, noMilk, cheapCaramelMixer);

  const loyalColdCaramelCafeLatteMachine = new CoffeeMachine(20, coldMilkMixer, loyalCaramelMixer);

  // 위의 코드를 좀 더 업그레이드 시킬수 있다.
  // -> 같은 개념을 사용하면 위처럼 다양한 커피머신 클래스를 만들 필요가 없다.
  // -> CoffeeMachine 클래스에 인터페이스를 주입하여 사용함으로서 인터페이스를 통해서 구현된 밀크와 카라멜 관련된 클래스를 이용해서 기능이 결정될 수 있다.
  // -> ✅ 기능을 분리한 인터페이스를 구현한 클래스를 통해서 Composition을 좀 더 유용하게 사용할 수 있다.
  // -> BUT 항상 Composition이 좋은 것은 아니다. 상황에 맞게 Inheritance와 Composition을 사용하는 것이 중요하다.
  // -> Composition을 활용할 수 있는 상황 : 클래스간의 관계가 수직적인 관계가 만들어지는지 혹은 상속의 깊이가 깊어지고 있는지에 등에 대해서 생각하면서 Composition을 활용해보자.
}
