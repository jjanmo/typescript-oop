{
  //example1

  // 기본 비디오 타입
  type Video = {
    title: string;
    author: string;
  };

  // // 선택적인 비디오 타입
  // type VideoOptional = {
  //   title?: string;
  //   author?: string;
  // };
  // // 수정불가한 비디오 타입
  // type VideoReadOnly = {
  //   readonly title?: string;
  //   readonly author?: string;
  // };

  // 위의 예처럼 각각 조금씩만 다른 타입임에도 쓰임에 따라서 각각 만들어줘야한다.
  // -> 만약에 기본 비디오 타입에서 수정이 일어난다면, 생성한 모든 타입의 수정이 불가피하다.
  // -> 매우 비효율적 -> 어떻게 하면 타입을 재사용성 높게 사용할 수 있을까??
  // -> mapped type의 활용 🚀

  // --------------------------

  type Optional<T> = {
    [P in keyof T]?: T[P];
    // P in keyof T : T 키(값) 중에서 한가지 P => 타입 T에서 키를 하나의 타입인 P로 정의한 것
    // -> type에서 [] 는 for-in과 같다.
    // -> ?가 붙어서 모든 키값이 필수적이지않게 되었다.
  };

  // 위 타입을 이용해서 비디오옵셔널을 다시 정의할 수 있다.
  type VideoOptional = Optional<Video>;

  const videoOptional: VideoOptional = {
    title: 'kingdom',
    // release: '2021.12', // error : Video의 키로 존재하지 않기 때문
    // Optional 이기때문에 비디오 타입의 모든 키가 들어가야하는 것은 아니다.
  };

  // mapped type으로 만든 Optional은 다른 타입에도 적용이 가능하다.
  type Pet = {
    name: string;
    age: number;
    species: 'dog' | 'cat' | 'bird' | 'etc';
  };

  type PetOptional = Optional<Pet>;
  const myPet: PetOptional = {
    name: 'mimi',
    species: 'cat',
  };

  const yourPet: Optional<Pet> = {
    name: 'ruby',
    age: 20,
  };

  // -------------------------------

  type ReadOnly<T> = {
    readonly [P in keyof T]: T[P];
  };

  const video: Video = {
    title: 'suit',
    author: 'michael',
  };
  video.title = 'black summer';

  const readonlyVideo: ReadOnly<Video> = {
    title: 'vikings',
    author: 'travis',
  };
  // readonlyVideo.title = 'kingdom'; //error : readonly type

  // -------------------------------

  // example2
  type Nullable<T> = {
    [P in keyof T]: T[P] | null;
  };

  const nullableVideo: Nullable<Video> = {
    title: null, // string or null
    author: null, // string or null
  };

  //example3 : 실제 타입스크립트 문서에 있는 코드
  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  };

  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
  };
}
