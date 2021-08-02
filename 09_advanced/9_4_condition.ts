{
  //example1
  type Check<T> = T extends string ? boolean : number; // 조건 형태로 타입을 결정할 수 있다.
  type Type1 = Check<boolean>; // Type1 : number
  type Type2 = Check<string>; // Type2 : boolean

  //example2 : 타입스크립트 공식 문서 예시
  // -> 연속적인 3항 연산자를 이용해서 표현
  // -> 개인적인 생각으로는, 연속된 3항연산자는 가독성이 떨어지기 때문에 별로라고 하는데... 공식문서에 이런 코드가 있다니... 신기방기 🧐
  // -> Q. 타입 안에서 조건문을 사용할 수 있는 방법이 없기때문에... 사용하는 방법일까?

  type TypeName<T> = T extends string
    ? 'string'
    : T extends number
    ? 'number'
    : T extends boolean
    ? 'boolean'
    : T extends undefined
    ? 'undefined'
    : T extends Function
    ? 'function'
    : 'object';
}
