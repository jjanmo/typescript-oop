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
      console.log('โ', this.coffeeBeans);
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
   * ์ธํฐํ์ด์ค์ธ CoffeeMaker์ ComercialCoffeeMaker์ ๋ฐ๋ผ์ ์ฌ์ฉํ? ์ ์๋ ๋ฉ์๋๊ฐ ๋ฌ๋ผ์ง๋ค.
   * -> ๋์ผํ ์ธ์คํด์ค(maker) ์ผ์ง๋ผ๋ ๊ทธ ํด๋์ค๊ฐ ๋๊ฐ์ง ์ธํฐํ์ด์ค๋ฅผ ๋ชจ๋ ๊ตฌํํ๊ณ? ์๊ธฐ๋๋ฌธ์
   * -> ์์ฑ์์์ ์ด๋ค ์ธํฐํ์ด์ค๋ก ์?์ํ๋์ ๋ฐ๋ผ์ ๊ฐ๊ฐ ๋ค๋ฅธ ์ธํฐํ์ด์ค ๊ท์ฝ์ ๋ฐ๋ฅด๊ฒ ๋๋ ๊ฒ์ด๋ค.
   * -> ํด๋์ค AmateurUser์ ProBarista๋ ์ธํฐํ์ด์ค๊ฐ ์ด๋ป๊ฒ ๊ตฌํ๋์ด์๋์ง(๊ตฌํ๋ ํด๋์ค๊ฐ ์ผ๋ง๋ ๋ณต์กํ์ง ๋ฑ๋ฑ)์ ๊ด๊ณ์์ด
   *    ์ธํฐํ์ด์ค์ ๊ท์ฝ์ ๋ฐ๋ฅด๋ ๋ฉ์๋๋ง์ผ๋ก ์์ฑ๋ ์ธ์คํด์ค์ ์์ฌ์ํต ํ? ์ ์๋ค.
   * -> ์ฆ ์ด๊ฒ์ ์ธํฐํ์ด์ค๋ฅผ ์ฌ์ฉํ๋ ์ฌ์ฉ์๋ ๋จ์ง ์ธํฐํ์ด์ค์ ์?ํด์ง ๊ท์ฝ๋ง ์๊ณ? ๊ทธ์ ๋ง์ถฐ ์ฌ์ฉํ๋ฉด ๋๋ ๊ฒ์ด๋ค.
   */
}
