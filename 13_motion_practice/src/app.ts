import Page from './components/page.js';
class App {
  private readonly page: Page;
  constructor(root: HTMLElement) {
    this.page = new Page();
    this.page.attachTo(root);
  }
}

new App(document.querySelector('main')! as HTMLElement);
