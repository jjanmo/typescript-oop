{
  type CoffeeCup = {
    shots: number;
    hasMilk: false;
    hasHazelnut: boolean;
    hasCaramel: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }
  interface ComercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    setCoffeeBeans(coffeeBeans: number): void;
    clean(): void;
  }

  class CoffeeMachine implements CoffeeMaker, ComercialCoffeeMaker {
    private coffeeBeans: number = 0;
    private static BEANS_GRAM_PER_SHOT: number = 10;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
      console.log('✅', this.coffeeBeans);
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
        hasHazelnut: false,
        hasCaramel: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindCoffeeBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log('ama coffee', coffee);
    }
  }

  class ProBarista {
    constructor(private machine: ComercialCoffeeMaker) {}
    makeCoffee() {
      this.machine.setCoffeeBeans(50);
      const coffee = this.machine.makeCoffee(2);
      console.log('pro coffee', coffee);
      this.machine.clean();
    }
  }

  const maker: CoffeeMachine = CoffeeMachine.makeMachine(40);

  const amateur = new AmateurUser(maker);
  amateur.makeCoffee();

  const barista = new ProBarista(maker);
  barista.makeCoffee();

  /**
   * 인터페이스인 CoffeeMaker와 ComercialCoffeeMaker에 따라서 사용할 수 있는 메소드가 달라진다.
   * -> 동일한 인스턴스(maker) 일지라도 그 클래스가 두가지 인터페이스를 모두 구현하고 있기때문에
   * -> 생성자에서 어떤 인터페이스로 정의하냐에 따라서 각각 다른 인터페이스 규약을 따르게 되는 것이다.
   * -> 클래스 AmateurUser와 ProBarista는 인터페이스가 어떻게 구현되어있는지(구현된 클래스가 얼마나 복잡한지 등등)와 관계없이
   *    인터페이스의 규약에 따르는 메소드만으로 생성된 인스턴스와 의사소통 할 수 있다.
   * -> 즉 이것을 인터페이스를 사용하는 사용자는 단지 인터페이스에 정해진 규약만 알고 그에 맞춰 사용하면 되는 것이다.
   */
}
