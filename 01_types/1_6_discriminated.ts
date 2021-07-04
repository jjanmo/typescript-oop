{
  /**
    Union에서 마지막에 풀었던 퀴즈의 내용을 업그레이드 시켜보자!!
    -> discriminated union이라는 개념을 이용해서 이를 업그레이드 시킬수 있다.
    -> 유니온 타입에 같은 이름의 프로퍼티를 둠으로써 이를 이용하여 간편하게 구분할 수 있다.
   */

  type SuccessState = {
    type: 'success';
    response: {
      body: string;
    };
  };
  type FailState = {
    type: 'fail';
    reason: string;
  };
  type LoginState = SuccessState | FailState;

  function printLoginState(state: LoginState) {
    if (state.type === 'success') {
      const {
        response: { body },
      } = state;
      console.log(`⭕️ ${body}`);
    } else {
      const { reason } = state;
      console.log(`❌ ${reason}`);
    }
  }
}
