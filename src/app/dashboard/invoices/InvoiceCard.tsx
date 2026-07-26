"use client";

import { useState, useTransition } from "react";
import { markOrderPaidByCustomerAction } from "@/app/actions/user";
import { FileText, Printer, Check, Loader2, DollarSign, Building2, Phone, Calendar, AlertCircle } from "lucide-react";

interface InvoiceItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    sku: string;
  };
}

interface InvoiceProps {
  invoiceId: string;
  createdAt: Date;
  order: {
    id: string;
    status: string;
    totalAmount: number;
    shippingCost: number;
    items: InvoiceItem[];
  };
}

export function InvoiceCard({ invoice }: { invoice: InvoiceProps }) {
  const [showModal, setShowModal] = useState(false);
  const [reference, setReference] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isPaidSubmitted, setIsPaidSubmitted] = useState(
    invoice.order.status === "AWAYTING_PAYMENT" || 
    invoice.order.status === "PAYMENT_RECEIVED" || 
    invoice.order.status === "DELIVERED" || 
    invoice.order.status === "PROCESSING"
  );

  const total = invoice.order.totalAmount + (invoice.order.shippingCost || 0);

  const handleMarkPaid = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await markOrderPaidByCustomerAction(invoice.order.id, reference || "Bank Transfer Paid");
      if (res?.success) {
        setIsPaidSubmitted(true);
        setShowModal(false);
      } else {
        alert("Error: " + res?.error);
      }
    });
  };

  const triggerPrint = () => {
    window.print();
  };

  return (
    <>
      {/* Invoice Row Card */}
      <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/50 transition-all">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-base text-foreground">Invoice #{invoice.invoiceId.slice(-8).toUpperCase()}</span>
              <span className="text-xs text-muted-foreground ml-2">Order #{invoice.order.id.slice(-6).toUpperCase()}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Date: {new Date(invoice.createdAt).toLocaleDateString()}
            </span>
            <span className="font-extrabold text-primary text-sm">
              ₦{total.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {invoice.order.status === "PAYMENT_RECEIVED" ? (
            <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 rounded-lg text-xs font-extrabold flex items-center gap-1.5">
              <Check className="w-4 h-4" /> PAID (Payment Confirmed)
            </span>
          ) : invoice.order.status === "OUT_FOR_DELIVERY" ? (
            <span className="px-3 py-1.5 bg-purple-500/10 text-purple-500 border border-purple-500/30 rounded-lg text-xs font-extrabold flex items-center gap-1.5">
              <Check className="w-4 h-4" /> OUT FOR DELIVERY
            </span>
          ) : invoice.order.status === "DELIVERED" ? (
            <span className="px-3 py-1.5 bg-green-600/10 text-green-600 border border-green-600/30 rounded-lg text-xs font-extrabold flex items-center gap-1.5">
              <Check className="w-4 h-4" /> DELIVERED
            </span>
          ) : isPaidSubmitted || invoice.order.status === "AWAYTING_PAYMENT" || invoice.order.status === "PROCESSING" ? (
            <span className="px-3 py-1.5 bg-amber-500/10 text-amber-500 border border-amber-500/30 rounded-lg text-xs font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4" /> AWAITING CONFIRMATION
            </span>
          ) : (
            <span className="px-3 py-1.5 bg-orange-500/10 text-orange-500 border border-orange-500/30 rounded-lg text-xs font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> Unpaid / Bank Transfer
            </span>
          )}

          <button 
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center shadow-sm shadow-primary/20"
          >
            <Printer className="w-4 h-4" /> View & Print Invoice
          </button>
        </div>
      </div>

      {/* Official Invoice Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-background border border-border rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Printable Invoice Header */}
            <div className="p-8 border-b border-border/50 bg-card print:p-6 print:border-b-2 print:bg-white">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <img src="/logo.jpg" alt="MIKFAH TECH LTD" className="h-12 w-auto object-contain rounded mb-2" />
                  <h2 className="text-xl font-black tracking-tight text-foreground print:text-black">MIKFAH TECH LTD</h2>
                  <p className="text-xs text-muted-foreground print:text-gray-600">Electronics, IoT & PCB Engineering Systems</p>
                  <p className="text-xs text-muted-foreground print:text-gray-600">Phone / WhatsApp: 09067285522</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded font-black text-sm uppercase tracking-wider mb-2 print:bg-gray-100 print:text-black">
                    OFFICIAL INVOICE
                  </span>
                  <p className="text-xs font-bold text-foreground print:text-black">INV #{invoice.invoiceId.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground print:text-gray-600">Order: #{invoice.order.id.slice(-6).toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground print:text-gray-600">Date: {new Date(invoice.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Invoice Table Body */}
            <div className="p-8 space-y-6 print:p-6 print:bg-white">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 print:text-gray-700">
                  Order Breakdown
                </h3>
                <div className="border border-border/50 rounded-lg overflow-hidden print:border-gray-300">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-muted/50 text-muted-foreground uppercase print:bg-gray-100 print:text-gray-800">
                      <tr>
                        <th className="p-3 font-semibold">Item Description</th>
                        <th className="p-3 font-semibold text-center">Qty</th>
                        <th className="p-3 font-semibold text-right">Unit Price</th>
                        <th className="p-3 font-semibold text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30 print:divide-gray-200">
                      {invoice.order.items.map((item) => (
                        <tr key={item.id}>
                          <td className="p-3 font-medium text-foreground print:text-black">{item.product.name}</td>
                          <td className="p-3 text-center print:text-black">{item.quantity}</td>
                          <td className="p-3 text-right print:text-black">₦{item.price.toLocaleString()}</td>
                          <td className="p-3 text-right font-bold text-foreground print:text-black">₦{(item.quantity * item.price).toLocaleString()}</td>
                        </tr>
                      ))}
                      <tr className="bg-muted/20 print:bg-gray-50 font-extrabold text-sm text-foreground print:text-black border-t-2 border-border print:border-gray-400">
                        <td colSpan={3} className="p-3 text-right">TOTAL AMOUNT DUE:</td>
                        <td className="p-3 text-right text-primary print:text-black">₦{total.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Nigerian Bank Transfer Account Details */}
              <div className="bg-muted/40 border border-primary/20 rounded-xl p-5 space-y-3 print:border-2 print:border-gray-800 print:bg-gray-50">
                <div className="flex items-center gap-2 text-primary print:text-black font-bold text-sm">
                  <Building2 className="w-4 h-4" /> Bank Transfer Account Instructions
                </div>
                <p className="text-xs text-muted-foreground print:text-gray-700">
                  To complete your order, please transfer the total amount of <strong className="text-foreground print:text-black">₦{total.toLocaleString()}</strong> to the official corporate account below:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-card p-3 rounded-lg border border-border/50 text-xs print:bg-white print:border-gray-300">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase block font-semibold print:text-gray-500">Bank Name</span>
                    <strong className="text-foreground print:text-black">Moniepoint MFB</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase block font-semibold print:text-gray-500">Account Number</span>
                    <strong className="text-primary print:text-black text-sm tracking-wider">5180752115</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase block font-semibold print:text-gray-500">Account Name</span>
                    <strong className="text-foreground print:text-black">MIKFAH TECH LTD</strong>
                  </div>
                </div>
              </div>

              {/* Evidence Submission Form (Hidden in Print) */}
              {!isPaidSubmitted && (
                <form onSubmit={handleMarkPaid} className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm print:hidden">
                  <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> Have you made the transfer?
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Enter your transfer sender name or receipt reference below and click confirm. Admin will verify and mark your order delivered!
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      placeholder="e.g. Sent via OPay by Ahmed Yusuf / Ref: 092831"
                      className="flex-1 text-xs rounded-lg border border-input bg-background px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                      type="submit"
                      disabled={isPending}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50 shrink-0 shadow-sm"
                    >
                      {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                      Confirm I Have Paid
                    </button>
                  </div>
                </form>
              )}

              {isPaidSubmitted && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center space-y-1 print:border-2 print:border-gray-800 print:bg-white">
                  <p className="font-extrabold text-sm text-emerald-600 print:text-black flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4" /> PAYMENT EVIDENCE SUBMITTED
                  </p>
                  <p className="text-xs text-muted-foreground print:text-gray-700">
                    Your transfer evidence has been received. Admin is verifying your payment and preparing for delivery.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 bg-muted/30 border-t border-border flex justify-between items-center gap-4 print:hidden">
              <button
                type="button"
                onClick={triggerPrint}
                className="px-5 py-2.5 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
              >
                <Printer className="w-4 h-4" /> Print Invoice / Save as PDF
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 bg-foreground text-background hover:bg-foreground/90 rounded-lg text-xs font-bold transition-colors shadow-sm"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
