"use client";

import { useCart } from "@/components/CartProvider";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message = "Hello MIKFAH TECH, I would like to place an order for the following items:%0A%0A";
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (SKU: ${item.sku}) - Qty: ${item.quantity} - ₦${(item.price * item.quantity).toLocaleString()}%0A`;
    });

    message += `%0A*Total: ₦${cartTotal.toLocaleString()}*`;

    // Open WhatsApp
    window.open(`https://wa.me/2349067285522?text=${message}`, "_blank");
    
    // Optional: Clear cart after checkout redirect
    // clearCart(); 
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-black mb-8 flex items-center gap-3">
        <ShoppingCart className="w-8 h-8" /> Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Browse our shop to find electronic components for your next project.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-semibold rounded-md hover:bg-gray-800 transition-colors">
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items */}
          <div className="w-full lg:w-2/3 bg-white border border-gray-200 rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex gap-4 flex-1 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border border-gray-200 bg-white" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                      <p className="font-bold text-black mt-2">₦{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-md bg-gray-50">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-200 text-gray-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-200 text-gray-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button 
                onClick={clearCart}
                className="text-sm text-gray-500 hover:text-red-600 font-medium transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span>₦{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-sm italic">Calculated on WhatsApp</span>
                </div>
                <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="font-bold text-lg text-black">Total</span>
                  <span className="font-bold text-2xl text-black">₦{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <Link 
                href="/checkout"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-4 rounded-md font-bold text-lg transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout
              </Link>
              
              <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
                You will be able to enter your shipping details and select a payment method on the next page.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
