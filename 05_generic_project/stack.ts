{
  /**
   *  해당 코드는 04_oop_project에서 타입스크립트를 이용해서 스택을 구현한 것이다.
   *  -> 이를 제네릭을 이용해서 리팩토링하시오 🤞
   */
  interface Stack<T> {
    readonly size: number;
    push(value: T): void;
    pop(): T;
  }

  type Node<T> = {
    readonly value: T;
    readonly next?: Node<T>; // 이전 노드를 가르키고 있음
  };

  class StackImpl<T> implements Stack<T> {
    private _size: number = 0;
    private head?: Node<T>;

    constructor(private capacity: number) {}

    get size() {
      return this._size;
    }

    push(value: T) {
      if (this.size === this.capacity) {
        throw new Error('Stack OVERFLOW 😰');
      }
      this._size++;
      const afterNode = { value, next: this.head }; // 타입의 정보를 생략 가능 : 타입 추론
      this.head = afterNode;
    }

    pop(): T {
      if (this.head == null) {
        throw new Error('Stack UNDERFLOW 😱');
      }

      const currentNode: Node<T> = this.head;
      this.head = currentNode.next;
      this._size--;
      return currentNode['value'];
    }
  }

  const stack = new StackImpl<string>(10);

  stack.push('jjanmo');
  stack.push('hello');
  stack.push('world');

  while (stack.size > 0) {
    console.log(stack.pop(), stack.size);
  }

  const numberStack = new StackImpl<number>(10);

  numberStack.push(77);
  numberStack.push(100);
  numberStack.push(18);

  while (numberStack.size > 0) {
    console.log(numberStack.pop(), numberStack.size);
  }
}

/**
 * 📌 스택에 제네릭을 적용할 때, 들어야 하는 생각?
 * -> 1) 스택 안에 "다양한 타입"의 데이터를 담고 싶다.
 * -> 2) 다양한 데이터를 같은 코드로 "재사용"하고 싶다.
 */
