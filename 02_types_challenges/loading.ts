{
  /**
   * Print Loading State
   */
  type LoadingState = {
    state: 'loading';
  };

  type SuccessState = {
    state: 'success';
    response: {
      body: string;
    };
  };

  type FailState = {
    state: 'fail';
    reason: string;
  };

  type ResourceLoadState = LoadingState | SuccessState | FailState;

  function printLoginState(result: ResourceLoadState): void {
    switch (result.state) {
      case 'loading': {
        const { state } = result;
        console.log(`👀 ${state}...`);
        break;
      }
      case 'success': {
        const {
          response: { body },
        } = result;
        console.log(`😃 ${body}`);
        break;
      }
      case 'fail': {
        const { reason } = result;
        console.log(`😱 ${reason}`);
        break;
      }
      default: {
        throw new Error(`unknown state: ${result}`);
      }
    }
  }

  printLoginState({ state: 'loading' }); // 👀 loading...
  printLoginState({ state: 'success', response: { body: 'loaded' } }); // 😃 loaded
  printLoginState({ state: 'fail', reason: 'no network' }); // 😱 no network
}
