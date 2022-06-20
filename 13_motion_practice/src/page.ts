class Page {
  public target: HTMLElement;
  constructor() {
    this.target = document.querySelector('main') as HTMLElement;

    this.reneder();
  }

  reneder() {
    this.target.textContent = 'This is page components';
  }
}
