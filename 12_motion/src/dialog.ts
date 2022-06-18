class Dialog {
  private label: string = '';
  constructor(public target: HTMLElement, public type: MotionType) {
    this.target = target;
    this.label = type === 'image' || type === 'video' ? 'url' : 'contents';
    this.render();

    target.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e: MouseEvent) {
    const className = (e.target as HTMLElement).className;
    if (className === 'dialog-wrapper' || className === 'cancel-button') {
      this.hide();
    } else if (className === 'add-button') {
      const $titleInput = document.querySelector('#title') as HTMLInputElement;
      const $bodyInput = document.querySelector(
        `#${this.label}`
      ) as HTMLInputElement;

      if (!$titleInput || !$bodyInput) return;

      // section 생성
      console.log($titleInput.value, $bodyInput.value);
      this.hide();
    }
  }

  hide() {
    this.target.innerHTML = '';
    this.target.classList.add('hidden');
  }

  render() {
    this.target.classList.remove('hidden');
    this.target.innerHTML = `
      <div class="dialog">
        <div class="row">
          <label for="title">Title</label>
          <input type="text" id="title" />
        </div>
        <div class="row">
          <label for=${this.label}>${this.label}</label>
          <input type="text" id=${this.label} />
        </div>
        <div class="button-container">
          <button type="button" class="add-button">add</button>
          <button type="button" class="cancel-button">cancel</button>
        </div>
      </div>
    `;
  }
}
