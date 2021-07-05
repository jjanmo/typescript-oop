{
  /**
   * Type Assertions 💩
   *  -> 필요한 경우도 있지만 조심히 사용해야한다.
   */

  // ex1)
  function getString(): any {
    // return 'hello'; // 1)
    return 5; // 2)
  }

  const result = getString();
  console.log((result as string).length); // 문자열임을 단언한다는 의미
  // -> 타입 단언을 했기때문에 컴파일 단계에서는 에러가 나지 않는다. 하지만 런타임에서 예상치 못한 버그나 에러가 발생할 수 있다.
  console.log(<string>result.length); // 위와 같은 타입단언

  // ✅ 타입 단언은 정말 정말 100% 타입을 확신할 때 사용하는 것이 좋다.

  // ex2)
  const blockout: any = 1004;
  // (blockout as Array<number>).push(10); // error : blockout.push is not a function

  // ex3)
  function findNames(): string[] | undefined {
    return undefined;
  }

  const names = findNames()!;
  //names.push('jjanmo'); // 경고 : 배열일 수도 있지만 undefined일 수도 있기 때문에... -> 이 때 배열임을 확신한다면 느낌표를 사용할 수 있다.
  // names!.push('jjanmo');

  // ex4)
  // const $block = document.querySelector('div')!;
  // console.log($block.textContent); // 경고 메세지를 띄운다! null일수도 있기때문에. 실제 구현부분으로 들어가봐도 타입이 null일수도 있다고 적혀있음

  /**
   * -> 이러한 경우
   *if($block) { code here } 처럼 조건문을 걸어줄 수 있다.

   * -> 만약에 100% 존재함을 확신한다면 !를 찍어줄 수 있다.
  */
}
