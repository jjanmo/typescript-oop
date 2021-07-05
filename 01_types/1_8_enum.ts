{
  /**
   *  Enum : 여러가지 상수들(의 집합)을 모아서 한 곳에서 정의하여 사용할 수 있게 도와주는 타입
   */

  // 자바스크립트에는 enum이라는 타입이 따로 존재하지 않는다.
  // -> const를 사용하여 나타낸다.

  const MAX_NUMBER = Number.MAX_SAFE_INTEGER;
  const MAX_NUMBER_OF_PEAPLE_ALLOWED = 5; // 입장 가능 최대 인원

  const DAYS_ENUM = Object.freeze({
    MONDAY: 0,
    TUESDAY: 1,
    WENDSEDAY: 2,
    THURSEDAY: 3,
    FRIDAY: 4,
    SATURDAY: 5,
    SUNDAY: 6,
  });

  // DAYS_ENUM.MONDAY = 10; // error : 객체를 동결하여 변경불가능(immutable)하게 만들었다.
  // -> 값이 변하지 않기때문에 좀 더 안전하게 값을 사용할 수 있다.

  // 타입스크립트는 enum을 사용하여 이러한 것을 간편하게 정의할 수 있다.

  enum Days { // Enum에서는 파스칼케이스로 작성(앞글자만 대문자)
    Monday,
    Tuesday,
    Wendseday,
    Thurseday,
    Friday,
    Saturday,
    Sunday,
  }
  console.log(Days.Monday); // 0
  console.log(Days.Sunday); // 6
  let today: Days = Days.Wendseday;
  console.log(today); // 1
  // enum에 특정 값을 할당하지 않으면 자동으로 맨위에서 0부터하여 값이 할당된다.
  // -> 어떤 하나에 숫자를 할당하면 다른 이넘은 그에 맞게 다음 숫자로 자동으로 증가된 값을 할당받는다. (할당된 전의 값은 변경되지 않는다.)
  // -> 문자열의 경우는 각각 특정값을 지정하여 할당해줘야한다.

  enum Direction {
    Up,
    Down = 15,
    Right,
    Left,
  }
  console.log(Direction.Up, Direction.Down, Direction.Left); // 0 15 17

  // ✅ 결론적으로 enum은 비추!!! : -> Union Type으로 대체하여 사용하는 것을 추천
  // 🔥 Why??
  // 위에서 Days 라는 타입을 가진 변수에 이넘 이외의 값(타입 이외의 값)을 할당해도 컴파일 에러를 발생시키지 않는다.(타입이 보장되지 않는다.)
  today = 30; // not error!!

  // enum Days 대체
  type DaysOfWeek = 'Monday' | 'Tuesday' | 'Wendseday' | 'Thurseday' | 'Friday' | 'Saturday' | 'Sunday';
  let daysOfWeek: DaysOfWeek = 'Sunday';
  // daysOfWeek = 'jjanmo'; // error : type을 벗어난 값이 들어갔기 때문에!! => 타입이 보장된다!!!
}
