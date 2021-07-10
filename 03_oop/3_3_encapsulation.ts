{
  type CoffeeCup = {
    shots: number;
    hasMilk: false;
    hasHazelnut: boolean;
    hasCaramel: boolean;
  };

  /**
   * * Encapsulation
   *  - public : 따로 작성하지 않으면 기본적으로 모두 public을 갖는다. 공개적, 어디에서든 접근이 가능
   *  - private : 외부에서 절대 접근이 불가능
   *  - protected : 상속 받은 자식에서만 접근이 가능
   */

  class CoffeeMachine {
    private coffeeBeans: number = 0;
    private static BEANS_GRAM_PER_SHOT: number = 10;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    // private으로 coffeeBeans을 설정하게 되면, 외부에서는 coffeeBeans에 접근이 불가능
    // -> 그래서 외부에서 간접적으로 접근이 가능한 메서드를 만들어서 사용 ( 일명 setter )
    setCoffeeBeans(coffeeBeans: number) {
      if (coffeeBeans < 0) {
        throw new Error('value for coffee beans should be greater than 0');
      }
      this.coffeeBeans += coffeeBeans;
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

    // 참고
    // 만약 어떤 클래스에서 아래와 같은(커피머신을 생성하는 메소드) static 메소드를 제공한다면,
    // -> 이 때는 누군가가 이런 생성자로 생성하는 것을 금지하기 위해서 사용한다.
    // -> 이런 경우 보통 private constructor 라고 써서 항상 static 메소드를 사용하도록 권장하는 것이 좋다!
    static makeMachine(beans: number): CoffeeMachine {
      return new CoffeeMachine(beans);
    }
  }

  // const myCoffeeMachine = new CoffeeMachine(50);
  const myCoffeeMachine = CoffeeMachine.makeMachine(50);

  const myCoffee = myCoffeeMachine.makeCoffee(2);
  console.log(myCoffee);
}
