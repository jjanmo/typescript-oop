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
      console.log('cleaning the machine...π§Ό');
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
      console.log('heating up......π₯');
    }

    private extract(shots: number): CoffeeCup {
      console.log('pulling......βοΈ');
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
    // μμμμ μμ±μλ₯Ό μ¬μ©νλ κ²½μ°μλ λ°λμ λΆλͺ¨μ μμ±μ ν¨μλ₯Ό νΈμΆν΄μΌνλ€. μ΄λ° κ²½μ° super()λ₯Ό νΈμΆν  μ μλ€.
    constructor(beans: number, private _serialNumber: string) {
      super(beans);
    }

    get serialNumber() {
      return this._serialNumber;
    }

    addMilk() {
      console.log('adding sweet milk...π₯');
    }

    //overriding
    makeCoffee(shots: number): CoffeeCup {
      const _coffee = super.makeCoffee(2); // λΆλͺ¨μ λ©μλλ₯Ό μ΄μ©νκ³  μΆλ€λ©΄ superλ₯Ό μ¬μ©νλ€.
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
