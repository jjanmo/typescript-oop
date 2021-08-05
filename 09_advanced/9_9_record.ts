{
  type ScreenInfo = {
    name: string;
    index: number;
  };

  type NavBar = 'home' | 'nft' | 'wallet';

  /**
   *  Record 타입
   *  Record<Keys, Type>
   *  -> Keys에 적혀있는 있는 타입은 키 타입이 되고 Type가 각각의 Key에 해당하는 값의 타입이다.
   *  -> 키와 값을 특정 타입으로 묶는데 사용할 수 있다.
   */

  const navbar: Record<NavBar, ScreenInfo> = {
    home: { name: 'home', index: 0 },
    nft: { name: 'nft', index: 1 },
    wallet: { name: 'wallet', index: 2 },
  };
}
