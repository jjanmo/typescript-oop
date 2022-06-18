class Section {
  private target: HTMLElement;
  private $section: HTMLElement;
  private sectionId: number;

  constructor(public type: MotionType, public data: Data) {
    this.sectionId = Date.now();
    this.target = document.querySelector('main') as HTMLElement;
    this.render();

    this.$section = document.querySelector(
      `#section-${this.sectionId}`
    ) as HTMLElement;
    const $deleteButton = this.$section.querySelector(
      '.delete-button'
    ) as HTMLButtonElement;
    $deleteButton?.addEventListener('click', this.handleClickDelete.bind(this));
  }

  generateSection(): HTMLElement {
    const $section = document.createElement('section');
    $section.className = this.type;
    $section.id = `section-${this.sectionId}`;
    const $deleteButton = document.createElement('button');
    $deleteButton.className = 'delete-button';
    $deleteButton.textContent = 'delete';
    $section.appendChild($deleteButton);
    const $contents = document.createElement('div');
    $contents.className = 'contents';
    $section.appendChild($contents);

    const $title = document.createElement('div');
    $title.className = 'title';
    $title.textContent = this.data.title;

    if (this.type === 'image') {
      const $img = document.createElement('img');
      $img.src = this.data.body;
      $img.alt = 'image';

      $contents.append($img, $title);
    } else if (this.type === 'video') {
      const $video = document.createElement('video');
      $video.src = this.data.body;
      $video.autoplay = true;
      $video.controls = true;
      $video.muted = true;

      $contents.append($video, $title);
    } else if (this.type === 'note') {
      const $body = document.createElement('div');
      $body.textContent = this.data.body;

      $contents.append($title, $body);
    } else {
      const $body = document.createElement('div');
      $body.innerHTML = `
        <input type="checkbox" /> <span>${this.data.body}</span>
      `;

      $contents.append($title, $body);
    }

    return $section;
  }

  handleClickDelete() {
    this.$section.remove();
  }

  render() {
    const $section = this.generateSection();
    this.target.appendChild($section);
  }
}
