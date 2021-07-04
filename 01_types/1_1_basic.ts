{
  /*
  * JavaScript 변수 선언
    var : old 💩  not recommended
    let ES6
    const ES6
    
  * JavaScript Basic Type
    Primitive : number string boolean null undefined symbol bigint
    Reference(object) : function array ...

    -> 타입스크립트 역시 위와 동일하나, 좀 더 엄격하게 타입을 구분한다.
  */

  const num: number = 10;
  const str: string = 'string';
  const bool: boolean = true;

  // undefined
  let age: undefined = undefined; // 💩 비추
  let name: string | undefined; // 1️⃣
  name = undefined;
  name = 'jjanmo';

  // example
  function findSomething(): string | undefined {
    const result = 'find something!'; // 이 부분을 뭔가를 찾는 로직이 들어간다. 여기서는 간단하게 문자열로 표현!
    if (result) return 'something';
    else return undefined;
  }

  // null
  let human: null; // 💩 비추
  // human = 'jjanmo'; // null 타입으로 정의했기 때문에 다른 타입을 담을 수 없다.
  let human2: string | null; // 2️⃣
  human2 = null;
  human2 = 'jjanmo';

  // ✅ 데이터 타입이 결정되어있지 않거나 결정되었다는 의미에서 사용하기 위해선 1️⃣을 주로 사용한다.
  // -> 값이 있거나 없다 라는 의미에서는 2️⃣을 사용하는 것이 더 맞을 수도 있다.

  // unknown 💩
  let notSure: unknown; // 💩 어떤 타입이 들어갈지 모를 때, but 왠만하면 사용하지 않는 것이 좋다
  // 그런데 있는 이유? 자바스크립트 라이브러리를 이용하는 경우에 리턴타입을 모를수 있다. 이런 경우 사용하기 위해서 존재!
  // 그럼에도 사용하지 않는 것을 추천!
  notSure = 0;
  notSure = 'string';
  notSure = null;

  // any 💩 : unknown과 마찬가지!!
  let anything: any = 0;
  anything = 'anything';

  // void
  function logText(text): void {
    console.log(text);
    // return;  // 사실 이것이 생략되어 있는 것!
  }
  // 아무것도 리턴하지 않는 함수에 대해선 void 타입을 사용한다.
  // 일반적으로 함수에 void 타입을 붙이긴하지만, 안붙여도 된다. 붙일지 말지에 대한 것은 회사의 컨벤션으로 지정하여 사용할 수 있다.

  let notReturn: void = undefined; // 💩 : 이렇게 사용하는 경우는 99.9999% 없다. 항상 비어있는 값만 할당해야하기 때문에!

  // never : 함수에서 절대로 값을 리턴할 수 없을 때
  function throwError(message: string): never {
    // error 발생 -> message -> server
    throw new Error(message); // 1)
    while (true) {} // 2) 무한루프
  }

  let neverEnding: never; // 💩 💩 💩

  // object  💩
  let obj: object;

  function getObject(obj: object) {}
  getObject({ name: 'jjanmo' });
  getObject({ cafe: 'coffebean' });
  getObject([1, 2, '10', '123']);

  // object타입은 어떠한 object든 다 된다. 좀 더 구체적으로 object를 정의해주는 것이 좋다.
}
