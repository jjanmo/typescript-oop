{
  // type (alias) vs interface 비교하기

  type PositionType = {
    x: number;
    y: number;
  };

  interface PositionInterface {
    x: number;
    y: number;
  }

  // 공통점

  // 1) object에 사용이 가능하다.
  const obj1: PositionType = {
    x: 10,
    y: 20,
  };

  const obj2: PositionInterface = {
    x: 10,
    y: 20,
  };

  // 2) class에 사용이 가능하다.
  class Position1 implements PositionType {
    x = 10;
    y = 20;
  }

  class PositionImpl implements PositionInterface {
    x = 10;
    y = 20;
  }

  // 3) extends => 확장이 가능하다
  interface ZPositionInterface extends PositionInterface {
    z: number;
  }

  type ZPositionType = PositionType & { z: number }; // intersection 이용

  // 차이점

  // 1) interface만 결합이 가능하다
  // interface PositionInterface {
  //   h: number;
  // }
  // class Position implements PositionInterface {
  //   x = 10;
  //   y = 20;
  //   h = 30;
  // }
  // console.log(new Position()); // 결합된 PositionInterface 는 x,y,h 모두를 구현해야한다.

  // type PositionType{ } // -> error

  // 인터페이스는 같은 인터페이스를 여러 번 정의해서 결합이 가능하지만, 타입은 할 수 없다(duplicate 에러 발생!!).

  // 2) Type aliases is can use computed properties
  //  -> 추후 공부할 예정 🧐

  type Person = {
    name: string;
    age: number;
  };

  type Name = Person['name']; // Name의 타입은 자동적으로 string 타입이 된다.
  type Direction = 'left' | 'right' | 'up' | 'down';

  // 인터페이스와 타입의 개념적 비교

  // 1) 인터페이스
  // 설계도 : 어떻게 구현할 것인지를 정해 놓은 것
  // 인터페이스를 토대로 다양한 상황 속에서도 (인터페이스에 적혀 있는) 일정한 규격사항을 따라 구현할 수 있다.
  // -> 인터페이스를 보면 떠오르는 생각 : 인터페이스를 바탕으로 구현된 특정 클래스가 무엇이 있을까??

  // 2) 타입(type aliases)
  // 어떠한 데이터에 값을 담을 때, 그 값들의 타입을 정의하여 사용한다.
  // -> 타입을 보면 떠오르는 생각 : 데이터에 어떤 타입을 담아야 할까?
}
