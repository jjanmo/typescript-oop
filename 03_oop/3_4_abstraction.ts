{
  type CoffeeCup = {
    shots: number;
    hasMilk: false;
    hasHazelnut: boolean;
    hasCaramel: boolean;
  };

  /**
   * Abstraction(추상화)
   * 🥸 아주 러프한 설명 : 구체적인, 복잡한 시스템, 자료, 함수 등등을 간단하고 알기 쉽게 만들어 보여주는 것
   * 보통 추상화라고 하면 인터페이스를 통한 구현이라고 말하지만 그것만이 추상화라고 말하지는 않는다.
   * -> 인터페이스를 통한 구현은 추상화시키는 방법 중의 한가지
   * -> 여기서는 2가지의 추상화 방법에 대해서 접근제한자와 인터페이스를 이용한 추상화
   *
   * ref : https://medium.com/@raymondjohnson121/abstraction-object-oriented-principles-in-typescript-b0ae13bd921d
   * ✅ It is the process of hiding the internal complexity of a class
   * while only requiring the absolute necessary data to function correctly.
   */

  // 접근제한자
  class CoffeeMachine {
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

    private grindCoffeeBeans(shots: number) {
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error('not enough coffee beans');
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
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

  const myCoffeeMachine = new CoffeeMachine(50);
  const myCoffee = myCoffeeMachine.makeCoffee(2);
  // 클래스 안에 많은 메소드들이 존재 -> 다른 사람들이 이 CoffeeMachine 이라는 클래스를 사용하는데 있어서 무엇을 어떻게 사용하는지 이해하기 어려울수 있다.
  // 뿐만아니라, 커피를 만드는데, grindCoffeeBeans, preheat, extract 이 3가지의 메소드의 순서가 어떤지 기준이 달라서 의도와 다르게 사용할 수 도 있다.
  // -> 이런 경우 원하는 것만 노출하도록 접근제한자를 통해서 이를 추상화할 수 있다.
  // -> 즉 너가 커피를 만들고 싶으면 그냥 makeCoffee() 메소드만 사용하면 돼!! 내부 로직은 알아서 구현되어 있어!! 라고 말하는 것이다.

  console.log(myCoffee);

  // 인터페이스 (러프한 설명)
  // -> 보통, 클래스가 인터페이스를 구현한다라고 말한다. 이 때 인터페이스에는 구현부가 빠진 무언가라고 보면 된다.
  // -> 이를 바탕으로 클래스에서는 해당 인터페이스의 실질적인 구현을 한다. 즉 인터페이스란 클래스의 설계도와 같다.

  // 인터페이스 컨벤션 : 1) 인터페이스 이름 앞에 I~~를 붙여서 표현
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // 인터페이스 컨벤션 : 2) 구현부가 있는 클래스 이름 뒤에 ~~Impl를 붙여서 표현 or 구분되는 다른 이름 명명
  class CoffeeMakerImpl implements CoffeeMaker {
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

    grindCoffeeBeans(shots: number) {
      if (this.coffeeBeans < shots * CoffeeMakerImpl.BEANS_GRAM_PER_SHOT) {
        throw new Error('not enough coffee beans');
      }
      this.coffeeBeans -= shots * CoffeeMakerImpl.BEANS_GRAM_PER_SHOT;
    }

    preheat(): void {
      console.log('heating up......🔥');
    }

    extract(shots: number): CoffeeCup {
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

  const maker: CoffeeMakerImpl = new CoffeeMakerImpl(50);
  maker.setCoffeeBeans(50);
  const myCoffee1 = maker.makeCoffee(2);
  console.log('myCoffee1 >>>', myCoffee1);

  const maker1: CoffeeMaker = new CoffeeMakerImpl(50);
  // maker1.setCoffeeBeans(50); // error : 인터페이스 안에는 없는 메소드이기때문에 접근 불가
  //-> 인터페이스로 타입을 지정함으로서 내가 해당 객체에 어느 정도로 접근을 허용할 건지를 결정할 수 있다.
  const myCoffee2 = maker1.makeCoffee(2);
  console.log('myCoffee2 >>>', myCoffee2);
}
