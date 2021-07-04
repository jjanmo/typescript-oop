{
  /**
    * Type Aliases
    alias : 별명 -> 타입에 별명을 붙인다??
    -> 새로운 타입을 내가 정의할 수 있다!!
  **/

  type Text = string;
  const name: Text = 'jjanmo';
  const address: Text = 'seoul';

  type Age = number;
  let count: Age = 0;

  // object 타입을 우리가 원하는 타입으로 정의할 수 있다.
  type Phone = {
    brand: string;
    name: string;
    price: number;
    release: Date;
  };

  const myPhone: Phone = {
    brand: 'Apple',
    name: 'iPhone 12 pro',
    price: 1200000,
    release: new Date('2020-10-13'),
  };

  /**
   * String Literal Types
   * -> 타입을 문자열로 지정할 수 있다. cf) 문자열 뿐만아니라 숫자, 불리언 등도 이런형태로 정의할 수 있다.
   * -> Q. 그렇다면 이러한 타입을 왜 정의하는 것일까? 🔥 이 부분에 대한 의문을 가지고 공부해보자!!
   * -> A. union.ts 파일을 보면 그 예시를 바로 확인할 수 있다!!!
   */

  type Greeting = 'Hello World';
  let hello: Greeting;
  // hello = 'Hello jjanmo'; // error : type이 Greeting 이기때문에 항상 'Hello World'라는 문자열만을 할당할 수 있다.
  hello = 'Hello World';

  type JSON = 'json';
  const json: JSON = 'json';
}
