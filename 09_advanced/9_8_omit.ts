{
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };

  // Omit type은 해당 타입을 빼기로 선언하여 타입을 재선언한 것
  // -> 여기서 제외한 키값말고 다른 키값은 모두 사용해야한다 : not optianal
  // -> 사용하는 키값을 optional로서 사용하고 싶다면 이 역시 Partial 타입을 사용하면 된다.
  //  Partial<VideoOmitType>
  type VideoOmitType = Omit<Video, 'id' | 'data'>;

  const subVideo: VideoOmitType = {
    // id: '1234', //error : 생략하기로 위에서 선언함
    title: 'kingdom',
    url: 'https://....',
  };

  // 실제 Omit type 분석하기
  type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
  // 어떠한 타입의 키든 그 키가 K에서 확장된 것인데, K를 T에서 뺀 것
  // -> PicK~~~ 제외하고 남은 것(키)를 고르는 것

  // Exclude<Type, ExcludedUnion> : exclude 배제하다, 채택하지않다
  // -> Type에서 ExcludedUnion을 배제한 모든 타입
  type Exclude<T, U> = T extends U ? never : T;

  // K는 타입 T의 키에 속한 것으로서 특정 키를 뽑아서 넣게되면 그것만을 P라고 하면 해당 타입만을 같은 타입으로 지정할 수 있다.
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };
}
