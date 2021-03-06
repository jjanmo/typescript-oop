{
  interface Employee {
    pay(): void;
  }

  class FullTimeEmployee implements Employee {
    pay() {
      console.log('full time!');
    }
    workFullTime() {}
  }

  class PartTimeEmployee implements Employee {
    pay() {
      console.log('part time!');
    }
    workPartTime() {}
  }

  // ๐ ์ธ๋ถ์ ์ธ ํ์์ ์ธ์๋ก ๋ฐ์์ ์ถ์์ ์ธ ํ์์ผ๋ก ๋ฆฌํดํ๋ ํจ์๋ ๐ฉ
  // -> ์ ๋ค๋ฆญ์ผ๋ก ๋ค์ ๊ตฌํ
  function payBad<T>(employee: Employee): Employee {
    employee.pay();
    return employee;
  }

  // ์ ๋ค๋ฆญ์ ์กฐ๊ฑด : ์ ๋ค๋ฆญ์ด๊ธด ํ์ง๋ง Employee๋ฅผ ํ์ฅํ ํ์๋ง ๊ฐ๋ฅ
  function pay<T extends Employee>(employee: T): T {
    employee.pay();
    return employee;
  }

  const jjanmo = new FullTimeEmployee();
  const michael = new PartTimeEmployee();

  jjanmo.workFullTime();
  michael.workPartTime();

  /**
   *  ๐ ํจ์ payBad์ ๋ฌธ์ ์ !!
   *  const jjanmoAfterPay = payBad(jjanmo);
   *  -> jjanmoAfterPay๋ ์ด์  ํ์์ด ๋ฌ๋ผ์ก๊ธฐ๋๋ฌธ์ ๋ค์ work๋ฅผ ํ  ์ ์๋ค(Employee ํ์์๋ ๊ตฌํ๋์ด์์ง ์๊ธฐ ๋๋ฌธ์)
   */

  const jjanmoAfterPay = pay(jjanmo);
  const michaelAfterPay = pay(michael);

  jjanmoAfterPay.workFullTime();
  michaelAfterPay.workPartTime();

  // Quiz
  // -> ์๋์ ๊ฐ์ด ๋์ํ๋ getValue๋ผ๋ ํจ์๋ฅผ ์ ๋ค๋ฆญ์ ์ด์ฉํ์ฌ ๋ง๋ค์ด๋ณด๊ธฐ
  const obj1 = {
    name: 'jjanmo',
    age: 20,
  };

  const obj2 = {
    animal: '๐ฆ',
  };

  // ๐ K extends keyof T : K๋ T์ key ํ์์ ํ๊ฐ์ง์ด๋ค ๋ผ๋ ์๋ฏธ!!
  // T[K] : object Tํ์์ K๋ผ๋ ํคํ์์ ๊ฐ์ง ๊ฐ์ด ๋ฆฌํด๋๋ค ๋ ์๋ฏธ!!
  function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }

  console.log(getValue(obj1, 'name')); // jjanmo
  console.log(getValue(obj1, 'age')); // 20
  console.log(getValue(obj2, 'animal')); // ๐ฆ

  // console.log(getValue(obj2, 'name')); //error : name์ obj2์ ํค ๊ฐ์ค์ ํ๊ฐ์ง๊ฐ ์๋๋ค.
}
