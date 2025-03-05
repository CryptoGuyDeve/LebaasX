"use client";
import React, { useState } from "react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PriceFormatter from "@/components/PriceFormatter";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";
import useCartStore from "@/store";

const deliveryCharges: Record<string, number> = {
  Karachi: 200,
  Lahore: 250,
  Islamabad: 300,
  Rawalpindi: 300,
  Faisalabad: 220,
  Multan: 250,
  Peshawar: 280,
  Quetta: 300,
  Hyderabad: 230,
  Sialkot: 260,
};

const CheckOutPage = () => {
  const { getTotalPrice, resetCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const router = useRouter();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    city: "Karachi", // Default city
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) return;

    const deliveryCharge = deliveryCharges[userDetails.city] || 0;
    const totalAmount = getTotalPrice() + deliveryCharge;

    const emailParams = {
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phone,
      address: userDetails.address,
      city: userDetails.city,
      delivery_charges: deliveryCharge,
      payment_method: paymentMethod,
      total: totalAmount,
      order_date: new Date().toLocaleDateString(),
    };

    try {
      await emailjs.send(
        "service_4i6u1ql",
        "template_vcdpxjv",
        emailParams,
        "xnTBmJVGvqMHV3XbJ"
      );
      resetCart();
      router.push("/success");
    } catch (error) {
      console.error("EmailJS error:", error);
    }
  };

  return (
    <div className="bg-gray-50 py-10">
      <Container>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Checkout</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <PriceFormatter amount={deliveryCharges[userDetails.city] || 0} />
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Total</span>
                <PriceFormatter
                  amount={getTotalPrice() + (deliveryCharges[userDetails.city] || 0)}
                  className="text-lg font-bold text-black"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
                <div className="space-y-2">
                  {["cod", "jazzcash", "easypaisa", "card"].map((method) => (
                    <label key={method} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                        className="w-4 h-4"
                      />
                      <span>
                        {method === "cod"
                          ? "Cash on Delivery (COD)"
                          : `${method.charAt(0).toUpperCase() + method.slice(1)} (SOON)`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
            <form onSubmit={handleCheckout} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={userDetails.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={userDetails.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                value={userDetails.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                name="address"
                placeholder="Shipping Address"
                required
                value={userDetails.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
              <select
                name="city"
                value={userDetails.city}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                {Object.keys(deliveryCharges).map((city) => (
                  <option key={city} value={city}>
                    {city} - {deliveryCharges[city]} PKR
                  </option>
                ))}
              </select>
              <Button
                type="submit"
                disabled={!paymentMethod}
                className="w-full rounded-full font-semibold tracking-wide mt-4"
                size="lg"
              >
                Submit Order
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckOutPage;