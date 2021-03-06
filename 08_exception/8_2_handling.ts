{
  class NetworkClient {
    tryConnect(): void {
      throw new Error('no network π±');
    }
  }

  class UserService {
    constructor(private client: NetworkClient) {}

    login() {
      console.log('Login Now β');
      this.client.tryConnect();
      // π
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
      // π
      try {
        this.userService.login();
        console.log('Login Complete ...π');
      } catch (e) {
        console.log(`catch ${e}`);
        // μλ―Έμλ μλ¬μ²λ¦¬κ° κ°λ₯ -> ex) λ€νΈμν¬ μ€λ₯μ λν λ©μΈμ§(λͺ¨λ¬ or λ€μ΄μΌλ‘κ·Έ)λ₯Ό λμΈ μ μλ€
      }
    }
  }

  const client = new NetworkClient();
  const user = new UserService(client);
  const app = new App(user);
  app.run(); // error!!
  // -> Quiz : μ΄λμ μλ¬μ²λ¦¬λ₯Ό νλ κ²μ΄ μ’μκΉ?
  // 1) UserServiceμ loginλ‘μ§μμ μλ¬κ° λ°μνκΈ° λλ¬Έμ κ·Έκ³³μμ μλ¬νΈλ€λ§μ νλ€.!!
  // -> κ²°κ³Όμ μΌλ‘ μλ¬λ μ‘νκ³  μ΄νλ¦¬μΌμ΄μμ λ€μ΄λμ§μμλ€.
  // -> BUT, μλ¬λ₯Ό μ‘μλλ° UserServiceμμ μλ¬μ λν λ°μμΌλ‘ μλ―Έμκ² ν  μ μλκ² λ¬΄μμ΄ μμκΉ? μλ€...π±
  // 2) β­οΈ μλ¬κ° λ°μνμ λ, μλ¬μ λν΄ κ³ κΈμ€λ½κ², μ°μνκ², μ ννκ² μ²λ¦¬ν  μ μλ κ³³μμλ catchνμ§ μλ κ²μ΄ μ’λ€!!
  // -> κ·Έλμ UserServiceκ° μλλΌ Appμμ μλ¬νΈλ€λ§μ νλ κ²μ΄ μ’λ€. Appμμλ μλ¬ νΈλ€λ§μ λν μλ―Έμλ μ²λ¦¬λ₯Ό ν΄ μ€ μ μκΈ° λλ¬Έμ
}
