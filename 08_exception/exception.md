# About Exception

> Exception과 Error의 차이에 대해서

- Exception

  - 전혀 예상하지 못한 Error를 말한다. 그렇기 때문에 미리 발생 가능한 Exception을 핸들링하려 처리하는 것이 중요하다. 잘 처리된 Exception Handling을 통해서 Reliability & Maintainability(안정성과 유지보수성)을 높일 수 있다.

  - 내부에서 해결하려고 최대한 노력하다가 안될 경우, 사용자에게 알려주어야 한다.

- Error

  - 어플리케이션 내부에서 예상 가능한 Error(Error State)

⭐️ 위 두가지를 꼭 구분해서 사용해야한다!!!!
