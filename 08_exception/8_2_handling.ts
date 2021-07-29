{
  class NetworkClient {
    tryConnect(): void {
      throw new Error('no network 😱');
    }
  }

  class UserService {
    constructor(private client: NetworkClient) {}

    login() {
      console.log('Login Now ✅');
      this.client.tryConnect();
      // 👎
      // try {
      //   this.client.tryConnect();
      //   // login logic
      // } catch (e) {
      //   console.log(`catch ${e}`);
      // }
    }
  }

  class App {
    constructor(private userService: UserService) {}

    run() {
      // 👍
      try {
        this.userService.login();
        console.log('Login Complete ...😎');
      } catch (e) {
        console.log(`catch ${e}`);
        // 의미있는 에러처리가 가능 -> ex) 네트워크 오류에 대한 메세지(모달 or 다이얼로그)를 띄울 수 있다
      }
    }
  }

  const client = new NetworkClient();
  const user = new UserService(client);
  const app = new App(user);
  app.run(); // error!!
  // -> Quiz : 어디서 에러처리를 하는 것이 좋을까?
  // 1) UserService의 login로직에서 에러가 발생하기 때문에 그곳에서 에러핸들링을 한다.!!
  // -> 결과적으로 에러는 잡히고 어플리케이션은 다운되지않았다.
  // -> BUT, 에러를 잡았는데 UserService에서 에러에 대한 반응으로 의미있게 할 수 있는게 무엇이 있을까? 없다...😱
  // 2) ⭐️ 에러가 발생했을 때, 에러에 대해 고급스럽게, 우아하게, 정확하게 처리할 수 없는 곳에서는 catch하지 않는 것이 좋다!!
  // -> 그래서 UserService가 아니라 App에서 에러핸들링을 하는 것이 좋다. App에서는 에러 핸들링에 대한 의미있는 처리를 해 줄 수 있기 때문에
}
