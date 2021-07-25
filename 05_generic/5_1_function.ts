{
  // ✅ null의 여부를 체크하는 함수를 만들어보자
  function checkNotNullBad(arg: number | null): number {
    if (arg == null) {
      throw new Error('not valid argument');
    }
    return arg;
  }

  const result1 = checkNotNullBad(77);
  console.log(result1);
  checkNotNullBad(null);

  function checkNotNullAny(arg: any | null): any {
    if (arg == null) {
      throw new Error('not valid argument');
    }
    return arg;
  }

  const resutl2 = checkNotNullAny('33');
  console.log(resutl2);
  checkNotNullAny(null);

  // ☑️ 문제점
  // 1. 타입이 고정 되어 있어서 항상 숫자로 들어온 경우에만 null 체크가 이루어진다
  // -> 모든 타입별로 null 체크 함수를 만든다! 💩👎
  // 2. any 타입으로 변환하여 함수를 만든다.
  // -> 그렇다면 굳이 타입스크립트를 왜 쓰니?? 타입 보장이 안된다. 💩👎
  // ✅ 타입을 보장하면서 여러 타입을 사용할 수 있게 하는 방법 : Generic
  // -> +1) 어떤 타입이든 받을 수 있다. +2) 코딩을 할 때(컴파일시) 타입이 결정된다.

  function checkNotNull<T>(arg: T | null): T {
    if (arg == null) {
      throw new Error('not valid argument');
    }
    return arg;
  }

  const number = checkNotNull(10); // 인자로 10이 들어가는 순간 type이 number로 보장된다
  const string: string = checkNotNull('hello'); // 명시적으로 타입을 적어주는 것도 좋다
}
