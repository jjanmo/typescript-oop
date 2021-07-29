{
  // Java : Exception
  // JavaScript : Error

  type Direction = 'up' | 'down' | 'left' | 'right';

  const position = {
    x: 0,
    y: 0,
  };

  function move(direction: Direction): void {
    switch (direction) {
      case 'up':
        position.y++;
        break;
      case 'down':
        position.y--;
        break;
      case 'left':
        position.x--;
        break;
      case 'right':
        position.x++;
        break;
      default:
        const invalid: never = direction;
        throw new Error(`invalid direction : ${invalid}`);

      // 📌 trick
      // 만약 swtich/case문에서 걸리지 않는 값을 사용한다면(유니언 타입에 해당하는 값을 사용하지 않는 경우),
      // 해당 타입과 never타입이 맞지 않는다는 컴파일 단계의 에러로 인해서 이를 수정할 수 있다.
      // 이처럼 에러핸들링을 통해서 일어날 가능성이 있는 에러에 대한 대비를 해야한다.
    }
  }
}
