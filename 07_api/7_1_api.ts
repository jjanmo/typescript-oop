{
  Array; // Array API 문서 보는 방법 : command + click

  // every example1

  type Coffee = {
    shots: number;
    hasMilk: boolean;
  };

  const coffees: Coffee[] = [
    { shots: 2, hasMilk: true },
    { shots: 2, hasMilk: true },
    { shots: 2, hasMilk: false },
  ];

  const isLattes = coffees.every((coffee) => coffee.hasMilk);
  console.log(isLattes);

  // every API를 보면 오버로딩된 함수 2개로 존재한다.(every를 정의한 함수 2개)
  // every example2 을 이용하여 서브타입을 체크하는 예시
  // -> user-defined-type : https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards

  class Animal {}

  class Cat extends Animal {
    isCat: boolean = true;
  }

  class Dog extends Animal {
    isDog: boolean = true;
  }

  const animals: Animal[] = [new Cat(), new Dog(), new Cat()];

  function isDog(animal: Animal): animal is Dog {
    return (animal as Dog).isDog !== undefined;
  }

  const isDogsAll = animals.every<Dog>(isDog);
  console.log(isDogsAll);
}
