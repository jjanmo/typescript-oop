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

  // 📌 세부적인 타입을 인자로 받아서 추상적인 타입으로 리턴하는 함수는 💩
  // -> 제네릭으로 다시 구현
  function payBad<T>(employee: Employee): Employee {
    employee.pay();
    return employee;
  }

  // 제네릭의 조건 : 제네릭이긴 하지만 Employee를 확장한 타입만 가능
  function pay<T extends Employee>(employee: T): T {
    employee.pay();
    return employee;
  }

  const jjanmo = new FullTimeEmployee();
  const michael = new PartTimeEmployee();

  jjanmo.workFullTime();
  michael.workPartTime();

  /**
   *  📌 함수 payBad의 문제점!!
   *  const jjanmoAfterPay = payBad(jjanmo);
   *  -> jjanmoAfterPay는 이제 타입이 달라졌기때문에 다시 work를 할 수 없다(Employee 타입에는 구현되어있지 않기 때문에)
   */

  const jjanmoAfterPay = pay(jjanmo);
  const michaelAfterPay = pay(michael);

  jjanmoAfterPay.workFullTime();
  michaelAfterPay.workPartTime();

  // Quiz
  // -> 아래와 같이 동작하는 getValue라는 함수를 제네릭을 이용하여 만들어보기
  const obj1 = {
    name: 'jjanmo',
    age: 20,
  };

  const obj2 = {
    animal: '🦍',
  };

  // 📌 K extends keyof T : K는 T의 key 타입의 한가지이다 라는 의미!!
  // T[K] : object T타입의 K라는 키타입을 가진 값이 리턴된다 는 의미!!
  function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }

  console.log(getValue(obj1, 'name')); // jjanmo
  console.log(getValue(obj1, 'age')); // 20
  console.log(getValue(obj2, 'animal')); // 🦍

  // console.log(getValue(obj2, 'name')); //error : name은 obj2의 키 값중에 한가지가 아니다.
}
