"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question about our components, need a custom software project, or want to partner with us? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 flex-grow">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-16">
            
            {/* Contact Information */}
            <div className="w-full md:w-1/3 space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-black mb-8">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Phone</p>
                      <p className="text-black font-semibold">09069384731</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Email</p>
                      <a href="mailto:mikfahtech@gmail.com" className="text-blue-600 hover:underline font-semibold">mikfahtech@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-black mb-6">Our Locations</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded flex items-center justify-center shrink-0 mt-1">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-black font-bold mb-1">Head Office (Kano)</p>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Kofar Waika Road, Kofar Walka,<br />
                        Kano 700282,<br />
                        Nigeria
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded flex items-center justify-center shrink-0 mt-1">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-black font-bold mb-1">Branch Office (Zaria)</p>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Abubakar Usman Road, Jama'a,<br />
                        Zango Shanu, Zaria,<br />
                        Kaduna State, Nigeria
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full md:w-2/3">
              <div className="bg-white p-8 md:p-12 border border-gray-200 shadow-sm rounded-none">
                <h3 className="text-2xl font-bold text-black mb-8">Send us a message</h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="john@example.com"
                        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Subject</label>
                    <input 
                      type="text" 
                      required
                      placeholder="How can we help you?"
                      className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <textarea 
                      required
                      rows={6}
                      placeholder="Tell us about your project, request a component, or ask a question..."
                      className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="button" 
                    className="w-full bg-black text-white py-4 font-bold text-lg hover:bg-gray-900 transition-colors"
                    onClick={() => alert("Form submission will be implemented via server actions!")}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
