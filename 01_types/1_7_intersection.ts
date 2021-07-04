{
  /**
   *  Intersection Types : &
   */

  type Student = {
    name: string;
    score: number;
  };

  type Worker = {
    employeeId: string;
    work: () => void;
  };

  function internWork(intern: Student & Worker) {
    console.log(intern.name, intern.employeeId, intern.work);
  }

  internWork({
    name: 'jjanmo',
    score: 95,
    employeeId: '20201014',
    work: () => {
      console.log(`I'm Worker`);
    },
  });
  // 두가지를 모두 갖는 타입이기때문에 두가지 타입의 속성에 해당하는 것이 모두 필요하다. 없으면 error!!
  // 타입을 정의할 때 optional chain처럼 optional properties( ?: ) 를 사용해서 없으면 error가 발생하는 현상을 방지 할 수 있다.
  // -> 이는 타입을 정의할 때 그 타입의 프로퍼티가 required 여부를 판단하여 설정해주면 될 듯!!
}
