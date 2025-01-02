import { ShopGiftcard } from './giftcard/giftcard.js'
import { ShopSalesGrid } from './sales/grid.js'

export { ShopGiftcard, ShopSalesGrid }

declare global {
  interface HTMLElementTagNameMap {
    'shop-giftcard': ShopGiftcard
    'shop-sales-grid': ShopSalesGrid
  }
}
