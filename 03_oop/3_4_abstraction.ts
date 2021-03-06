{
  type CoffeeCup = {
    shots: number;
    hasMilk: false;
    hasHazelnut: boolean;
    hasCaramel: boolean;
  };

  /**
   * Abstraction(μΆμν)
   * π₯Έ μμ£Ό λ¬νν μ€λͺ : κ΅¬μ²΄μ μΈ, λ³΅μ‘ν μμ€ν, μλ£, ν¨μ λ±λ±μ κ°λ¨νκ³  μκΈ° μ½κ² λ§λ€μ΄ λ³΄μ¬μ£Όλ κ²
   * λ³΄ν΅ μΆμνλΌκ³  νλ©΄ μΈν°νμ΄μ€λ₯Ό ν΅ν κ΅¬νμ΄λΌκ³  λ§νμ§λ§ κ·Έκ²λ§μ΄ μΆμνλΌκ³  λ§νμ§λ μλλ€.
   * -> μΈν°νμ΄μ€λ₯Ό ν΅ν κ΅¬νμ μΆμνμν€λ λ°©λ² μ€μ νκ°μ§
   * -> μ¬κΈ°μλ 2κ°μ§μ μΆμν λ°©λ²μ λν΄μ μ κ·Όμ νμμ μΈν°νμ΄μ€λ₯Ό μ΄μ©ν μΆμν
   *
   * ref : https://medium.com/@raymondjohnson121/abstraction-object-oriented-principles-in-typescript-b0ae13bd921d
   * β It is the process of hiding the internal complexity of a class
   * while only requiring the absolute necessary data to function correctly.
   */

  // μ κ·Όμ νμ
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
      console.log('heating up......π₯');
    }

    private extract(shots: number): CoffeeCup {
      console.log('pulling......βοΈ');
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
  // ν΄λμ€ μμ λ§μ λ©μλλ€μ΄ μ‘΄μ¬ -> λ€λ₯Έ μ¬λλ€μ΄ μ΄ CoffeeMachine μ΄λΌλ ν΄λμ€λ₯Ό μ¬μ©νλλ° μμ΄μ λ¬΄μμ μ΄λ»κ² μ¬μ©νλμ§ μ΄ν΄νκΈ° μ΄λ €μΈμ μλ€.
  // λΏλ§μλλΌ, μ»€νΌλ₯Ό λ§λλλ°, grindCoffeeBeans, preheat, extract μ΄ 3κ°μ§μ λ©μλμ μμκ° μ΄λ€μ§ κΈ°μ€μ΄ λ¬λΌμ μλμ λ€λ₯΄κ² μ¬μ©ν  μ λ μλ€.
  // -> μ΄λ° κ²½μ° μνλ κ²λ§ λΈμΆνλλ‘ μ κ·Όμ νμλ₯Ό ν΅ν΄μ μ΄λ₯Ό μΆμνν  μ μλ€.
  // -> μ¦ λκ° μ»€νΌλ₯Ό λ§λ€κ³  μΆμΌλ©΄ κ·Έλ₯ makeCoffee() λ©μλλ§ μ¬μ©νλ©΄ λΌ!! λ΄λΆ λ‘μ§μ μμμ κ΅¬νλμ΄ μμ΄!! λΌκ³  λ§νλ κ²μ΄λ€.

  console.log(myCoffee);

  // μΈν°νμ΄μ€ (λ¬νν μ€λͺ)
  // -> λ³΄ν΅, ν΄λμ€κ° μΈν°νμ΄μ€λ₯Ό κ΅¬ννλ€λΌκ³  λ§νλ€. μ΄ λ μΈν°νμ΄μ€μλ κ΅¬νλΆκ° λΉ μ§ λ¬΄μΈκ°λΌκ³  λ³΄λ©΄ λλ€.
  // -> μ΄λ₯Ό λ°νμΌλ‘ ν΄λμ€μμλ ν΄λΉ μΈν°νμ΄μ€μ μ€μ§μ μΈ κ΅¬νμ νλ€. μ¦ μΈν°νμ΄μ€λ ν΄λμ€μ μ€κ³λμ κ°λ€.

  // μΈν°νμ΄μ€ μ»¨λ²€μ : 1) μΈν°νμ΄μ€ μ΄λ¦ μμ I~~λ₯Ό λΆμ¬μ νν
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // μΈν°νμ΄μ€ μ»¨λ²€μ : 2) κ΅¬νλΆκ° μλ ν΄λμ€ μ΄λ¦ λ€μ ~~Implλ₯Ό λΆμ¬μ νν or κ΅¬λΆλλ λ€λ₯Έ μ΄λ¦ λͺλͺ
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
      console.log('heating up......π₯');
    }

    extract(shots: number): CoffeeCup {
      console.log('pulling......βοΈ');
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
  // maker1.setCoffeeBeans(50); // error : μΈν°νμ΄μ€ μμλ μλ λ©μλμ΄κΈ°λλ¬Έμ μ κ·Ό λΆκ°
  //-> μΈν°νμ΄μ€λ‘ νμμ μ§μ ν¨μΌλ‘μ λ΄κ° ν΄λΉ κ°μ²΄μ μ΄λ μ λλ‘ μ κ·Όμ νμ©ν  κ±΄μ§λ₯Ό κ²°μ ν  μ μλ€.
  const myCoffee2 = maker1.makeCoffee(2);
  console.log('myCoffee2 >>>', myCoffee2);
}
