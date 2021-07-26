{
  // 제네릭 타입은 선언하는 순간에는 모른다.
  // -> 이것을 사용하는 순간 그 타입이 결정된다.
  interface Either<L, R> {
    left: () => L;
    right: () => R;
  }

  class EitherImpl<L, R> implements Either<L, R> {
    constructor(private leftValue: L, private rightValue: R) {}

    left(): L {
      return this.leftValue;
    }

    right(): R {
      return this.rightValue;
    }
  }

  const simpleEither1 = new EitherImpl(10, 33);
  //simpleEither1<number, number>와 동일 : 여기선 10과 33을 인자로 넣음으로서 이미 타입이 지정되었다.
  console.log(simpleEither1.left());
  console.log(simpleEither1.right());

  // 단순 숫자타입이 아닌 유연한 여러 타입을 받고 리턴할 수 있도록 하기 위해선 제너릭을 사용하면 된다.

  const simpleEither2 = new EitherImpl({ name: 'jjanmo' }, 'hello world');
  console.log(simpleEither2.left());
  console.log(simpleEither2.right());

  const simpleEither3 = new EitherImpl(true, 'hello world');
  console.log(simpleEither3.left());
  console.log(simpleEither3.right());
}
