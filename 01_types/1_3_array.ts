{
  // Array
  let animals: string[] = ['🐶', '🐱', '🐭'];
  let numbers: Array<number> = [1, 20, 33, 77];
  // ->  위 두개의 타입 지정 방식은 같은 의미를 지니고 있다. 단 차이점이 있다면, readonly를 사용할 때만 다르다.

  function getMessage(message: readonly string[]) {}
  // function getMessage(message: readonly Array<string>) {}
  // -> readonly를 사용하면서 위에서 처럼 사용하는것을 허용하지 않고 있다.
  // -> 코드의 일관성을 유지하기 위해서 type[] 형태로 사용하는 것을 선호한다고 한다. ⭐️

  // Tuple -> ⭐️ interface, type alias, class 로 대체 사용을 추천
  // -> 서로 다른 타입을 함께 가질 수 있는 배열
  let student: [string, number];
  student = ['jjanmo', 95];
  student[0];
  student[1];
  // student에 0, 1 이 무엇인지 알 수 없다. 가독성이 안좋다!! 👎
  // -> 결과적으로 튜플을 사용하는 것을 비추한다. 그럼에도 사용하고 싶다면 아래와 같이 사용할 수 있다.

  let [name, score] = student; // object destructuring을 사용하여 해당 타입에 대한 의미를 변수로 지정할 수 있다.
  console.log(name);
  console.log(score);

  // 실제 예시
  // react 에서의 useState
  // const [count, setCount] = useState(0)
  // -> 사용하는 타입을 동적으로 정의하여 리턴하고, 사용하는 사람이 상황에 맞게 이름(변수)을 지정하여 사용할 수 있게 만든 아주 좋은 튜플의 예시
}
