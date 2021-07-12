{
  /**
   * Getter & Setter
   */

  class User {
    name: string;
    age: number;
    template: string;

    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
      this.template = `This is ${name} and ${age} years old 😀`;
    }
  }

  const user = new User('Enstein', 25);
  console.log(user.template); // 1)
  user.name = 'jjanmo';
  console.log(user.template); // 2)
  // 1번과 2번은 동일한 값이 출력된다.
  // WHY : 생성자를 통해서 처음 멤버변수인 name, age, template가 설정된다. 그 후 name을 재설정해준다.
  // 하지만 template은 재설정해준 것이 아니기때문에 여전히 생성자에 의해서 만들어질 때와 같은 상태이다.

  console.log('---------------------------------------');

  class User1 {
    name: string;
    age: number;

    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }

    // getter는 메소드로 접근하는 것이 아니라 일반 변수처럼 접근하여 사용해야한다.(setter도 마찬가지)
    // -> 이렇게 getter를 사용하면 위의 예와는 다르게 멤버변수가 바뀔 때마다 변경된 값을 받아서 사용할 수 있다.
    get template() {
      return `This is ${this.name} and ${this.age} years old 😀`;
    }
  }

  const user1 = new User1('jjanmo', 30);
  console.log(user1.template);
  user1.name = 'michael';
  user1.age = 22;
  console.log(user1.template);
  // console.log(user1.template()); // error

  console.log('---------------------------------------');

  class User2 {
    // 접근제한자를 앞에 붙이게 되면, 멤버변수 설정하고 생성자에서 다시 전달해주고 등등 들어가는 공수가 많아진다.
    // -> 이를 간단하게 바꿀수 있다.

    // private name: string;
    // private age: number;

    // constructor(name: string, age: number) {
    //   this.name = name;
    //   this.age = age;
    // }

    // 위의 코드를 줄인 것 👍
    // -> 아래와 같이 사용하면 자동적으로 접근제한자 설정과 함께 멤버변수에 값이 할당된다.
    // -> private 멤버변수의 경우 보통 _를 사용해서 변수 이름을 지정한다. 경험상 setter를 할 때 보통 멤버변수와 같은 변수로 하는 경우가 많은데
    //  이런 경우 _를 사용하지 않으면 duplicate error가 발생하기때문에 _를 사용하는 것을 추천한다.
    constructor(private _name: string, private _age: number) {}

    get template() {
      return `This is ${this._name} and ${this._age} years old 😀`;
    }

    set name(name: string) {
      this._name = name;
    }

    set age(num: number) {
      if (num < 0) {
        throw new Error('should be greater than 0');
      }
      this._age = num;
    }
  }

  const user2 = new User2('sohee', 33);
  // console.log(user2.age); // error : private
  console.log(user2.template);
  user2.name = 'chulsu';
  // user2.age = -15; // error by setter validation
  user2.age = 15;
  console.log(user2.template);
}
