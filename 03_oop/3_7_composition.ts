{
  /**
   *  Favor COMPOSITION over inheritance ๐ฅ
   * -> Composition  : ๊ตฌ์ฑ, ๊ตฌ์ฑ์์
   */

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
    private static BEANS_GRAM_PER_SHOT: number = 10;

    constructor(private coffeeBeans: number, private milkFrother: MilkFrother, private caramelMixer: CaramelMixer) {}

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
      const _coffee = this.extract(shots);
      const coffeeWithMilk = this.milkFrother.addMilk(_coffee);
      return this.caramelMixer.mixCaramel(coffeeWithMilk);
    }
  }

  /**
   * ๊ธฐ๋ฅ๋จ์๋ก ํด๋์ค๋ฅผ ๋ถ๋ฆฌํ๋ค.
   * -> ์ฐ์ ๊ฑฐํ๊ธฐ : CheapMilkSteamAutomation , ์นด๋ผ๋ฉ๋ฏน์ : CaramelMixAutomation
   * -> ๊ธฐ๋ฅ๋จ์๋ก ๋ง๋ค์ด์ง ํด๋์ค๋ฅผ ๋ฐํ์ผ๋ก ํ์ํ ํด๋์ค์ ์ฃผ์ํด์ ์ฌ์ฉํ  ์ ์๋ค.
   * -> DI : Dependency Injection(์์กด์ฑ ์ฃผ์)
   */

  // Milk
  interface MilkFrother {
    addMilk(cup: CoffeeCup): CoffeeCup;
  }

  class CheapMilkSteamAutomation implements MilkFrother {
    private steamMilk(): void {
      console.log('steaming sweet milk...๐ฅ');
    }
    addMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class ColdMilkSteamAutomation implements MilkFrother {
    private steamMilk(): void {
      console.log('steaming cold milk...๐ฅ');
    }
    addMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class LoyalMilkSteamAutomation implements MilkFrother {
    private steamMilk(): void {
      console.log('steaming loyal milk...๐ฅ');
    }
    addMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class NoMilk implements MilkFrother {
    addMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  // Caramel
  interface CaramelMixer {
    mixCaramel(cup: CoffeeCup): CoffeeCup;
  }

  class CaramelMixAutomation implements CaramelMixer {
    private getCaramel(): boolean {
      console.log('getting caramal from sugar...๐ฌ');
      return true;
    }
    mixCaramel(cup: CoffeeCup): CoffeeCup {
      const caramal = this.getCaramel();
      return {
        ...cup,
        hasCaramel: caramal,
      };
    }
  }

  class LoyalCaramelMixer implements CaramelMixer {
    private getCaramel(): boolean {
      console.log('getting loyal caramal from brown sugar...๐ฅฎ');
      return true;
    }
    mixCaramel(cup: CoffeeCup): CoffeeCup {
      const caramal = this.getCaramel();
      return {
        ...cup,
        hasCaramel: caramal,
      };
    }
  }

  class NoCaramel implements CaramelMixer {
    mixCaramel(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  // Machine

  // class CafeLatteMachine extends CoffeeMachine {
  //   constructor(beans: number, private _serialNumber: string, private milkFrother: MilkFrother) {
  //     // 1) class CheapMilkSteamAutomation DI => ํ์ดํธ ์ปคํ๋ง ๐ฑ ๐
  //     // 2) interface MilkFrother๋ฅผ ์ฃผ์ํ๋ค => ๋์ปคํ๋ง ๐ ๐
  //     super(beans);
  //   }

  //   get serialNumber() {
  //     return this._serialNumber;
  //   }

  //   makeCoffee(shots: number): CoffeeCup {
  //     const _coffee = super.makeCoffee(shots);
  //     return this.milkFrother.addMilk(_coffee);
  //   }
  // }

  // class CaramelCoffeeMachine extends CoffeeMachine {
  //   constructor(beans: number, private caramelMixer: CaramelMixer) {
  //     // 1) class CaramelMixAutomation DI => ํ์ดํธ ์ปคํ๋ง ๐ฑ ๐
  //     // 2) interface CaramelMixer๋ฅผ ์ฃผ์ํ๋ค => ๋์ปคํ๋ง ๐ ๐
  //     super(beans);
  //   }

  //   makeCoffee(shots: number): CoffeeCup {
  //     const _coffee = super.makeCoffee(shots);
  //     return this.caramelMixer.mixCaramel(_coffee);
  //   }
  // }

  // class CaramelCafeLatteMachine extends CafeLatteMachine, CaramelCoffeeMachine {}
  // -> ๋ค์ค ์์ ๋ถ๊ฐ!!!
  // -> Composition ์ด์ฉ โ

  // class CaramelCafeLatteMachine extends CoffeeMachine {
  //   constructor(beans: number, private milkFrother: MilkFrother, private caramelMixer: CaramelMixer) {
  //     super(beans);
  //   }

  //   makeCoffee(shots: number): CoffeeCup {
  //     const _coffee = super.makeCoffee(shots);
  //     const coffeeWithMilk = this.milkFrother.addMilk(_coffee);
  //     return this.caramelMixer.mixCaramel(coffeeWithMilk);
  //   }
  // }

  // CaramelCafeLatteMachine์ ์ฃผ์๋ milkFrother, caramelMixer๊ฐ ์ด๋ป๊ฒ ๊ตฌํ๋์๋์ง ์ ํ์์์ด ํ์ํ ๊ธฐ๋ฅ์ธ์ง ์ฌ๋ถ๋ฅผ ํ๋จํ๊ณ  ๊ทธ๋ฅ ์ฌ์ฌ์ฉํ  ์ ์๋ค.
  // -> BUT ์ฌ๊ธฐ์๋ ๐ฅ์น๋ช์ ์ธ ๋จ์ ๐ฅ์ด ์๋ค.
  // -> CafeLatteMachine, CaramelCoffeeMachine, CaramelCafeLatteMachine๋ CheapMilkSteamAutomation์ CaramelMixAutomation๋ ํ์ดํธํ๊ฒ ์ปคํ๋ง์ ๋งบ๊ณ  ์๋ค.
  // -> ํ์ดํธํ๊ฒ ์ปคํ๋ง์ ๋งบ๊ณ  ์๋ค === CheapMilkSteamAutomation์ CaramelMixAutomation๊ฐ ํญ์ ํ์ํ๋ค.
  // -> ๋ง์ฝ CheapMilkSteamAutomation์ CaramelMixAutomation๊ฐ ์๋ ๋ค๋ฅธ ๊ฑฐํ๊ธฐ๋ ๋ฏน์๊ธฐ๋ฅผ ์ฌ์ฉํ๊ฒ ๋๋ฉด ๊ฐ๊ฐ์ CafeLatteMachine, CaramelCoffeeMachine, CaramelCafeLatteMachine ํด๋์ค๋
  //    ์ญ์ ์๋ฐ์ดํธ ๋์ด์ผ ํ๋ค.
  // -> CheapMilkSteamAutomation์ CaramelMixAutomation๋ ํญ์ ์ด๋ฐ ํํ๋ก๋ง ์กด์ฌํ  ์ ๋ฐ์ ์๋ค.
  // โ ํด๋์ค์ ํด๋์ค๊ฐ์ ๊ด๊ณ๊ฐ ์๋ก ๋ฐ์ ํ๊ฒ ์ฐ๊ฒฐ์ง๋ ๊ฒ์ ์ข์ง ์๋ค.
  // โ ํ์ดํธ ์ปคํ๋ง๋ฅผ ํด๊ฒฐํ๋ ๋ฐฉ๋ฒ : ์ธํฐํ์ด์ค์ ํ์ฉ !!!

  // Milk
  const cheapMilkMixer = new CheapMilkSteamAutomation();
  const loyaMilkMixer = new LoyalMilkSteamAutomation();
  const coldMilkMixer = new ColdMilkSteamAutomation();
  const noMilk = new NoMilk();

  // Caramel
  const cheapCaramelMixer = new CaramelMixAutomation();
  const loyalCaramelMixer = new LoyalCaramelMixer();
  const noCaramel = new NoCaramel();

  // Machine
  // -> ์ธํฐํ์ด์ค๋ฅผ ๊ตฌํํ ๋ค์ํ ์ฐ์ ์ ์นด๋ผ๋ฉ ํด๋์ค๋ฅผ ํตํด์ ๋ค์ํ ์ปคํผ ๋จธ์ ์ ๋ง๋ค ์ ์๋ค.
  // -> ๊ฐ๋ฐ์๊ฐ ์ํ๋ ๊ธฐ๋ฅ์ ๋ฐ๋ก ๋ฐ๋ก ๋ถ๋ฆฌํ๊ณ  ๋ฐ์ ๋๋ฅผ ๋ฎ์ถฐ์ ๊ตฌํํจ์ผ๋ก์ ์ํฉ์ ๋ฐ๋ผ์ ์ํ๋ ๊ธฐ๋ฅ์ ๊ฐ์ง ๊ฒ์ ๊ตฌํํ  ์ ์๋ค.

  const cafeLatteMachine = new CoffeeMachine(20, cheapMilkMixer, noCaramel);
  const loyalLatteMachine = new CoffeeMachine(20, loyaMilkMixer, noCaramel);
  const coldLatteMachine = new CoffeeMachine(20, coldMilkMixer, noCaramel);

  const loyalCaramelCoffeeMachine = new CoffeeMachine(20, noMilk, loyalCaramelMixer);
  const cheapCaramelCoffeeMachine = new CoffeeMachine(20, noMilk, cheapCaramelMixer);

  const loyalColdCaramelCafeLatteMachine = new CoffeeMachine(20, coldMilkMixer, loyalCaramelMixer);

  // ์์ ์ฝ๋๋ฅผ ์ข ๋ ์๊ทธ๋ ์ด๋ ์ํฌ์ ์๋ค.
  // -> ๊ฐ์ ๊ฐ๋์ ์ฌ์ฉํ๋ฉด ์์ฒ๋ผ ๋ค์ํ ์ปคํผ๋จธ์  ํด๋์ค๋ฅผ ๋ง๋ค ํ์๊ฐ ์๋ค.
  // -> CoffeeMachine ํด๋์ค์ ์ธํฐํ์ด์ค๋ฅผ ์ฃผ์ํ์ฌ ์ฌ์ฉํจ์ผ๋ก์ ์ธํฐํ์ด์ค๋ฅผ ํตํด์ ๊ตฌํ๋ ๋ฐํฌ์ ์นด๋ผ๋ฉ ๊ด๋ จ๋ ํด๋์ค๋ฅผ ์ด์ฉํด์ ๊ธฐ๋ฅ์ด ๊ฒฐ์ ๋  ์ ์๋ค.
  // -> โ ๊ธฐ๋ฅ์ ๋ถ๋ฆฌํ ์ธํฐํ์ด์ค๋ฅผ ๊ตฌํํ ํด๋์ค๋ฅผ ํตํด์ Composition์ ์ข ๋ ์ ์ฉํ๊ฒ ์ฌ์ฉํ  ์ ์๋ค.
  // -> BUT ํญ์ Composition์ด ์ข์ ๊ฒ์ ์๋๋ค. ์ํฉ์ ๋ง๊ฒ Inheritance์ Composition์ ์ฌ์ฉํ๋ ๊ฒ์ด ์ค์ํ๋ค.
  // -> Composition์ ํ์ฉํ  ์ ์๋ ์ํฉ : ํด๋์ค๊ฐ์ ๊ด๊ณ๊ฐ ์์ง์ ์ธ ๊ด๊ณ๊ฐ ๋ง๋ค์ด์ง๋์ง ํน์ ์์์ ๊น์ด๊ฐ ๊น์ด์ง๊ณ  ์๋์ง์ ๋ฑ์ ๋ํด์ ์๊ฐํ๋ฉด์ Composition์ ํ์ฉํด๋ณด์.
}
