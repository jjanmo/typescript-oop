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
}
