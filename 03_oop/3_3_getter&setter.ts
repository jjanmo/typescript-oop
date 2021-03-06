{
  /**
   * Getter & Setter
   */

  class User {
    name: string;
    age: number;
    template: string;

    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
      this.template = `This is ${name} and ${age} years old ๐`;
    }
  }

  const user = new User('Enstein', 25);
  console.log(user.template); // 1)
  user.name = 'jjanmo';
  console.log(user.template); // 2)
  // 1๋ฒ๊ณผ 2๋ฒ์ ๋์ผํ ๊ฐ์ด ์ถ๋ ฅ๋๋ค.
  // WHY : ์์ฑ์๋ฅผ ํตํด์ ์ฒ์ ๋ฉค๋ฒ๋ณ์์ธ name, age, template๊ฐ ์ค์ ๋๋ค. ๊ทธ ํ name์ ์ฌ์ค์ ํด์ค๋ค.
  // ํ์ง๋ง template์ ์ฌ์ค์ ํด์ค ๊ฒ์ด ์๋๊ธฐ๋๋ฌธ์ ์ฌ์ ํ ์์ฑ์์ ์ํด์ ๋ง๋ค์ด์ง ๋์ ๊ฐ์ ์ํ์ด๋ค.

  console.log('---------------------------------------');

  class User1 {
    name: string;
    age: number;

    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }

    // getter๋ ๋ฉ์๋๋ก ์ ๊ทผํ๋ ๊ฒ์ด ์๋๋ผ ์ผ๋ฐ ๋ณ์์ฒ๋ผ ์ ๊ทผํ์ฌ ์ฌ์ฉํด์ผํ๋ค.(setter๋ ๋ง์ฐฌ๊ฐ์ง)
    // -> ์ด๋ ๊ฒ getter๋ฅผ ์ฌ์ฉํ๋ฉด ์์ ์์๋ ๋ค๋ฅด๊ฒ ๋ฉค๋ฒ๋ณ์๊ฐ ๋ฐ๋ ๋๋ง๋ค ๋ณ๊ฒฝ๋ ๊ฐ์ ๋ฐ์์ ์ฌ์ฉํ  ์ ์๋ค.
    get template() {
      return `This is ${this.name} and ${this.age} years old ๐`;
    }
  }

  const user1 = new User1('jjanmo', 30);
  console.log(user1.template);
  user1.name = 'michael';
  user1.age = 22;
  console.log(user1.template);
  // console.log(user1.template()); // error

  console.log('---------------------------------------');

  class User2 {
    // ์ ๊ทผ์ ํ์๋ฅผ ์์ ๋ถ์ด๊ฒ ๋๋ฉด, ๋ฉค๋ฒ๋ณ์ ์ค์ ํ๊ณ  ์์ฑ์์์ ๋ค์ ์ ๋ฌํด์ฃผ๊ณ  ๋ฑ๋ฑ ๋ค์ด๊ฐ๋ ๊ณต์๊ฐ ๋ง์์ง๋ค.
    // -> ์ด๋ฅผ ๊ฐ๋จํ๊ฒ ๋ฐ๊ฟ์ ์๋ค.

    // private name: string;
    // private age: number;

    // constructor(name: string, age: number) {
    //   this.name = name;
    //   this.age = age;
    // }

    // ์์ ์ฝ๋๋ฅผ ์ค์ธ ๊ฒ ๐
    // -> ์๋์ ๊ฐ์ด ์ฌ์ฉํ๋ฉด ์๋์ ์ผ๋ก ์ ๊ทผ์ ํ์ ์ค์ ๊ณผ ํจ๊ป ๋ฉค๋ฒ๋ณ์์ ๊ฐ์ด ํ ๋น๋๋ค.
    // -> private ๋ฉค๋ฒ๋ณ์์ ๊ฒฝ์ฐ ๋ณดํต _๋ฅผ ์ฌ์ฉํด์ ๋ณ์ ์ด๋ฆ์ ์ง์ ํ๋ค. ๊ฒฝํ์ setter๋ฅผ ํ  ๋ ๋ณดํต ๋ฉค๋ฒ๋ณ์์ ๊ฐ์ ๋ณ์๋ก ํ๋ ๊ฒฝ์ฐ๊ฐ ๋ง์๋ฐ
    //  ์ด๋ฐ ๊ฒฝ์ฐ _๋ฅผ ์ฌ์ฉํ์ง ์์ผ๋ฉด duplicate error๊ฐ ๋ฐ์ํ๊ธฐ๋๋ฌธ์ _๋ฅผ ์ฌ์ฉํ๋ ๊ฒ์ ์ถ์ฒํ๋ค.
    constructor(private _name: string, private _age: number) {}

    get template() {
      return `This is ${this._name} and ${this._age} years old ๐`;
    }

    set name(name: string) {
      this._name = name;
    }

    set age(num: number) {
      if (num < 0) {
        throw new Error('should be greater than 0');
      }
      this._age = num;
    }
  }

  const user2 = new User2('sohee', 33);
  // console.log(user2.age); // error : private
  console.log(user2.template);
  user2.name = 'chulsu';
  // user2.age = -15; // error by setter validation
  user2.age = 15;
  console.log(user2.template);
}
