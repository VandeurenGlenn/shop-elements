import { LiteElement, html, css, property, customElement } from '@vandeurenglenn/lite'
import '@vandeurenglenn/lite-elements/elevation.js'

@customElement('shop-giftcard')
export class ShopGiftcard extends LiteElement {
  @property({ type: String }) accessor frontBackground

  @property({ type: String }) accessor qr

  @property({ type: Boolean, reflect: true, attribute: 'dark-mode' })
  @property({ type: Boolean })
  accessor front = true

  @property({ type: Boolean }) accessor darkMode = false

  constructor() {
    super()

    const fontURL =
      'https://fonts.googleapis.com/css2?family=Codystar:wght@400;600&family=Tiro+Bangla:ital@0;1&display=swap'

    let link = document.head.querySelector(`link[href="${fontURL}"]`)
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('href', fontURL)
      document.head.appendChild(link)
    }
  }

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: 816px;
        height: 382px;

        padding: 24px;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        position: relative;
        color: var(--md-sys-color-on-surface);
        align-items: center;
        justify-content: center;

        background-color: var(--md-sys-color-surface);
      }

      img {
        width: 100%;
        height: 100%;
        max-width: 60%;
        max-height: 60%;
      }

      .qr {
        position: absolute;
        top: 24px;
        right: 24px;
        width: 100px;
        height: 100px;
      }

      .codystar {
        font-family: 'Codystar', serif;
        font-weight: 600;
        font-style: normal;
        text-decoration: underline;
        text-underline-offset: -42px;
      }

      .codystar-regular {
        font-family: 'Codystar', serif;
        font-weight: 400;
        font-style: normal;
      }
      .codystar-2 {
        font-size: 30px;

        text-underline-offset: 16px;
        text-decoration: underline;
      }
    `
  ]

  renderBack() {
    return html` < `
  }

  renderFront() {
    return html`
      <img
        class="qr"
        src=${this.qr} />
      <h1 class="codystar">HELLO NEW ME</h1>
      <img
        src=${this.frontBackground}
        alt="background" />

      <h1 class="codystar codystar-2">Giftcard</h1>
    `
  }

  render() {
    return html`
      <custom-elevation level="2"></custom-elevation>
      ${this.front ? this.renderFront() : this.renderBack()}
    `
  }
}
