{
  type CoffeeCup = {
    shots: number;
    hasMilk: false;
    hasHazelnut: boolean;
    hasCaramel: boolean;
  };

  class CoffeeMachine {
    // 멤버변수 : 객체가 만들어질 때마다 계속 생성된다.
    // -> BEANS_GRAM_PER_SHOT의 경우에는 모든 커피머신마다 항상 일정한 값이 된다.
    // -> 그렇기때문에 굳이 객체(인스턴스)가 새롭게 만들어질 때 마다 계속 생성될 필요가 없다(메모리 낭비)
    // -> 이런 경우 static 이라는 키워드를 사용해서 클래스 레벨로 지정해주면 클래스에서 한 번만 생성하여 사용한다.

    coffeeBeans: number = 0; // instance level
    private static BEANS_GRAM_PER_SHOT: number = 10; // class level

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error('not enough coffee beans');
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
        hasHazelnut: false,
        hasCaramel: false,
      };
    }
  }

  const myCoffeeMachine = new CoffeeMachine(50);
  console.log(myCoffeeMachine);
  const myCoffee = myCoffeeMachine.makeCoffee(2);
  console.log(myCoffee);
  console.log(`remain ${myCoffeeMachine.coffeeBeans} coffee beans`);

  // static에 대한 대표적인 예시
  // Math.floor(1.234) 와 같이 Math 인스턴스를 생성하지 않고도 자연스럽게 floor라는 메소드를 사용하였다.
}
