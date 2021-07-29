{
  // Error(Exception) Handling  : try -> catch -> finally

  function readFile(fileName: string): string {
    if (fileName === 'not exist🔥') {
      throw new Error(`file not exist ❌ : ${fileName}`);
    }
    return fileName;
  }

  function closeFile(file: string) {
    console.log('close file 🚪');
  }

  const fileName = 'not exist🔥';
  try {
    // 에러가 발생할 수 있는 부분에서 try를 이용한다.
    // -> 에러가 발생하지 않을 부분은 넣지 않는 편이 좋다.
    console.log(readFile(fileName));
  } catch (e) {
    // 만약에 문제가 생기면 catch에서 그 문제를 잡는다.
    console.log(`catched ${e}`);
  } finally {
    // 에러의 발생과 관계없이 항상 실행되어야 하는 부분은 finally를 이용한다.
    closeFile(fileName);
  }

  // Q. finally를 사용하는 이유??
  // -> finally를 사용하지 않더라도 마지막에 특정코드를 적으면 실행이 된다. 하지만 어떤 에러가 발생할지 아무도 모르고 에러가 발생해서
  //    프로그램이 다운되거나 리턴문이 실행되거나 등등의 예상치 못한 일이 발생할 수 있다. 이런 경우 그 이후의 코드는 실행되지 않을 것이다.
  //    그럼에도 항상 일정하게 실행되어야 하는 코드를 위해서 finally를 이용해 그 영역에서 코드를 적어줘여한다.
}
