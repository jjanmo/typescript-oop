{
  /**
   * Type Inference : 타입을 명시하지 않아도 타입스크립트가 알아서 타입을 추론하여 설정해 주는 것
   * -> 타입에 대한 코드가 줄기 때문에 좋은 것일까??
   * -> NO, 아주 아주 쉬운 경우(원시타입의 경우 등)을 제외하면 왠만하면 타입을 적어주는 것을 추천
   * -> 실무에서는 어떠한 경우에만 타입을 생략할 수 있고 그 외에는 타입을 적어주자는 스타일 가이드를 정해 지키도록 하는 것이 좋다.
   *
   * 아래는 타입 추론에 대한 쉬운 예시들
   */

  let message = 'hello world'; // 타입을 적지 않아도 당연히 문자열

  function log(text = 'default') {
    // 기본값을 지정하면 자동적으로 인자에 해당하는 타입을 지정한다.
    console.log(text);
  }

  log('hello world');
  // log(10); // error

  function add(x: number, y: number) {
    return x + y;
  }
  let result = add(4, 5); //result의 경우 타입을 지정하기 않아도 자동으로 함수의 결과값으로 나온 값이 할당됨으로 그에 맞는 타입을 갖게된다.
}
