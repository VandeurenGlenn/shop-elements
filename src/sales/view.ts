import { html, css, LiteElement, customElement, query, property } from '@vandeurenglenn/lite'
import '@material/web/fab/fab.js'
import './pad.js'
import './grid.js'
import '@vandeurenglenn/lite-elements/button.js'
import { CustomIcon } from '@vandeurenglenn/lite-elements/icon'

@customElement('shop-sales-view')
export class ShopSalesView extends LiteElement {
  fabIcon = 'shopping_cart_checkout'

  @query('shop-sales-pad')
  accessor salesPad

  @query('shop-sales-grid')
  accessor grid

  @property({ type: Boolean, reflect: true, attribute: 'is-mobile' }) accessor isMobile = false

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        padding: 12px 0 12px 24px;
      }

      md-fab {
        position: absolute;
        right: 24px;
        bottom: 24px;
        opacity: 0;
        pointer-events: none;
      }
      shop-sales-grid {
        transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        transform: translateX(0%);
        z-index: 0;
        opacity: 1;
        left: 0;
        position: relative;
      }
      @media (max-width: 689px) {
        :host {
          flex-direction: column;
          padding: 0;
        }
        sales-pad {
          position: absolute;
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          padding-right: 0;
          max-width: 100%;
          inset: 0;
        }

        .shown {
          padding-bottom: 12px;
        }

        md-fab {
          opacity: 1;
          pointer-events: auto;
          z-index: 1001;
          width: min-content;
        }
      }

      .shown {
        z-index: 1000;
        opacity: 1;
        pointer-events: auto;
        max-width: -webkit-fill-available;
        align-items: center;
        background: var(--md-sys-color-background);
      }

      ::-webkit-scrollbar {
        width: 8px;
        border-radius: var(--md-sys-shape-corner-extra-large);
        background-color: var(--md-sys-color-surface-container-highest);
      }
      ::-webkit-scrollbar-thumb {
        background: var(--md-sys-color-on-surface-container-highest);
        border-radius: var(--md-sys-shape-corner-extra-large);
        box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.5) inset;
      }
    `
  ]

  togglePad = () => {
    let customIcon = this.shadowRoot.querySelector('.fabicon') as CustomIcon
    let fab = this.shadowRoot.querySelector('md-fab')
    if (this.salesPad.classList.contains('shown')) {
      this.salesPad.classList.remove('shown')
      customIcon.icon = 'shopping_cart_checkout'
      fab.style.setProperty('left', '')
    } else {
      this.salesPad.classList.add('shown')
      customIcon.icon = 'arrow_back'
      fab.style.setProperty('left', '24px')
    }
  }

  addProductToReceipt = (event) => {
    this.salesPad.addProduct(event.detail)
  }

  render() {
    return html`
      <shop-sales-pad .isMobile=${this.isMobile}></shop-sales-pad>
      <shop-sales-grid @product-click=${(event) => this.addProductToReceipt(event)}></shop-sales-grid>
      <md-fab @click=${() => this.togglePad()}>
        <custom-icon
          icon="shopping_cart_checkout"
          class="fabicon"
          slot="icon"></custom-icon>
      </md-fab>
    `
  }
}
