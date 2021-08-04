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
}
