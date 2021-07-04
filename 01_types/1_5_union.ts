namespace Union {
  /**
   *  Union Types : or,  |
   */
  type Direction = 'up' | 'down' | 'left' | 'right'; // String Literal Types를 이용한 것

  function move(direction: Direction) {
    console.log(`move to ${direction}`);
  }

  move('down');
  move('right');

  type Size = 4 | 8 | 12;
  const mapSize: Size = 8;

  // 실제 예시
  // 상황 : login function  -> success, fail
  type SuccessState = {
    response: {
      body: string;
    };
  };
  type FailState = {
    reason: string;
  };
  type LoginState = SuccessState | FailState;

  function login(): LoginState {
    // success
    return {
      response: {
        body: 'Login Success',
      },
    };
  }
  /**
   * 위의 예시가 실제로 아래와 같은 형태로 쓰여질 수 있다.
   * function login(id:string, password:string):Promise<LoginState>{}
   */

  /**
   *  Quiz
   *  printLoginState(state: LoginState)
   *  success -> body
   *  fail -> reason
   */

  function printLoginState(state: LoginState) {
    if ('response' in state) {
      // success
      const {
        response: { body },
      } = state;
      console.log(`⭕️ ${body}`);
    } else if ('reason' in state) {
      // else {} 가능 : 2가지 경우의 수밖에 없기 때문에
      // fail
      const { reason } = state;
      console.log(`❌ ${reason}`);
    }
  }

  // 위의 예시처럼 객체 안의 프로퍼티의 존재 여부를 확인하는 in 연산자를 통해서 구분할 수 있다
  // BUT 좋은 방법은 아님!!!
}
