import { html, css, LiteElement, customElement, query, property } from '@vandeurenglenn/lite'
import './receipt.js'
import './input.js'
import { ShopSalesReceipt } from './receipt.js'

@customElement('shop-sales-pad')
export class SalesPad extends LiteElement {
  currentSelectedProduct: string
  currentProductAmount: string = ''

  @query('shop-sales-receipt')
  accessor receipt: ShopSalesReceipt

  @property({ type: Boolean, reflect: true, attribute: 'is-mobile' }) accessor isMobile = false

  static styles = [
    css`
      :host {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        max-width: var(--shop-sales-pad-max-width, 240px);
        padding-right: 12px;
        box-sizing: border-box;
      }

      shop-sales-receipt {
        margin-bottom: 24px;
      }

      :host([is-mobile]) {
        position: absolute;
        z-index: 0;
        pointer-events: none;
        opacity: 0;
        max-width: 100%;
        inset: 0;
      }

      :host([is-mobile]) {
        pointer-events: auto;
        opacity: 1;
      }
    `
  ]

  onReceiptSelection({ detail }: CustomEvent) {
    this.currentProductAmount = ''
    this.currentSelectedProduct = detail
  }

  addProduct(product) {
    let amount = this.receipt.items[product] ? this.receipt.items[product].amount + 1 : 1
    this.currentSelectedProduct = product
    this.currentProductAmount = ''
    this.receipt.addProduct(product, amount)
  }

  removeSelectedProduct() {
    return this.removeProduct(this.currentSelectedProduct)
  }

  removeProduct(product) {
    this.receipt.removeProduct(product)
    this.currentProductAmount = ''

    const keys = Object.keys(this.receipt.items)
    this.currentSelectedProduct = keys[keys.length - 1]
  }

  async inputTap({ detail }: CustomEvent) {
    switch (detail) {
      case '+1':
        if (this.receipt.items[this.currentSelectedProduct]) {
          let amount
          if (this.currentProductAmount.length > 0) {
            amount = Number(this.currentProductAmount) + Number(detail)

            this.currentProductAmount = String(amount)
          } else {
            amount = Number(this.receipt.items[this.currentSelectedProduct].amount) + Number(detail)
          }
          this.receipt.addProduct(this.currentSelectedProduct, amount)
        }
        break
      case 'R':
        if (this.receipt.items[this.currentSelectedProduct]) {
          this.currentProductAmount = ''
          this.receipt.addProduct(this.currentSelectedProduct, 1)
        }
        this.currentProductAmount = ''
        break

      default:
        if (this.currentSelectedProduct) {
          this.currentProductAmount += detail
          if (this.currentProductAmount !== '0') {
            this.receipt.addProduct(this.currentSelectedProduct, Number(this.currentProductAmount))
          } else {
            this.removeProduct(this.currentSelectedProduct)
          }
        }
        break
    }
  }

  render() {
    return html`
      <shop-sales-receipt
        part="receipt"
        @selection=${(event) => this.onReceiptSelection(event)}></shop-sales-receipt>

      <shop-sales-input
        part="input"
        @input-click=${(event) => this.inputTap(event)}></shop-sales-input>
    `
  }
}
