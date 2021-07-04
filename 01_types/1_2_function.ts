import { resolve } from 'path/posix';

{
  // // js function1
  // function jsAdd(num1, num2) {
  //   return num1 + num2;
  // }
  // // -> 위 함수의 문제점 : 만약에 인자로 숫자가 아닌 것이 들어와도 아무런 에러가 없이 작동한다.
  // // 만약에 문자열이 같이 들어오게 되면 그 값이 문자열의 결합으로 나온 결과값을 리턴한다.

  // // ts function1
  // function tsAdd(num1: number, num2: number): number {
  //   return num1 + num2;
  // }

  // // js function2
  // function jsFetchNumber(id) {
  //   // code ...
  //   // code ...
  //   return new Promise((resolve, reject) => {
  //     resolve(100);
  //   });
  // }

  // // ts function2
  // function tsFetchNumber(id: string): Promise<number> {
  //   return new Promise((resolve, reject) => {
  //     resolve(100);
  //   });
  // }

  // Optional Parameter ?: 인자가 있어도 되고 없어도 되는 경우
  function logName(firstName: string, lastName?: string) {
    console.log(firstName);

    // console.log(lastName); // 전달되지 않은 인자에 대해선 undefined가 출력된다
    console.log(lastName || '');
  }

  logName('jjanmo', 'yan');
  logName('nunu');
  logName('toto', undefined);

  // Default Parameter
  function logMessage(message: string = 'this is default message') {
    console.log(message);
  }
  logMessage('hello world');
  logMessage();

  // Rest Parameter
  // Q. number[] vs [number] 차이는??, 아래 예제에서 [number]를 사용하게 되면 에러가 뜬다.
  // -> [number]는 배열을 정의한 것이 아니라 튜플을 정의한 것! 그렇기 때문에 배열 안에 number 타입이 1개 들어간다는 의미
  function sum(...args: number[]): number {
    return args.reduce((acc, cur) => acc + cur, 0);
  }
  console.log(sum(1, 2));
  console.log(sum(1, 2, 3, 4, 5));
  console.log(sum(10, 20, 30, 40, 50, 60, 70));
}
