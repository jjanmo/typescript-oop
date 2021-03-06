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
      console.log('cleaning the machine...๐งผ');
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
      console.log('heating up......๐ฅ');
    }

    private extract(shots: number): CoffeeCup {
      console.log('pulling......โ๏ธ');
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

  class CafeLatteMachine extends CoffeeMachine {
    constructor(beans: number, private _serialNumber: string) {
      super(beans);
    }

    get serialNumber() {
      return this._serialNumber;
    }

    addMilk() {
      console.log('adding sweet milk...๐ฅ');
    }

    makeCoffee(shots: number): CoffeeCup {
      const _coffee = super.makeCoffee(2);
      this.addMilk();
      return {
        ..._coffee,
        hasMilk: true,
      };
    }
  }

  class CaramelCoffeeMaker extends CoffeeMachine {
    mixSweetCaramel() {
      console.log('mixing sweet caramel...๐ฌ');
    }

    makeCoffee(shots: number): CoffeeCup {
      const _coffee = super.makeCoffee(shots);
      this.mixSweetCaramel();
      return {
        ..._coffee,
        hasCaramel: true,
      };
    }
  }

  const caramelMaker = new CaramelCoffeeMaker(30);
  const caramelCoffee = caramelMaker.makeCoffee(2);
  console.log(caramelCoffee);

  /**
   * โญ๏ธโญ๏ธโญ๏ธโญ๏ธโญ๏ธ
   * CoffeeMachine
   * CafeLatteMachine
   * CaramelCoffeeMaker
   * -> ์ 3๊ฐ์ง์ ๊ด๊ณ๊ฐ ์ค์ํ๋ค.
   *
   * 1. CoffeeMachine์ CoffeeMaker์ด๋ค.
   * 2. CafeLatteMachine๋ CoffeeMachine์ด๋ค. -> CafeLatteMachine์ CoffeeMaker์ด๋ค.
   * 3. CaramelCoffeeMaker๋ CoffeeMachine์ด๋ค -> CaramelCoffeeMaker๋ CoffeeMaker์ด๋ค.
   * -> ๋ง์ฝ์ ์๋ machines๋ฅผ CoffeeMaker[] ๋ก ํ์์ ์?ํ๋ฉด, ๋ฐฐ์ด ์์ ์์๋ค์ด ๊ฐ๊ฐ ๋ค๋ฅธ ํ์์ ๊ฐ๋๋ผ๊ณ? ์ธํฐํ์ด์ค๋ก ๊ท์ฝํด๋์ ๋ฉ์๋๋ง์ ์ฌ์ฉํ๊ฒ ๋๋ค.
   *
   * โ ๋คํ์ฑ์ด๋, ํ๋์ ์ธํฐํ์ด์ค ํน์ ๋ถ๋ชจ ํด๋์ค๋ฅผ ์์ ๋ฐ์ ์์ ํด๋์ค๋ค์ด ์ธํฐํ์ด์ค์ ๋ถ๋ชจ ํด๋์ค์ ๋ฉ์๋๋ค์ ๋ค๋ฅธ ๋ฐฉ์์ผ๋ก ๋ค์ํ๊ฒ ๊ตฌ์ฑํจ์ผ๋ก์
   *    ์กฐ๊ธ ์ฌ๋ฌ๊ฐ์ง ๊ฐ์ฒด๋ฅผ ์์ฑํ? ์ ์๋๋ก ๋ง๋๋ ๊ฒ์ ๋งํ๋ค.
   * โ ์ธํฐํ์ด์ค์ ๋ถ๋ชจ ํด๋์ค์ ์๋ ๋์ผํ ํจ์๋ฅผ ์ฌ์ฉํจ์ผ๋ก์ ๊ฐ๊ฐ์ ์์ ํด๋์ค์ ๋ด๋ถ ๊ตฌํ ์ฌํญ์ ์?๊ฒฝ์ฐ์ง์๊ณ? ์ฝ์๋(๊ท์ฝ๋) ๋ฉ์๋(API)๋ฅผ ์ฌ์ฉํจ์ผ๋ก์
   *    ์ข ๋ ๊ฐ๋จํ๊ฒ ์ด๋ฅผ ์ฌ์ฉํ? ์ ์๋๋ก ๋์์ฃผ๋ ๊ฒ์ ์ถ์ํ๋ผ๊ณ? ํ? ์ ์๋ค.
   */

  const machines: CoffeeMaker[] = [
    new CoffeeMachine(20),
    new CafeLatteMachine(30, 'S123455667'),
    new CaramelCoffeeMaker(30),
    new CoffeeMachine(20),
    new CafeLatteMachine(30, 'S123455667'),
    new CaramelCoffeeMaker(30),
  ];

  machines.forEach((machine, index) => {
    console.log(`--------${index + 1}  coffee โ๏ธ---------`);
    machine.makeCoffee(2);
  });
}
