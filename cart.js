export class Cart {
  constructor(storageKey = "vds-cart") {
    this.storageKey = storageKey;
  }

  getProducts() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || "[]");
    } catch {
      return [];
    }
  }

  saveProducts(products) {
    localStorage.setItem(this.storageKey, JSON.stringify(products));
    return products;
  }

  addProduct(product) {
    const products = this.getProducts();
    const existing = products.find((item) => item.id === product.id);

    if (!existing) {
      products.push(product);
      this.saveProducts(products);
    }

    return products;
  }

  removeProduct(id) {
    const products = this.getProducts().filter((item) => item.id !== id);
    this.saveProducts(products);
    return products;
  }

  clear() {
    localStorage.removeItem(this.storageKey);
  }
}
