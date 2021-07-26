{
  interface Either {
    left: () => number;
    right: () => number;
  }

  class EitherImpl implements Either {
    constructor(private leftValue: number, private rightValue: number) {}

    left() {
      return this.leftValue;
    }

    right() {
      return this.rightValue;
    }
  }

  const simpleEither = new EitherImpl(10, 33);
  console.log(simpleEither.left());
  console.log(simpleEither.right());

  // 단순 숫자타입이 아닌 유연한 여러 타입을 받고 리턴할 수 있도록 하기 위해선 제너릭을 사용하면 된다.
}
