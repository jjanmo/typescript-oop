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

  // 인터페이스
}
