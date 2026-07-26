"use client";

import { useCart } from "@/components/CartProvider";
import Link from "next/link";
import { useState, useTransition } from "react";
import { ChevronRight, CreditCard, Building2, Store, Loader2 } from "lucide-react";
import { createCartOrderAction } from "@/app/actions/user";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("bank_deposit");
  const [orderError, setOrderError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAdminCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setOrderError(null);
    startTransition(async () => {
      const res = await createCartOrderAction(cart, paymentMethod);
      if (res?.error) {
        setOrderError(res.error);
      } else {
        clearCart();
        router.push("/dashboard/orders");
      }
    });
  };
  
  const handleCompleteOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    let message = `*NEW ORDER - MIKFAH TECH*%0A%0A`;
    
    message += `*CUSTOMER DETAILS*%0A`;
    message += `Name: ${data.firstName} ${data.lastName}%0A`;
    message += `Email/Phone: ${data.contact}%0A`;
    message += `Phone: ${data.phone}%0A%0A`;

    message += `*DELIVERY ADDRESS*%0A`;
    message += `${data.address}%0A`;
    if (data.apartment) message += `${data.apartment}%0A`;
    message += `${data.city}, ${data.state} ${data.postalCode}%0A`;
    message += `${data.country}%0A%0A`;

    message += `*ORDER ITEMS*%0A`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (SKU: ${item.sku}) - Qty: ${item.quantity} - ₦${(item.price * item.quantity).toLocaleString()}%0A`;
    });

    const shipping = 3500;
    const finalTotal = cartTotal + shipping;

    message += `%0A*Subtotal: ₦${cartTotal.toLocaleString()}*%0A`;
    message += `*Shipping: ₦${shipping.toLocaleString()}*%0A`;
    message += `*TOTAL: ₦${finalTotal.toLocaleString()}*%0A%0A`;

    message += `*PAYMENT METHOD*: `;
    if (paymentMethod === "paystack") {
      message += `Paystack (Card/Online)%0A`;
    } else if (paymentMethod === "cash") {
      message += `Cash payment at store%0A`;
    } else {
      message += `Bank Deposit%0A%0A`;
      message += `*BANK DETAILS*%0A`;
      message += `Bank: Moniepoint MFB%0A`;
      message += `Account Name: MIKFAH TECH LTD%0A`;
      message += `Account No: 5180752115%0A`;
    }

    // Open WhatsApp
    window.open(`https://wa.me/2349067285522?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Breadcrumb */}
      <div className="border-b border-border/40 py-4 px-4 md:px-8">
        <div className="container mx-auto flex items-center text-sm text-muted-foreground">
          <Link href="/cart" className="hover:text-primary transition-colors">Cart</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-foreground font-medium">Information & Shipping</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span>Payment</span>
        </div>
      </div>

      <div className="container mx-auto flex flex-col-reverse lg:flex-row min-h-[calc(100vh-140px)]">
        
        {/* Left Column (Forms) */}
        <div className="w-full lg:w-[55%] p-4 md:p-8 lg:pr-12 lg:border-r border-border/40">
          <form onSubmit={handleCompleteOrder} className="space-y-10 max-w-2xl mx-auto lg:mx-0 lg:ml-auto">
            
            {/* Contact Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">Contact</h2>
                <Link href="/login" className="text-sm text-primary hover:underline">Log in</Link>
              </div>
              <input 
                required
                type="text" 
                name="contact"
                placeholder="Email or mobile phone number" 
                className="w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary shadow-sm"
              />
              <label className="flex items-center gap-2 mt-3 cursor-pointer">
                <input type="checkbox" className="rounded border-input text-primary focus:ring-primary h-4 w-4" />
                <span className="text-sm text-muted-foreground">Email me with news and offers</span>
              </label>
            </section>

            {/* Delivery Section */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Delivery</h2>
              <div className="space-y-4">
                <select name="country" className="w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary shadow-sm">
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Other">Other</option>
                </select>

                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" name="firstName" placeholder="First name (optional)" className="w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm shadow-sm" />
                  <input required type="text" name="lastName" placeholder="Last name" className="w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm shadow-sm" />
                </div>

                <input required type="text" name="address" placeholder="Address" className="w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm shadow-sm" />
                <input type="text" name="apartment" placeholder="Apartment, suite, etc. (optional)" className="w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm shadow-sm" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input required type="text" name="city" placeholder="City" className="w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm shadow-sm" />
                  <select name="state" className="w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm shadow-sm">
                    <option value="Kaduna">Kaduna</option>
                    <option value="Kano">Kano</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Other">Other</option>
                  </select>
                  <input type="text" name="postalCode" placeholder="Postal code (optional)" className="w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm shadow-sm" />
                </div>

                <input required type="tel" name="phone" placeholder="Phone" className="w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm shadow-sm" />
              </div>
            </section>

            {/* Payment Section */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-2">Payment</h2>
              <p className="text-sm text-muted-foreground mb-4">All transactions are secure and encrypted.</p>
              
              <div className="rounded-lg border border-input overflow-hidden divide-y divide-input bg-transparent shadow-sm">
                
                {/* Paystack Option */}
                <label className={`flex items-center p-4 cursor-pointer transition-colors ${paymentMethod === 'paystack' ? 'bg-primary/5' : 'hover:bg-muted/50'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="paystack" 
                    checked={paymentMethod === "paystack"} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary border-input" 
                  />
                  <div className="ml-3 flex-1 flex justify-between items-center">
                    <span className="font-medium text-sm">Paystack</span>
                    <div className="flex gap-1">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </label>

                {/* Cash Option */}
                <label className={`flex items-center p-4 cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'bg-primary/5' : 'hover:bg-muted/50'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cash" 
                    checked={paymentMethod === "cash"} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary border-input" 
                  />
                  <div className="ml-3 flex-1 flex justify-between items-center">
                    <span className="font-medium text-sm">Cash payment at store</span>
                    <Store className="w-5 h-5 text-muted-foreground" />
                  </div>
                </label>

                {/* Bank Deposit Option */}
                <label className={`flex items-center p-4 cursor-pointer transition-colors ${paymentMethod === 'bank_deposit' ? 'bg-primary/5' : 'hover:bg-muted/50'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="bank_deposit" 
                    checked={paymentMethod === "bank_deposit"} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary border-input" 
                  />
                  <div className="ml-3 flex-1 flex justify-between items-center">
                    <span className="font-medium text-sm">Bank Deposit</span>
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                  </div>
                </label>
              </div>

              {/* Bank Deposit Details (Conditional) */}
              {paymentMethod === "bank_deposit" && (
                <div className="mt-4 p-4 bg-muted/30 border border-input rounded-md text-sm">
                  <p className="font-medium mb-2">Please transfer the total amount to:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li><span className="font-medium text-foreground">Bank:</span> Moniepoint MFB</li>
                    <li><span className="font-medium text-foreground">Account Name:</span> MIKFAH TECH LTD</li>
                    <li><span className="font-medium text-foreground">Account Number:</span> 5180752115</li>
                  </ul>
                  <p className="mt-3 text-xs italic">Your order details will be sent to WhatsApp for confirmation after completing the order.</p>
                </div>
              )}
            </section>

            {/* Complete Order Buttons */}
            {orderError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
                {orderError} {orderError.includes("log in") && <Link href="/login" className="underline font-bold ml-1">Log in here</Link>}
              </div>
            )}

            <div className="pt-6 space-y-3">
              <button 
                type="button"
                onClick={handleAdminCheckout}
                disabled={isPending}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-4 rounded-md font-bold text-lg transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isPending ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting to Admin Portal...</> : <>Complete Order (Send to Admin Portal)</>}
              </button>

              <button 
                type="submit" 
                className="w-full bg-[#25D366] text-white hover:bg-[#20bd5a] py-3.5 rounded-md font-bold text-base transition-colors flex items-center justify-center gap-2"
              >
                Order via WhatsApp (Guest / Alternative)
              </button>
            </div>
            
            {/* Footer Links */}
            <div className="flex gap-4 text-xs text-primary pt-8 border-t border-border/40">
              <Link href="#" className="hover:underline">Refund policy</Link>
              <Link href="#" className="hover:underline">Shipping policy</Link>
              <Link href="#" className="hover:underline">Privacy policy</Link>
              <Link href="#" className="hover:underline">Terms of service</Link>
            </div>

          </form>
        </div>

        {/* Right Column (Order Summary) */}
        <div className="w-full lg:w-[45%] bg-muted/10 p-4 md:p-8 lg:pl-12 border-b lg:border-b-0 border-border/40">
          <div className="max-w-md mx-auto lg:mx-0 sticky top-8">
            
            {/* Cart Items List */}
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-md border border-border/50 bg-white overflow-hidden flex items-center justify-center p-1">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                    </div>
                    <span className="absolute -top-2 -right-2 bg-foreground text-background text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium leading-tight">{item.name}</h4>
                    <span className="text-xs text-muted-foreground uppercase">{item.sku}</span>
                  </div>
                  <div className="text-sm font-medium">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border/40 pt-4 mb-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₦{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">Shipping</span>
                <span className="font-medium">₦3,500.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated taxes</span>
                <span className="font-medium">₦0.00</span>
              </div>
            </div>

            <div className="border-t border-border/40 pt-4 flex items-end justify-between">
              <span className="text-base font-semibold">Total</span>
              <div className="flex items-end gap-2">
                <span className="text-xs text-muted-foreground mb-1">NGN</span>
                <span className="text-2xl font-bold">₦{(cartTotal + 3500).toLocaleString()}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
