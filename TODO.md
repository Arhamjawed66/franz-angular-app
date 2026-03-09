# Task Plan: Add Barcode, Expiry Date Display and CRUD Operations

## Information Gathered:
- ProductDTO has `barcode` and `expiry_date` fields
- ProductService already has all required methods: getProductById, addProduct, deleteProduct
- Product Card component currently only shows name, description, price, discount, image
- Product Component has basic list display only

## Plan:
- [x] Update `src/app/components/product-card/product-card.html` - Add barcode and expiry date display
- [x] Update `src/app/components/product/product.html` - Add buttons for Add Product, Get by ID, Delete
- [x] Update `src/app/components/product/product.ts` - Add methods for CRUD operations

## Dependent Files:
- src/app/components/product-card/product-card.html
- src/app/components/product/product.html
- src/app/components/product/product.ts

## Followup Steps:
- Test the changes in the application
