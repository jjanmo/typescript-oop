/**
 * Utility Types
 * 타입스크립트는 일반적인 프로그래밍 언어와 다르게 타입을 변환하는 것이 가능하다.
 * -> A type -> [transform] -> A` type or B type
 *
 * -> 1) 어떤 상황에서 어떻게 사용해야하는지
 * -> 2) type tranform이 왜 가능한지, 어떻게 가능한지
 */

{
  // 인덱스 타입이란 객체에서 인덱스로 특정 프로퍼티에 접근하는 것처럼 타입도 인덱스로 타입을 설정하는 것을 말한다.

  const obj = {
    name: 'jjanmo',
    age: 25,
  };

  obj.name; // 'jjanmo'
  obj['age']; // 25

  type Pet = {
    name: string;
    age: number;
    type: 'dog' | 'cat' | 'etc';
    gender: 'female' | 'male';
    owner: string;
    birth: Date;
  };

  type Vet = Pet['owner']; // 수의사 -> (애완동물 소유자와 같은) string type이 된다.
  const vetName: Vet = 'thomas'; // string type possible

  type Gender = Pet['gender']; // 'female' | 'male'
  const he: Gender = 'female'; // 'female' | 'male'외의 값이 들어가면 error

  type Keys = keyof Pet; // Pet의 모든 키의 타입을 할당하는 것 -> 'name' | 'age' | 'type' | 'gender' |'owner' | 'birth'

  // const myKey: Keys = 'firstname'; // error -> Pet의 키에 있는 값이 아니기때문에
  const yourKey: Keys = 'owner';

  type Person = {
    name: Pet['name'];
    gender: Pet['gender'];
  };

  const person: Person = {
    name: 'jjanmo',
    gender: 'male',
  };
}
