{
  /**
   *  ✅ Stack 만들기
   *  -> 조건1 : 타입스크립트 내부에서 제공해주는 자료구조(Array, Set...) 사용 금지 ❌
   *  -> 조건2 : 문자열을 넣고 빼는 스택
   *
   * ✅ Hint
   * -> 단일 연결 리스트
   *
   * ✅ '📌' : Self Feedback Index 표시
   *
   * ✅ 추가 구현 사항
   *  C -> push ⭕️
   *  R -> getAll
   *  U -> update
   *  D -> pop ⭕️

   */

  type Node = {
    readonly value: string; // 현재 노드의 value
    // 📌 before:Node | null; // -> null 보다는 undefined -> 이런 경우 optional 문법 사용
    readonly before?: Node; // 이전 노드(참조값)
  };
  // 📌 한 단계 wrapping하는 경우, 불변성을 유지하는 것이 좋다 -> readonly 사용

  interface Stack {
    readonly size: number;
    push(value: string): void;
    pop(): Node;
  }

  // 📌 인터페이스의 구현체 네이밍!!
  class StackImpl implements Stack {
    // 초기값 셋팅
    private _size: number = 0;
    private head?: Node;

    constructor(private capacity: number) {}

    get size() {
      return this._size;
    }

    push(value: string) {
      if (this.size === this.capacity) {
        throw new Error('Stack OVERFLOW 😰');
      }
      const afterNode: Node = { value, before: this.head };
      this.head = afterNode;
      this._size++;
    }

    pop(): Node {
      // 📌 현재 (맨 위의) 노드를 리턴할 때, 이 노드가 있을 수도 없을 수도 있다.
      // -> 스택이 비어있는 경우, head : undefined
      // -> 이럴 경우 API(클래스 내부)에서 타입을 구현하는 것보다 무조건 노드를 리턴하게 만드는 것이 좋다.
      //    만약에 그렇지 않다면, 이를 사용하는 사람이 null 체크를 해야 하는 번거로움이 생긴다.
      // -> Node | undefined -> 스택이 비어있는지 여부를 체크하도록 강요하는 코드를 작성하는 것이 좋다.

      // if (this.size <= 0) {
      //   throw new Error('Stack Underflow 😱');
      // }
      // 📌 위에 처럼 작성할 경우 아래 코드에서 코드상 this.head가 undefined인지 여부를 체크하는게 아니기 때문에
      //    에러가 발생한다. 아마도 위 코드는 인간이 스택을 이해할 때는 this.head에 null/undefined가 들어갈 수 없는 것일지라도
      //    컴퓨터가 이 코드상으로 이해할 때는 this.head에 null/undefined가 들어갈 수 있기 때문에 에러가 나는것 같다. 🤪

      // 📌 null check
      // -> head가 Node인지 undefined인지를 체크하는 코드
      // -> 그런데 왜 this.head === undefined 라고 사용하지 않는 이유는?
      // -> === 엄격한 비교로서 this.head가 null이 들어가는 경우에는 이 조건에 걸리지 않는다. 런타임에러가 발생!!
      // -> this.head가 null이 들어가는 경우 : 일반 자바스크립트 코드로서 동작하는 경우
      // -> 그래서 아래와 같이 this.head == null 로서 느슨한 비교를 하면, 이러한 경우에선 null과 undefined가 동등하기에
      //    null 뿐만아니라 undefined도 체크할 수 있게 된다.
      if (this.head == null) {
        throw new Error('Stack UNDERFLOW 😱');
      }

      const currentNode = this.head;
      this.head = currentNode.before;
      this._size--;
      return currentNode;
    }
  }

  const stack = new StackImpl(10);

  for (let i = 0; i < 4; i++) {
    stack.push('jjanmo');
    stack.push('hello');
  }

  while (stack.size > 0) {
    console.log(stack.pop().value, stack.size);
  }
}
