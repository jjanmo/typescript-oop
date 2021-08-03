{
  // 앞에서는 직접 구현해보았지만 사실 이미 내부적으로 구현되어 있다.
  // 이미 타입스크립트에서는 유틸리티 타입이라고 해서 구현되어 있는 것들이 있다.

  type ToDo = {
    title: string;
    description: string;
  };

  function add(todo: Readonly<ToDo>) {
    // todo.title = 'editted'; // error  : ToDo를 이미 정해져있는 유틸리티 타입을 통해서 readonly 타입으로 변환하여 사용하였다. 📌 커맨트 + 클릭을 통해서 내부에서 정해진 타입에 대해서 살펴볼수 있다.
  }
}
