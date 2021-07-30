// Error vs Error State : WHEN ??
// -> 언제 Error를 사용하고 언제 Error State를 사용할까??
// 📌 try-catch에서 넘어오는 error의 경우 타입정보가 존재하지 않는다. (✅ tsconfig에서 target을 es6이상으로 설정하면 타입 분기가 된다고 한다.)
// -> catch(e)로 넘어오는 순간 any타입이 되기 때문에

{
  // class TimeOutError extends Error {}
  // class OfflineError extends Error {}
  // 위의 클래스처럼 세부적인 에러를 결정하고 싶을때 -> error state를 사용하는 것이 좋다!!

  type FailureState = {
    result: 'failure';
    reason: 'timeout' | 'down' | 'offline'; // 이밖에 다양한 이유가 있을 수 있다.
  };

  type SuccessState = {
    result: 'success';
  };

  type ResultState = SuccessState | FailureState;

  class NetworkClient {
    // 이 곳에서 에러가 발생할 수 있는 원인에 대해선 어느정도 예상이 가능하다. (⭐️ 예상가능한 예외 상황)
    // -> 예상하지 못하는 곳에 사용하는 throw를 남발(?)하기 보다 어떤 상태인지에 대한 Resultstate를 만들어서 사용하는 것이 더 좋다.
    // -> 각각의 에러 상태에 따라서 각기 다른 처리를 해줄 수 있다.
    tryConnect(): ResultState {
      // 여기서 위에서 정의한 예상 가능한 상태를 바탕으로 로직을 구현할 수 있다.
      return {
        result: 'success',
      };
    }
  }

  class UserService {
    constructor(private client: NetworkClient) {}

    login() {
      console.log('Login Now ✅');
      this.client.tryConnect();
    }
  }

  class App {
    constructor(private userService: UserService) {}

    run() {
      try {
        this.userService.login();
        console.log('Login Complete ...😎');
      } catch (error) {
        // ❌ 불가능 : try-catch 안에서의 error 타입은 존재하지 않는다 -> any type
        // if (error instanceof TimeOutError) {}

        console.log(`catch ${error}`);
      }
    }
  }

  const client = new NetworkClient();
  const user = new UserService(client);
  const app = new App(user);
}
