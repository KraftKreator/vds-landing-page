const CART_STORAGE_KEY = "vds_cart";

/**
 * Represents a product compatible with the Stripe Checkout API.
 *
 * Amounts (price) are expressed in the smallest currency unit (e.g. cents for USD, grosze for PLN).
 * Example: $49.99 → unit_amount = 4999
 *
 * Docs: https://docs.stripe.com/api/checkout/sessions/create#create_checkout_session-line_items
 */
export class Product {
  /**
   * @param {object} params
   * @param {string}   params.id              - Local product identifier (e.g. "vds-pro-v1")
   * @param {string}   params.name            - Name displayed to the customer
   * @param {string}   [params.description]   - Description displayed to the customer
   * @param {string[]} [params.images]        - Image URLs (max 8, shown in Stripe Checkout)
   * @param {number}   params.price          - Price in the smallest currency unit (integer)
   * @param {string}   [params.currency]      - ISO 4217 lowercase currency code, defaults to "pln"
   * @param {object}   [params.metadata]      - Arbitrary key-value pairs (string → string, max 50 keys)
   */
  constructor({
    id,
    name,
    description = null,
    images = [],
    price,
    currency = "pln",
    metadata = {},
  }) {
    if (!id) throw new Error("Product: 'id' is required");
    if (!name) throw new Error("Product: 'name' is required");
    if (!Number.isInteger(price) || price < 0)
      throw new Error("Product: 'price' must be a non-negative integer (smallest currency unit)");

    this.id = id;
    this.name = name;
    this.description = description;
    this.images = images;
    this.price = price;
    this.currency = currency;
    this.metadata = metadata;
  }

  /**
   * Returns a line_item object ready to be sent to a Stripe Checkout Session.
   *
   * @param {number} [quantity=1]
   * @returns {object} - entry for the `line_items[]` field of POST /v1/checkout/sessions
   */
  toStripeLineItem(quantity = 1) {
    const priceData = {
      currency: this.currency,
      unit_amount: this.price,
      product_data: {
        name: this.name,
        ...(this.description && { description: this.description }),
        ...(this.images.length > 0 && { images: this.images }),
        metadata: this.metadata,
      },
    };

    return {
      price_data: priceData,
      quantity,
    };
  }

  /**
   * Returns a payload for creating a product via POST /v1/products.
   * Useful when you want to register the product in the Stripe Dashboard upfront.
   *
   * @returns {object}
   */
  toStripeProductPayload() {
    return {
      id: this.id,
      name: this.name,
      ...(this.description && { description: this.description }),
      ...(this.images.length > 0 && { images: this.images }),
      metadata: this.metadata,
    };
  }
}

export class Cart {
  constructor() {
    this._items = this._loadFromStorage();
  }

  /**
   * Creates a Product from the given params, validates it, and adds it to the cart.
   * Throws if a product with the same id already exists.
   *
   * @param {object} params - Same shape as the Product constructor
   */
  addProduct(params) {
    const product = new Product(params);

    if (this._items.some((p) => p.id === product.id)) {
      throw new Error(`Cart: product with id "${product.id}" is already in the cart`);
    }

    this._items.push(product);
    this._saveToStorage();
  }

  /**
   * Returns all products currently in the cart.
   *
   * @returns {Product[]}
   */
  getProducts() {
    return [...this._items];
  }

  _loadFromStorage() {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw).map((data) => new Product(data));
    } catch {
      return [];
    }
  }

  _saveToStorage() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this._items));
  }
}
