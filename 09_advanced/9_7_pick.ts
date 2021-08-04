{
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };

  type VideoMetadataType = Pick<Video, 'id' | 'title' | 'url'>;

  function getVideo(id: string): Video {
    return {
      id,
      title: 'kingdom',
      url: 'https:// ....',
      data: 'byte data ... very big data',
    };
  }

  // 비디오 정보 중에서 일부분의 정보만 얻기 위한 함수
  // -> 📌 Pick<Video, 'id' | 'title' | 'url'> 을 리턴타입에 직접 써주기보다 이러한 타입을 만들어서 사용하는것이 유용하다.
  function getVideoMetadata(id: string): VideoMetadataType {
    return {
      id,
      title: 'title',
      url: 'https://...',
    };
  }

  // Q. pick + optional?? 🧐
  // -> pick type으로 만들어진 키값이 모두 필수적인 것같은데, 그것마저 optional로 만들 수 없을까??

  type VideoMetaPartial<T> = Partial<VideoMetadataType>;

  const videoMeatPartial = {
    id: 'V12133',
    title: 'kingdom',
    //url이 없어도 됨... 🚀 partial
  };
}
