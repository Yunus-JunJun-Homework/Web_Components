class MyVideoComponents extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    this.getVideoLayout().then((r) => {
      const element = this.parseHTML(r);
      const videoId = element.getAttribute('data-video-id');
      const fullSource = element.getAttribute('src') + videoId;
      element.setAttribute('src', fullSource);

      shadow.appendChild(element);
    });

    this.getSizer().then((r) => {
      const videoHeight = this.getAttribute('data-height');
      const videoHeightStyle = `.video {height: ${videoHeight}}`;
      const styleHeight = document.createElement('style');
      styleHeight.textContent = videoHeight ? r + videoHeightStyle : r;

      const videoWidth = this.getAttribute('data-width');
      const videoWidthStyle = `.video {width: ${videoWidth}}`;
      const styleWidth = document.createElement('style');
      styleHeight.textContent = videoWidth ? r + videoWidthStyle : r;

      shadow.append(styleHeight, styleWidth);
    });
  }

  async getVideoLayout() {
    let layout = await fetch('/videoHtml/video.html');
    return layout.text();
  }

  async getSizer() {
    let getCss = await fetch('/videoCSS/video.css');
    return getCss.text();
  }

  parseHTML(str) {
    const parser = new DOMParser();
    const docs = parser.parseFromString(str, 'text/html');
    return docs.body.firstChild;
  }
}

customElements.define('yt-video', MyVideoComponents);

// class MyVideoComponent extends HTMLElement {
//   constructor() {
//     super();

//     this.attachShadow({
//       mode: 'open',
//     });
//     this.render();
//   }

//   render() {
//     this.shadowRoot.innerHTML = `
//     <iframe
//     width="560" height="315" src="https://www.youtube.com/embed/CDVjxtFRKk0"
//     title="YouTube video player"  frameborder="0"
//     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//     allowfullscreen
//    >
//    </iframe>
//     `;
//   }
// }

// customElements.define('yt-video', MyVideoComponent);
