"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import StoreShell from "../../components/store/StoreShell";
import styles from "../../components/HomeLanding.module.css";
import c from "./Checkout.module.css";
import { clearCart, getCart, type CartItem } from "../../lib/cart";
import { products } from "../../lib/products";

type Step = "address" | "shipping" | "payment" | "review" | "confirmation";

type Address = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

const emptyAddress: Address = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  line1: "",
  city: "",
  state: "",
  zip: "",
  country: "United States"
};

function fmt(n: number) {
  return `$${Number(n).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })}`;
}


function digitsOnly(v: string) {
  return v.replace(/\D/g, "");
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function isPhone(v: string) {
  const d = digitsOnly(v);
  return d.length >= 10 && d.length <= 15;
}

function luhnOk(cardNumber: string) {
  const s = digitsOnly(cardNumber);
  if (s.length < 12) return false;
  let sum = 0;
  let alt = false;
  for (let i = s.length - 1; i >= 0; i--) {
    let n = Number(s[i]);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

function normalizeExpiry(v: string) {
  const cleaned = v.replace(/[^0-9/]/g, "").slice(0, 5);
  if (/^\d{2}$/.test(cleaned)) return `${cleaned}/`;
  if (/^\d{2}\d{1,2}$/.test(cleaned)) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  return cleaned;
}

function expiryOk(v: string) {
  const m = v.match(/^(\d{2})\/(\d{2})$/);
  if (!m) return false;
  const mm = Number(m[1]);
  const yy = Number(m[2]);
  if (mm < 1 || mm > 12) return false;
  const now = new Date();
  const curYY = now.getFullYear() % 100;
  const curMM = now.getMonth() + 1;
  if (yy < curYY) return false;
  if (yy === curYY && mm < curMM) return false;
  return true;
}

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>("address");
  const [maxStep, setMaxStep] = useState<Step>("address");

  const [billingAddress, setBillingAddress] = useState<Address>({ ...emptyAddress });
  const [shippingAddress, setShippingAddress] = useState<Address>({ ...emptyAddress });
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [shippingEdited, setShippingEdited] = useState(false);

  const [shipping, setShipping] = useState<"standard" | "express">("standard");

  const [payment, setPayment] = useState({
    method: "card" as const,
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: ""
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const effectiveShippingAddress = sameAsBilling ? billingAddress : shippingAddress;

  useEffect(() => {
    if (!sameAsBilling) return;
    setShippingAddress({ ...billingAddress });
    setShippingEdited(false);
  }, [billingAddress, sameAsBilling]);

  function touchKey(group: "bill" | "ship" | "pay", key: string) {
    return `${group}.${key}`;
  }

  useEffect(() => {
    const update = () => setCart(getCart());
    update();

    const onCart = () => update();
    const onStorage = () => update();
    window.addEventListener("zenvora-cart", onCart as EventListener);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("zenvora-cart", onCart as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const detailed = useMemo(() => {
    return cart
      .map((it) => ({
        ...it,
        product: products.find((p) => p.slug === it.slug)
      }))
      .filter((it: any) => Boolean(it.product));
  }, [cart]);

  const subtotal = useMemo(() => {
    return detailed.reduce((s: number, it: any) => s + (it.product.price ?? 0) * it.quantity, 0);
  }, [detailed]);

  const shippingCost = shipping === "express" ? 24.99 : 0;
  const tax = 0;
  const total = +(subtotal + shippingCost + tax).toFixed(2);

  const steps: { key: Step; label: string }[] = [
    { key: "address", label: "Address" },
    { key: "shipping", label: "Shipping" },
    { key: "payment", label: "Payment" },
    { key: "review", label: "Review" },
    { key: "confirmation", label: "Done" }
  ];

  const visibleSteps: Step[] = ["address", "shipping", "payment", "review"];
  const progressIndex = Math.max(0, visibleSteps.findIndex((k) => k === step));
  const progressPct = step === "confirmation" ? 100 : ((progressIndex + 1) / visibleSteps.length) * 100;

  const deliveryEstimate = shipping === "express" ? "2–5 business days" : "5–12 business days";

  function markTouched(keys: string[]) {
    setTouched((prev) => {
      const next = { ...prev };
      for (const k of keys) next[k] = true;
      return next;
    });
  }

  function validateAddress(a: Address) {
    const e: Record<string, string> = {};
    if (!a.firstName.trim()) e.firstName = "First name is required.";
    if (!a.lastName.trim()) e.lastName = "Last name is required.";
    if (!a.email.trim()) e.email = "Email is required.";
    else if (!isEmail(a.email)) e.email = "Enter a valid email address.";
    if (!a.phone.trim()) e.phone = "Phone number is required.";
    else if (!isPhone(a.phone)) e.phone = "Enter a valid phone number (10–15 digits).";
    if (!a.line1.trim()) e.line1 = "Street address is required.";
    if (!a.city.trim()) e.city = "City is required.";
    if (!a.state.trim()) e.state = "State/Province is required.";
    if (!a.zip.trim()) e.zip = "ZIP/Postal code is required.";
    if (!a.country.trim()) e.country = "Country is required.";
    return e;
  }

  function validatePayment(p: typeof payment) {
    const e: Record<string, string> = {};
    if (!p.cardName.trim()) e.cardName = "Name on card is required.";
    if (!p.cardNumber.trim()) e.cardNumber = "Card number is required.";
    else if (!luhnOk(p.cardNumber)) e.cardNumber = "Enter a valid card number.";
    if (!p.expiry.trim()) e.expiry = "Expiry is required.";
    else if (!expiryOk(p.expiry)) e.expiry = "Enter a valid expiry (MM/YY).";
    if (!p.cvc.trim()) e.cvc = "CVC is required.";
    else {
      const d = digitsOnly(p.cvc);
      if (d.length < 3 || d.length > 4) e.cvc = "Enter a valid CVC (3–4 digits).";
    }
    return e;
  }

  const billingErrors = useMemo(() => validateAddress(billingAddress), [billingAddress]);
  const shippingErrors = useMemo(() => validateAddress(shippingAddress), [shippingAddress]);
  const paymentErrors = useMemo(() => validatePayment(payment), [payment]);

  const billingValid = Object.keys(billingErrors).length === 0;
  const shippingAddressValid = sameAsBilling ? true : Object.keys(shippingErrors).length === 0;
  const addressValid = billingValid && shippingAddressValid;
  const paymentValid = Object.keys(paymentErrors).length === 0;
  const shippingStepValid = true;
  const reviewValid = detailed.length > 0;

  const primaryLabel = step === "review" ? "Pay & Place Order" : "Continue";
  const primaryDisabled =
    step === "address"
      ? !addressValid
      : step === "shipping"
        ? !shippingStepValid
        : step === "payment"
          ? !paymentValid
          : step === "review"
            ? !reviewValid || !addressValid || !paymentValid
            : true;

  const maskedCard = (() => {
    const d = digitsOnly(payment.cardNumber);
    const last4 = d.length >= 4 ? d.slice(-4) : "";
    return last4 ? `•••• •••• •••• ${last4}` : "•••• •••• •••• ••••";
  })();

  function goNext() {
    setSubmitAttempted(true);

    if (step === "address") {
      markTouched([
        touchKey("bill", "firstName"),
        touchKey("bill", "lastName"),
        touchKey("bill", "email"),
        touchKey("bill", "phone"),
        touchKey("bill", "line1"),
        touchKey("bill", "city"),
        touchKey("bill", "state"),
        touchKey("bill", "zip"),
        touchKey("bill", "country"),
        ...(sameAsBilling
          ? []
          : [
              touchKey("ship", "firstName"),
              touchKey("ship", "lastName"),
              touchKey("ship", "email"),
              touchKey("ship", "phone"),
              touchKey("ship", "line1"),
              touchKey("ship", "city"),
              touchKey("ship", "state"),
              touchKey("ship", "zip"),
              touchKey("ship", "country")
            ])
      ]);
      if (!addressValid) return;
    }

    if (step === "payment") {
      markTouched(["cardName", "cardNumber", "expiry", "cvc"]);
      if (!paymentValid) return;
    }

    const idx = steps.findIndex((s) => s.key === step);
    if (idx === -1 || idx === steps.length - 1) return;
    const nextKey = steps[idx + 1].key;

    setStep(nextKey);

    const nextIdx = steps.findIndex((s) => s.key === nextKey);
    const maxIdx = steps.findIndex((s) => s.key === maxStep);
    if (nextIdx > maxIdx) setMaxStep(nextKey);
  }

  function goBack() {
    const idx = steps.findIndex((s) => s.key === step);
    if (idx <= 0) return;
    setStep(steps[idx - 1].key);
  }

  function placeOrder() {
    setSubmitAttempted(true);
    if (!reviewValid) {
      alert("Your cart is empty.");
      return;
    }
    if (!addressValid) {
      setStep("address");
      markTouched([
        touchKey("bill", "firstName"),
        touchKey("bill", "lastName"),
        touchKey("bill", "email"),
        touchKey("bill", "phone"),
        touchKey("bill", "line1"),
        touchKey("bill", "city"),
        touchKey("bill", "state"),
        touchKey("bill", "zip"),
        touchKey("bill", "country"),
        ...(sameAsBilling
          ? []
          : [
              touchKey("ship", "firstName"),
              touchKey("ship", "lastName"),
              touchKey("ship", "email"),
              touchKey("ship", "phone"),
              touchKey("ship", "line1"),
              touchKey("ship", "city"),
              touchKey("ship", "state"),
              touchKey("ship", "zip"),
              touchKey("ship", "country")
            ])
      ]);
      return;
    }
    if (!paymentValid) {
      setStep("payment");
      markTouched(["cardName", "cardNumber", "expiry", "cvc"]);
      return;
    }

    clearCart();
    setStep("confirmation");
  }

  const primaryAction = step === "review" ? placeOrder : goNext;

  return (
    <StoreShell
      title="Secure Checkout"
      subtitle="Fast, secure checkout. Clear steps, real-time totals, and policy-linked confidence."
    >
      {detailed.length === 0 && step !== "confirmation" ? (
        <div className={styles.infoCard}>
          <div style={{ fontWeight: 900 }}>Your cart is empty.</div>
          <p className={styles.muted} style={{ marginBottom: 0 }}>
            Go to <Link href="/shop">Shop</Link> to add items before checkout.
          </p>
        </div>
      ) : null}

      <div className={styles.sectionHead} style={{ marginTop: 0 }}>
        <div className={c.steps}>
          <div className={c.stepRow} aria-label="Checkout steps">
            {visibleSteps.map((k, idx) => {
              const isActive = step === k;
              const maxIdx = steps.findIndex((s) => s.key === maxStep);
              const allowed = steps.findIndex((s) => s.key === k) <= maxIdx;
              const done = steps.findIndex((s) => s.key === k) < maxIdx;
              return (
                <button
                  key={k}
                  type="button"
                  className={`${c.step} ${isActive ? c.stepActive : ""} ${done ? c.stepDone : ""}`}
                  aria-current={isActive ? "step" : undefined}
                  aria-disabled={!allowed}
                  onClick={() => {
                    if (step === "confirmation") return;
                    if (!allowed) return;
                    setStep(k);
                  }}
                >
                  <span className={c.stepNum}>{idx + 1}</span>
                  <span style={{ fontWeight: 900 }}>{steps.find((s) => s.key === k)?.label}</span>
                </button>
              );
            })}
          </div>
          <div className={c.progress} aria-label="Progress">
            <div className={c.progressBar} style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <div className={c.subhead}>
          <svg className={c.lock} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7.5 10V8.2C7.5 5.9 9.4 4 11.7 4h.6c2.3 0 4.2 1.9 4.2 4.2V10"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M7 10h10c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
          Secure payments (SSL/TLS) • Policies: <Link href="/policies/refund">Refund</Link> • <Link href="/policies/shipping">Shipping</Link>
        </div>

        <div className={c.paymentRow} aria-label="Payment methods accepted">
          <svg className={c.payIcon} viewBox="0 0 72 28" aria-label="Visa" role="img">
            <rect x="1" y="1" width="70" height="26" rx="8" fill="none" stroke="currentColor" />
            <text x="36" y="18" textAnchor="middle" fontSize="12" fontWeight="800" fill="currentColor">VISA</text>
          </svg>
          <svg className={c.payIcon} viewBox="0 0 72 28" aria-label="Mastercard" role="img">
            <rect x="1" y="1" width="70" height="26" rx="8" fill="none" stroke="currentColor" />
            <text x="36" y="18" textAnchor="middle" fontSize="12" fontWeight="800" fill="currentColor">MASTERCARD</text>
          </svg>
          <svg className={c.payIcon} viewBox="0 0 72 28" aria-label="American Express" role="img">
            <rect x="1" y="1" width="70" height="26" rx="8" fill="none" stroke="currentColor" />
            <text x="36" y="18" textAnchor="middle" fontSize="12" fontWeight="800" fill="currentColor">AMEX</text>
          </svg>
          <svg className={c.payIcon} viewBox="0 0 72 28" aria-label="Apple Pay" role="img">
            <rect x="1" y="1" width="70" height="26" rx="8" fill="none" stroke="currentColor" />
            <text x="36" y="18" textAnchor="middle" fontSize="12" fontWeight="800" fill="currentColor">APPLE PAY</text>
          </svg>
          <div className={c.caption}>
            <svg className={c.lock} viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7.5 10V8.2C7.5 5.9 9.4 4 11.7 4h.6c2.3 0 4.2 1.9 4.2 4.2V10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M7 10h10c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            Secure payments (SSL/TLS)
          </div>
        </div>
      </div>

      <div className={c.wrap}>
        <div className={c.card}>
          {step === "address" ? (
            <>
              <h3 className={c.sectionTitle}>Billing Address</h3>
              <div className={c.subhead}>Required fields must be completed.</div>

              <div className={styles.two}>
                <div className={`${styles.field} ${(touched[touchKey("bill", "firstName")] || submitAttempted) && billingErrors.firstName ? c.fieldError : ""}`}>
                  <label className={c.label}>First Name</label>
                  <input
                    className={c.input}
                    value={billingAddress.firstName}
                    onBlur={() => markTouched([touchKey("bill", "firstName")])}
                    onChange={(e) => setBillingAddress({ ...billingAddress, firstName: e.target.value })}
                    placeholder="John"
                    autoComplete="given-name"
                  />
                  {(touched[touchKey("bill", "firstName")] || submitAttempted) && billingErrors.firstName ? (
                    <div className={c.errorText}>{billingErrors.firstName}</div>
                  ) : null}
                </div>

                <div className={`${styles.field} ${(touched[touchKey("bill", "lastName")] || submitAttempted) && billingErrors.lastName ? c.fieldError : ""}`}>
                  <label className={c.label}>Last Name</label>
                  <input
                    className={c.input}
                    value={billingAddress.lastName}
                    onBlur={() => markTouched([touchKey("bill", "lastName")])}
                    onChange={(e) => setBillingAddress({ ...billingAddress, lastName: e.target.value })}
                    placeholder="Doe"
                    autoComplete="family-name"
                  />
                  {(touched[touchKey("bill", "lastName")] || submitAttempted) && billingErrors.lastName ? (
                    <div className={c.errorText}>{billingErrors.lastName}</div>
                  ) : null}
                </div>
              </div>

              <div className={styles.two}>
                <div className={`${styles.field} ${(touched[touchKey("bill", "email")] || submitAttempted) && billingErrors.email ? c.fieldError : ""}`}>
                  <label className={c.label}>Email</label>
                  <input
                    className={c.input}
                    value={billingAddress.email}
                    onBlur={() => markTouched([touchKey("bill", "email")])}
                    onChange={(e) => setBillingAddress({ ...billingAddress, email: e.target.value })}
                    placeholder="you@example.com"
                    autoComplete="email"
                    inputMode="email"
                  />
                  {(touched[touchKey("bill", "email")] || submitAttempted) && billingErrors.email ? (
                    <div className={c.errorText}>{billingErrors.email}</div>
                  ) : null}
                </div>

                <div className={`${styles.field} ${(touched[touchKey("bill", "phone")] || submitAttempted) && billingErrors.phone ? c.fieldError : ""}`}>
                  <label className={c.label}>Phone</label>
                  <input
                    className={c.input}
                    value={billingAddress.phone}
                    onBlur={() => markTouched([touchKey("bill", "phone")])}
                    onChange={(e) => setBillingAddress({ ...billingAddress, phone: e.target.value })}
                    placeholder="+1 (555) 555-5555"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                  {(touched[touchKey("bill", "phone")] || submitAttempted) && billingErrors.phone ? (
                    <div className={c.errorText}>{billingErrors.phone}</div>
                  ) : null}
                </div>
              </div>

              <div className={`${styles.field} ${(touched[touchKey("bill", "line1")] || submitAttempted) && billingErrors.line1 ? c.fieldError : ""}`}>
                <label className={c.label}>Street Address</label>
                <input
                  className={c.input}
                  value={billingAddress.line1}
                  onBlur={() => markTouched([touchKey("bill", "line1")])}
                  onChange={(e) => setBillingAddress({ ...billingAddress, line1: e.target.value })}
                  placeholder="Street address, P.O. box, company name"
                  autoComplete="address-line1"
                />
                {(touched[touchKey("bill", "line1")] || submitAttempted) && billingErrors.line1 ? <div className={c.errorText}>{billingErrors.line1}</div> : null}
              </div>

              <div className={styles.two}>
                <div className={`${styles.field} ${(touched[touchKey("bill", "city")] || submitAttempted) && billingErrors.city ? c.fieldError : ""}`}>
                  <label className={c.label}>City</label>
                  <input
                    className={c.input}
                    value={billingAddress.city}
                    onBlur={() => markTouched([touchKey("bill", "city")])}
                    onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                    placeholder="City"
                    autoComplete="address-level2"
                  />
                  {(touched[touchKey("bill", "city")] || submitAttempted) && billingErrors.city ? <div className={c.errorText}>{billingErrors.city}</div> : null}
                </div>

                <div className={`${styles.field} ${(touched[touchKey("bill", "state")] || submitAttempted) && billingErrors.state ? c.fieldError : ""}`}>
                  <label className={c.label}>State/Province</label>
                  <input
                    className={c.input}
                    value={billingAddress.state}
                    onBlur={() => markTouched([touchKey("bill", "state")])}
                    onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                    placeholder="State / Province"
                    autoComplete="address-level1"
                  />
                  {(touched[touchKey("bill", "state")] || submitAttempted) && billingErrors.state ? <div className={c.errorText}>{billingErrors.state}</div> : null}
                </div>
              </div>

              <div className={styles.two}>
                <div className={`${styles.field} ${(touched[touchKey("bill", "zip")] || submitAttempted) && billingErrors.zip ? c.fieldError : ""}`}>
                  <label className={c.label}>ZIP/Postal</label>
                  <input
                    className={c.input}
                    value={billingAddress.zip}
                    onBlur={() => markTouched([touchKey("bill", "zip")])}
                    onChange={(e) => setBillingAddress({ ...billingAddress, zip: e.target.value })}
                    placeholder="ZIP / Postal"
                    autoComplete="postal-code"
                  />
                  {(touched[touchKey("bill", "zip")] || submitAttempted) && billingErrors.zip ? <div className={c.errorText}>{billingErrors.zip}</div> : null}
                </div>

                <div className={`${styles.field} ${(touched[touchKey("bill", "country")] || submitAttempted) && billingErrors.country ? c.fieldError : ""}`}>
                  <label className={c.label}>Country</label>
                  <input
                    className={c.input}
                    value={billingAddress.country}
                    onBlur={() => markTouched([touchKey("bill", "country")])}
                    onChange={(e) => setBillingAddress({ ...billingAddress, country: e.target.value })}
                    placeholder="United States"
                    autoComplete="country-name"
                  />
                  {(touched[touchKey("bill", "country")] || submitAttempted) && billingErrors.country ? <div className={c.errorText}>{billingErrors.country}</div> : null}
                </div>
              </div>

              <div className={c.checkRow}>
                <input
                  className={c.checkbox}
                  type="checkbox"
                  checked={sameAsBilling}
                  onChange={(e) => {
                    const next = e.target.checked;
                    if (next) {
                      setSameAsBilling(true);
                      setShippingAddress({ ...billingAddress });
                      setShippingEdited(false);
                    } else {
                      setSameAsBilling(false);
                      if (!shippingEdited) setShippingAddress({ ...emptyAddress, country: billingAddress.country || "United States" });
                    }
                  }}
                />
                <div className={c.checkText}>
                  <div className={c.checkTitle}>Shipping address is the same as billing</div>
                  <div className={c.checkHint}>Recommended for faster checkout.</div>
                </div>
              </div>

              {!sameAsBilling ? (
                <>
                  <h3 className={c.sectionTitle}>Shipping Address</h3>
                  <div className={c.subhead}>Required when shipping differs from billing.</div>

                  <div className={styles.two}>
                    <div
                      className={`${styles.field} ${(touched[touchKey("ship", "firstName")] || submitAttempted) && shippingErrors.firstName ? c.fieldError : ""}`}
                    >
                      <label className={c.label}>First Name</label>
                      <input
                        className={c.input}
                        value={shippingAddress.firstName}
                        onBlur={() => markTouched([touchKey("ship", "firstName")])}
                        onChange={(e) => {
                          setShippingEdited(true);
                          setShippingAddress({ ...shippingAddress, firstName: e.target.value });
                        }}
                        placeholder="John"
                        autoComplete="shipping given-name"
                      />
                      {(touched[touchKey("ship", "firstName")] || submitAttempted) && shippingErrors.firstName ? (
                        <div className={c.errorText}>{shippingErrors.firstName}</div>
                      ) : null}
                    </div>

                    <div
                      className={`${styles.field} ${(touched[touchKey("ship", "lastName")] || submitAttempted) && shippingErrors.lastName ? c.fieldError : ""}`}
                    >
                      <label className={c.label}>Last Name</label>
                      <input
                        className={c.input}
                        value={shippingAddress.lastName}
                        onBlur={() => markTouched([touchKey("ship", "lastName")])}
                        onChange={(e) => {
                          setShippingEdited(true);
                          setShippingAddress({ ...shippingAddress, lastName: e.target.value });
                        }}
                        placeholder="Doe"
                        autoComplete="shipping family-name"
                      />
                      {(touched[touchKey("ship", "lastName")] || submitAttempted) && shippingErrors.lastName ? (
                        <div className={c.errorText}>{shippingErrors.lastName}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className={styles.two}>
                    <div
                      className={`${styles.field} ${(touched[touchKey("ship", "email")] || submitAttempted) && shippingErrors.email ? c.fieldError : ""}`}
                    >
                      <label className={c.label}>Email</label>
                      <input
                        className={c.input}
                        value={shippingAddress.email}
                        onBlur={() => markTouched([touchKey("ship", "email")])}
                        onChange={(e) => {
                          setShippingEdited(true);
                          setShippingAddress({ ...shippingAddress, email: e.target.value });
                        }}
                        placeholder="you@example.com"
                        autoComplete="shipping email"
                        inputMode="email"
                      />
                      {(touched[touchKey("ship", "email")] || submitAttempted) && shippingErrors.email ? (
                        <div className={c.errorText}>{shippingErrors.email}</div>
                      ) : null}
                    </div>

                    <div
                      className={`${styles.field} ${(touched[touchKey("ship", "phone")] || submitAttempted) && shippingErrors.phone ? c.fieldError : ""}`}
                    >
                      <label className={c.label}>Phone</label>
                      <input
                        className={c.input}
                        value={shippingAddress.phone}
                        onBlur={() => markTouched([touchKey("ship", "phone")])}
                        onChange={(e) => {
                          setShippingEdited(true);
                          setShippingAddress({ ...shippingAddress, phone: e.target.value });
                        }}
                        placeholder="+1 (555) 555-5555"
                        autoComplete="shipping tel"
                        inputMode="tel"
                      />
                      {(touched[touchKey("ship", "phone")] || submitAttempted) && shippingErrors.phone ? (
                        <div className={c.errorText}>{shippingErrors.phone}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className={`${styles.field} ${(touched[touchKey("ship", "line1")] || submitAttempted) && shippingErrors.line1 ? c.fieldError : ""}`}>
                    <label className={c.label}>Street Address</label>
                    <input
                      className={c.input}
                      value={shippingAddress.line1}
                      onBlur={() => markTouched([touchKey("ship", "line1")])}
                      onChange={(e) => {
                        setShippingEdited(true);
                        setShippingAddress({ ...shippingAddress, line1: e.target.value });
                      }}
                      placeholder="Street address, P.O. box, company name"
                      autoComplete="shipping address-line1"
                    />
                    {(touched[touchKey("ship", "line1")] || submitAttempted) && shippingErrors.line1 ? <div className={c.errorText}>{shippingErrors.line1}</div> : null}
                  </div>

                  <div className={styles.two}>
                    <div
                      className={`${styles.field} ${(touched[touchKey("ship", "city")] || submitAttempted) && shippingErrors.city ? c.fieldError : ""}`}
                    >
                      <label className={c.label}>City</label>
                      <input
                        className={c.input}
                        value={shippingAddress.city}
                        onBlur={() => markTouched([touchKey("ship", "city")])}
                        onChange={(e) => {
                          setShippingEdited(true);
                          setShippingAddress({ ...shippingAddress, city: e.target.value });
                        }}
                        placeholder="City"
                        autoComplete="shipping address-level2"
                      />
                      {(touched[touchKey("ship", "city")] || submitAttempted) && shippingErrors.city ? <div className={c.errorText}>{shippingErrors.city}</div> : null}
                    </div>

                    <div
                      className={`${styles.field} ${(touched[touchKey("ship", "state")] || submitAttempted) && shippingErrors.state ? c.fieldError : ""}`}
                    >
                      <label className={c.label}>State/Province</label>
                      <input
                        className={c.input}
                        value={shippingAddress.state}
                        onBlur={() => markTouched([touchKey("ship", "state")])}
                        onChange={(e) => {
                          setShippingEdited(true);
                          setShippingAddress({ ...shippingAddress, state: e.target.value });
                        }}
                        placeholder="State / Province"
                        autoComplete="shipping address-level1"
                      />
                      {(touched[touchKey("ship", "state")] || submitAttempted) && shippingErrors.state ? <div className={c.errorText}>{shippingErrors.state}</div> : null}
                    </div>
                  </div>

                  <div className={styles.two}>
                    <div
                      className={`${styles.field} ${(touched[touchKey("ship", "zip")] || submitAttempted) && shippingErrors.zip ? c.fieldError : ""}`}
                    >
                      <label className={c.label}>ZIP/Postal</label>
                      <input
                        className={c.input}
                        value={shippingAddress.zip}
                        onBlur={() => markTouched([touchKey("ship", "zip")])}
                        onChange={(e) => {
                          setShippingEdited(true);
                          setShippingAddress({ ...shippingAddress, zip: e.target.value });
                        }}
                        placeholder="ZIP / Postal"
                        autoComplete="shipping postal-code"
                      />
                      {(touched[touchKey("ship", "zip")] || submitAttempted) && shippingErrors.zip ? <div className={c.errorText}>{shippingErrors.zip}</div> : null}
                    </div>

                    <div
                      className={`${styles.field} ${(touched[touchKey("ship", "country")] || submitAttempted) && shippingErrors.country ? c.fieldError : ""}`}
                    >
                      <label className={c.label}>Country</label>
                      <input
                        className={c.input}
                        value={shippingAddress.country}
                        onBlur={() => markTouched([touchKey("ship", "country")])}
                        onChange={(e) => {
                          setShippingEdited(true);
                          setShippingAddress({ ...shippingAddress, country: e.target.value });
                        }}
                        placeholder="United States"
                        autoComplete="shipping country-name"
                      />
                      {(touched[touchKey("ship", "country")] || submitAttempted) && shippingErrors.country ? <div className={c.errorText}>{shippingErrors.country}</div> : null}
                    </div>
                  </div>
                </>
              ) : null}

              <div className={`${styles.muted} ${styles.small} ${c.hint}`}>
                Need help? Visit <Link href="/contact">Contact</Link>. Policies: <Link href="/policies/shipping">Shipping</Link> •{" "}
                <Link href="/policies/refund">Refund</Link>.
              </div>
            </>
          ) : null}

          {step === "shipping" ? (
            <>
              <h3 className={c.sectionTitle}>Shipping Options</h3>
              <div className={`${styles.muted} ${styles.small}`}>Choose the delivery speed that fits your timeline.</div>
              <div className={c.optionGrid}>
                <button type="button" className={`${c.optionCard} ${shipping === "standard" ? c.optionActive : ""}`} onClick={() => setShipping("standard")}>
                  <div style={{ fontWeight: 900 }}>Standard Worldwide</div>
                  <div className={styles.muted}>Free • 5–12 business days • Tracking where available</div>
                  <div className={`${styles.muted} ${styles.small}`} style={{ marginTop: 8 }}>
                    Recommended for best value.
                  </div>
                </button>
                <button type="button" className={`${c.optionCard} ${shipping === "express" ? c.optionActive : ""}`} onClick={() => setShipping("express")}>
                  <div style={{ fontWeight: 900 }}>Express Worldwide</div>
                  <div className={styles.muted}>$24.99 • 2–5 business days • Priority processing</div>
                  <div className={`${styles.muted} ${styles.small}`} style={{ marginTop: 8 }}>
                    Best for urgent orders.
                  </div>
                </button>
              </div>
            </>
          ) : null}

          {step === "payment" ? (
            <>
              <h3 className={c.sectionTitle}>Payment</h3>
              <p className={styles.muted} style={{ marginTop: 0 }}>
                Enter card details to complete your purchase. (Demo UI: payment processing is not yet connected.)
              </p>

              <div className={`${styles.field} ${(touched[touchKey("pay", "cardName")] || submitAttempted) && paymentErrors.cardName ? c.fieldError : ""}`}>
                <label className={c.label}>Name on Card</label>
                <input
                  value={payment.cardName}
                  className={c.input}
                  onBlur={() => markTouched([touchKey("pay", "cardName")])}
                  onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                  placeholder="Name as shown on card"
                  autoComplete="cc-name"
                />
                {(touched[touchKey("pay", "cardName")] || submitAttempted) && paymentErrors.cardName ? <div className={c.errorText}>{paymentErrors.cardName}</div> : null}
              </div>

              <div className={`${styles.field} ${(touched[touchKey("pay", "cardNumber")] || submitAttempted) && paymentErrors.cardNumber ? c.fieldError : ""}`}>
                <label className={c.label}>Card Number</label>
                <input
                  placeholder="1234 5678 9012 3456"
                  value={payment.cardNumber}
                  className={c.input}
                  onBlur={() => markTouched([touchKey("pay", "cardNumber")])}
                  onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                  inputMode="numeric"
                  autoComplete="cc-number"
                />
                {(touched[touchKey("pay", "cardNumber")] || submitAttempted) && paymentErrors.cardNumber ? <div className={c.errorText}>{paymentErrors.cardNumber}</div> : null}
              </div>

              <div className={styles.two}>
                <div className={`${styles.field} ${(touched[touchKey("pay", "expiry")] || submitAttempted) && paymentErrors.expiry ? c.fieldError : ""}`}>
                  <label className={c.label}>Expiry</label>
                  <input
                    placeholder="MM/YY"
                    value={payment.expiry}
                    className={c.input}
                    onBlur={() => markTouched([touchKey("pay", "expiry")])}
                    onChange={(e) => setPayment({ ...payment, expiry: normalizeExpiry(e.target.value) })}
                    inputMode="numeric"
                    autoComplete="cc-exp"
                  />
                  {(touched[touchKey("pay", "expiry")] || submitAttempted) && paymentErrors.expiry ? <div className={c.errorText}>{paymentErrors.expiry}</div> : null}
                </div>
                <div className={`${styles.field} ${(touched[touchKey("pay", "cvc")] || submitAttempted) && paymentErrors.cvc ? c.fieldError : ""}`}>
                  <label className={c.label}>CVC</label>
                  <input
                    placeholder="123"
                    value={payment.cvc}
                    className={c.input}
                    onBlur={() => markTouched([touchKey("pay", "cvc")])}
                    onChange={(e) => setPayment({ ...payment, cvc: digitsOnly(e.target.value).slice(0, 4) })}
                    inputMode="numeric"
                    autoComplete="cc-csc"
                  />
                  {(touched[touchKey("pay", "cvc")] || submitAttempted) && paymentErrors.cvc ? <div className={c.errorText}>{paymentErrors.cvc}</div> : null}
                </div>
              </div>

              <div className={`${styles.muted} ${styles.small}`}>
                Your details are encrypted in transit. By continuing, you agree to the <Link href="/policies/refund">Refund Policy</Link>.
              </div>
            </>
          ) : null}

          {step === "review" ? (
            <>
              <h3 className={c.sectionTitle}>Review & Confirm</h3>

              <div className={styles.cards} style={{ gridTemplateColumns: "1fr" }}>
                <div className={styles.trust}>
                  <div style={{ fontWeight: 900, marginBottom: 8 }}>Delivery</div>
                  <div className={styles.muted}>
                    {effectiveShippingAddress.firstName} {effectiveShippingAddress.lastName} • {effectiveShippingAddress.line1}
                    {effectiveShippingAddress.city ? `, ${effectiveShippingAddress.city}` : ""}
                    {effectiveShippingAddress.state ? `, ${effectiveShippingAddress.state}` : ""} {effectiveShippingAddress.zip}
                  </div>
                  <div className={`${styles.muted} ${styles.small}`} style={{ marginTop: 6 }}>
                    {shipping === "express" ? "Express Worldwide" : "Standard Worldwide"} • {deliveryEstimate}
                  </div>
                </div>
                <div className={styles.trust}>
                  <div style={{ fontWeight: 900, marginBottom: 8 }}>Payment</div>
                  <div className={styles.muted}>{maskedCard}</div>
                  <div className={`${styles.muted} ${styles.small}`} style={{ marginTop: 6 }}>
                    Cardholder: {payment.cardName || "—"}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                {detailed.map((it: any) => (
                  <div key={`${it.slug}-${it.variant?.color ?? ""}-${it.variant?.storage ?? ""}`} className={styles.trust}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                      <div>
                        <div style={{ fontWeight: 900 }}>{it.product?.title}</div>
                        <div className={styles.muted}>
                          Qty: {it.quantity}
                          {it.variant?.color || it.variant?.storage
                            ? ` • ${it.variant?.color ?? "—"} • ${it.variant?.storage ?? "—"}`
                            : ""}
                        </div>
                      </div>
                      <div style={{ fontWeight: 900 }}>{fmt((it.product?.price ?? 0) * it.quantity)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`${styles.muted} ${styles.small}`} style={{ marginTop: 12 }}>
                Secure checkout • Encryption in transit • See <Link href="/policies/shipping">Shipping</Link> & <Link href="/policies/refund">Refund</Link> policies.
              </div>
            </>
          ) : null}

          {step === "confirmation" ? (
            <>
              <h3 className={c.sectionTitle}>Order Confirmed</h3>
              <p className={styles.muted}>
                Thanks! Your order has been placed (demo). In production, you would receive an email confirmation and tracking details within minutes.
              </p>
              <div className={styles.cards}>
                <Link className={`${styles.btn} ${styles.primary}`} href="/shop">
                  Continue Shopping
                </Link>
                <Link className={`${styles.btn} ${styles.ghost}`} href="/">
                  Back Home
                </Link>
              </div>
            </>
          ) : null}

          {step !== "confirmation" ? (
            <div className={c.actions}>
              <button className={`${styles.btn} ${styles.ghost}`} type="button" onClick={goBack} disabled={step === "address"}>
                Back
              </button>

              <button
                className={`${styles.btn} ${styles.primary}`}
                type="button"
                onClick={primaryAction}
                disabled={primaryDisabled}
                aria-disabled={primaryDisabled}
              >
                {primaryLabel}
              </button>
            </div>
          ) : null}
        </div>

        <div className={`${c.card} ${c.summarySticky}`}>
          <h3 className={c.sectionTitle}>Order Summary</h3>
          <div className={`${styles.muted} ${styles.small}`}>Shipping updates in real-time.</div>

          <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
            {detailed.slice(0, 4).map((it: any) => (
              <div
                key={`${it.slug}-${it.variant?.color ?? ""}-${it.variant?.storage ?? ""}`}
                style={{ display: "flex", justifyContent: "space-between", gap: 12 }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 900, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {it.product?.title}
                  </div>
                  <div className={`${styles.muted} ${styles.small}`}>
                    Qty {it.quantity}
                    {it.variant?.color || it.variant?.storage
                      ? ` • ${it.variant?.color ?? "—"} • ${it.variant?.storage ?? "—"}`
                      : ""}
                  </div>
                </div>
                <div style={{ fontWeight: 900 }}>{fmt((it.product?.price ?? 0) * it.quantity)}</div>
              </div>
            ))}
            {detailed.length > 4 ? <div className={`${styles.muted} ${styles.small}`}>+ {detailed.length - 4} more item(s)</div> : null}
          </div>

          <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className={styles.muted}>Subtotal</div>
              <div style={{ fontWeight: 900 }}>{fmt(subtotal)}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className={styles.muted}>Shipping</div>
              <div style={{ fontWeight: 900 }}>{shippingCost === 0 ? "Free" : fmt(shippingCost)}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className={styles.muted}>Tax</div>
              <div style={{ fontWeight: 900 }}>{fmt(tax)}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 1000 }}>Total</div>
              <div style={{ fontWeight: 1000 }}>{fmt(total)}</div>
            </div>
          </div>

          <div className={`${styles.muted} ${styles.small}`} style={{ marginTop: 12 }}>
            Delivery: <span style={{ fontWeight: 900 }}>{deliveryEstimate}</span> • Returns: <Link href="/policies/refund">Refund Policy</Link>
          </div>
          <div className={`${styles.muted} ${styles.small}`} style={{ marginTop: 8 }}>
            Taxes shown are placeholder (0 for now). Currency + real tax/shipping rules can be added next.
          </div>
        </div>
      </div>

      <div className={c.mobileBarSpacer} aria-hidden="true" />
      {step !== "confirmation" ? (
        <div className={c.mobileBar} role="region" aria-label="Sticky checkout summary">
          <div className={c.mobileTotal}>
            <div className={c.mobileTotalTop}>Total</div>
            <div className={c.mobileTotalVal}>{fmt(total)}</div>
          </div>
          <button
            className={`${styles.btn} ${styles.primary}`}
            type="button"
            onClick={primaryAction}
            disabled={primaryDisabled}
            aria-disabled={primaryDisabled}
          >
            {primaryLabel}
          </button>
        </div>
      ) : null}
    </StoreShell>
  );
}
