{
  type CoffeeCup = {
    shots: number;
    hasMilk: false;
    hasHazelnut: boolean;
    hasCaramel: boolean;
  };

  class CoffeeMachine {
    coffeeBeans: number;
    private BEANS_GRAM_PER_SHOT: number = 10;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * this.BEANS_GRAM_PER_SHOT) {
        throw new Error('not enough coffee beans');
      }
      this.coffeeBeans -= shots * this.BEANS_GRAM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
        hasHazelnut: false,
        hasCaramel: false,
      };
    }
  }

  const myCoffeeMachine = new CoffeeMachine(50);
  const myCoffee = myCoffeeMachine.makeCoffee(2);
  console.log(myCoffee);
  console.log(`remain ${myCoffeeMachine.coffeeBeans} coffee beans`);
}
