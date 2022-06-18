class App {
  constructor() {
    const $buttons = document.querySelectorAll('.upload-button');

    $buttons.forEach(($button) =>
      $button.addEventListener('click', this.handleClick)
    );
  }

  handleClick(e: Event) {
    const target = e.target as HTMLButtonElement;
    const type = target.dataset.type as MotionType;
    const $dialogWrapper = document.querySelector(
      '.dialog-wrapper'
    ) as HTMLDivElement;
    $dialogWrapper.classList.remove('hidden');
    new Dialog($dialogWrapper, type);
  }
}

new App();
