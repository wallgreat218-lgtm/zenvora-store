"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import StoreShell from "../../components/store/StoreShell";
import styles from "../../components/HomeLanding.module.css";
import c from "./Checkout.module.css";
import { clearCart, getCart, type CartItem } from "../../lib/cart";
import { products } from "../../lib/products";

type Step = "address" | "shipping" | "payment" | "review" | "confirmation";

const DISCOUNT = 0.1;

function fmt(n: number) {
  return `$${Number(n).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })}`;
}

function discounted(price: number) {
  return +(price * (1 - DISCOUNT)).toFixed(2);
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

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    zip: "",
    country: "United States"
  });

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
    return detailed.reduce((s: number, it: any) => s + discounted(it.product.basePrice) * it.quantity, 0);
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

  function validateAddress(a: typeof address) {
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

  const addressErrors = useMemo(() => validateAddress(address), [address]);
  const paymentErrors = useMemo(() => validatePayment(payment), [payment]);

  const addressValid = Object.keys(addressErrors).length === 0;
  const paymentValid = Object.keys(paymentErrors).length === 0;
  const shippingValid = true;
  const reviewValid = detailed.length > 0;

  const primaryLabel = step === "review" ? "Pay & Place Order" : "Continue";
  const primaryDisabled =
    step === "address"
      ? !addressValid
      : step === "shipping"
        ? !shippingValid
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
      markTouched(["firstName", "lastName", "email", "phone", "line1", "city", "state", "zip", "country"]);
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
      markTouched(["firstName", "lastName", "email", "phone", "line1", "city", "state", "zip", "country"]);
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

        <div className={`${styles.muted} ${styles.small}`}>
          🔒 SSL/TLS encrypted in transit • Never store full card details • Policies: <Link href="/policies/refund">Refund</Link> •{" "}
          <Link href="/policies/shipping">Shipping</Link>
        </div>

        <div className={c.trustStrip} aria-label="Trust and confidence">
          <div className={c.trustPill}>
            <div className={c.trustIcon}>🔒</div>
            <div>
              <div style={{ fontWeight: 900 }}>Secure checkout</div>
              <div className={`${styles.muted} ${styles.small}`}>Encrypted connection (SSL/TLS)</div>
            </div>
          </div>
          <div className={c.trustPill}>
            <div className={c.trustIcon}>💳</div>
            <div>
              <div style={{ fontWeight: 900 }}>Accepted payments</div>
              <div className={c.cardsRow} aria-label="Payment methods">
                <span className={c.payBadge}>VISA</span>
                <span className={c.payBadge}>Mastercard</span>
                <span className={c.payBadge}>AmEx</span>
                <span className={c.payBadge}>Apple Pay</span>
              </div>
            </div>
          </div>
          <div className={c.trustPill}>
            <div className={c.trustIcon}>🚚</div>
            <div>
              <div style={{ fontWeight: 900 }}>Delivery estimate</div>
              <div className={`${styles.muted} ${styles.small}`}>{deliveryEstimate} • Tracking where available</div>
            </div>
          </div>
          <div className={c.trustPill}>
            <div className={c.trustIcon}>↩</div>
            <div>
              <div style={{ fontWeight: 900 }}>Returns & support</div>
              <div className={`${styles.muted} ${styles.small}`}>Easy returns • Fast support response</div>
            </div>
          </div>
        </div>
      </div>

      <div className={c.wrap}>
        <div className={styles.infoCard}>
          {step === "address" ? (
            <>
              <h3 className={c.sectionTitle}>Delivery Address</h3>
              <div className={`${styles.muted} ${styles.small}`}>
                Use a reachable email/phone for delivery updates. Required fields must be completed.
              </div>

              <div className={styles.two}>
                <div className={`${styles.field} ${(touched.firstName || submitAttempted) && addressErrors.firstName ? c.fieldError : ""}`}>
                  <label>First Name</label>
                  <input
                    value={address.firstName}
                    onBlur={() => markTouched(["firstName"])}
                    onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                    placeholder="John"
                    autoComplete="given-name"
                  />
                  {(touched.firstName || submitAttempted) && addressErrors.firstName ? (
                    <div className={c.errorText}>{addressErrors.firstName}</div>
                  ) : null}
                </div>

                <div className={`${styles.field} ${(touched.lastName || submitAttempted) && addressErrors.lastName ? c.fieldError : ""}`}>
                  <label>Last Name</label>
                  <input
                    value={address.lastName}
                    onBlur={() => markTouched(["lastName"])}
                    onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                    placeholder="Doe"
                    autoComplete="family-name"
                  />
                  {(touched.lastName || submitAttempted) && addressErrors.lastName ? (
                    <div className={c.errorText}>{addressErrors.lastName}</div>
                  ) : null}
                </div>
              </div>

              <div className={styles.two}>
                <div className={`${styles.field} ${(touched.email || submitAttempted) && addressErrors.email ? c.fieldError : ""}`}>
                  <label>Email</label>
                  <input
                    value={address.email}
                    onBlur={() => markTouched(["email"])}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    placeholder="you@example.com"
                    autoComplete="email"
                    inputMode="email"
                  />
                  {(touched.email || submitAttempted) && addressErrors.email ? (
                    <div className={c.errorText}>{addressErrors.email}</div>
                  ) : null}
                </div>

                <div className={`${styles.field} ${(touched.phone || submitAttempted) && addressErrors.phone ? c.fieldError : ""}`}>
                  <label>Phone</label>
                  <input
                    value={address.phone}
                    onBlur={() => markTouched(["phone"])}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    placeholder="+1 (555) 555-5555"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                  {(touched.phone || submitAttempted) && addressErrors.phone ? (
                    <div className={c.errorText}>{addressErrors.phone}</div>
                  ) : null}
                </div>
              </div>

              <div className={`${styles.field} ${(touched.line1 || submitAttempted) && addressErrors.line1 ? c.fieldError : ""}`}>
                <label>Street Address</label>
                <input
                  value={address.line1}
                  onBlur={() => markTouched(["line1"])}
                  onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                  placeholder="Street address, P.O. box, company name"
                  autoComplete="address-line1"
                />
                {(touched.line1 || submitAttempted) && addressErrors.line1 ? <div className={c.errorText}>{addressErrors.line1}</div> : null}
              </div>

              <div className={styles.two}>
                <div className={`${styles.field} ${(touched.city || submitAttempted) && addressErrors.city ? c.fieldError : ""}`}>
                  <label>City</label>
                  <input
                    value={address.city}
                    onBlur={() => markTouched(["city"])}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    placeholder="City"
                    autoComplete="address-level2"
                  />
                  {(touched.city || submitAttempted) && addressErrors.city ? <div className={c.errorText}>{addressErrors.city}</div> : null}
                </div>

                <div className={`${styles.field} ${(touched.state || submitAttempted) && addressErrors.state ? c.fieldError : ""}`}>
                  <label>State/Province</label>
                  <input
                    value={address.state}
                    onBlur={() => markTouched(["state"])}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    placeholder="State / Province"
                    autoComplete="address-level1"
                  />
                  {(touched.state || submitAttempted) && addressErrors.state ? <div className={c.errorText}>{addressErrors.state}</div> : null}
                </div>
              </div>

              <div className={styles.two}>
                <div className={`${styles.field} ${(touched.zip || submitAttempted) && addressErrors.zip ? c.fieldError : ""}`}>
                  <label>ZIP/Postal</label>
                  <input
                    value={address.zip}
                    onBlur={() => markTouched(["zip"])}
                    onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                    placeholder="ZIP / Postal"
                    autoComplete="postal-code"
                  />
                  {(touched.zip || submitAttempted) && addressErrors.zip ? <div className={c.errorText}>{addressErrors.zip}</div> : null}
                </div>

                <div className={`${styles.field} ${(touched.country || submitAttempted) && addressErrors.country ? c.fieldError : ""}`}>
                  <label>Country</label>
                  <input
                    value={address.country}
                    onBlur={() => markTouched(["country"])}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    placeholder="United States"
                    autoComplete="country-name"
                  />
                  {(touched.country || submitAttempted) && addressErrors.country ? <div className={c.errorText}>{addressErrors.country}</div> : null}
                </div>
              </div>

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
              <div className={styles.cards}>
                <button
                  type="button"
                  className={styles.infoCard}
                  onClick={() => setShipping("standard")}
                  style={{ textAlign: "left", opacity: shipping === "standard" ? 1 : 0.78 }}
                >
                  <div style={{ fontWeight: 900 }}>Standard Worldwide</div>
                  <div className={styles.muted}>Free • 5–12 business days • Tracking where available</div>
                  <div className={`${styles.muted} ${styles.small}`} style={{ marginTop: 8 }}>
                    Recommended for best value.
                  </div>
                </button>
                <button
                  type="button"
                  className={styles.infoCard}
                  onClick={() => setShipping("express")}
                  style={{ textAlign: "left", opacity: shipping === "express" ? 1 : 0.78 }}
                >
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

              <div className={`${styles.field} ${(touched.cardName || submitAttempted) && paymentErrors.cardName ? c.fieldError : ""}`}>
                <label>Name on Card</label>
                <input
                  value={payment.cardName}
                  onBlur={() => markTouched(["cardName"])}
                  onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                  placeholder="Name as shown on card"
                  autoComplete="cc-name"
                />
                {(touched.cardName || submitAttempted) && paymentErrors.cardName ? <div className={c.errorText}>{paymentErrors.cardName}</div> : null}
              </div>

              <div className={`${styles.field} ${(touched.cardNumber || submitAttempted) && paymentErrors.cardNumber ? c.fieldError : ""}`}>
                <label>Card Number</label>
                <input
                  placeholder="1234 5678 9012 3456"
                  value={payment.cardNumber}
                  onBlur={() => markTouched(["cardNumber"])}
                  onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                  inputMode="numeric"
                  autoComplete="cc-number"
                />
                {(touched.cardNumber || submitAttempted) && paymentErrors.cardNumber ? <div className={c.errorText}>{paymentErrors.cardNumber}</div> : null}
              </div>

              <div className={styles.two}>
                <div className={`${styles.field} ${(touched.expiry || submitAttempted) && paymentErrors.expiry ? c.fieldError : ""}`}>
                  <label>Expiry</label>
                  <input
                    placeholder="MM/YY"
                    value={payment.expiry}
                    onBlur={() => markTouched(["expiry"])}
                    onChange={(e) => setPayment({ ...payment, expiry: normalizeExpiry(e.target.value) })}
                    inputMode="numeric"
                    autoComplete="cc-exp"
                  />
                  {(touched.expiry || submitAttempted) && paymentErrors.expiry ? <div className={c.errorText}>{paymentErrors.expiry}</div> : null}
                </div>
                <div className={`${styles.field} ${(touched.cvc || submitAttempted) && paymentErrors.cvc ? c.fieldError : ""}`}>
                  <label>CVC</label>
                  <input
                    placeholder="123"
                    value={payment.cvc}
                    onBlur={() => markTouched(["cvc"])}
                    onChange={(e) => setPayment({ ...payment, cvc: digitsOnly(e.target.value).slice(0, 4) })}
                    inputMode="numeric"
                    autoComplete="cc-csc"
                  />
                  {(touched.cvc || submitAttempted) && paymentErrors.cvc ? <div className={c.errorText}>{paymentErrors.cvc}</div> : null}
                </div>
              </div>

              <div className={`${styles.muted} ${styles.small}`}>
                🔒 Your details are encrypted in transit. By continuing, you agree to the <Link href="/policies/refund">Refund Policy</Link>.
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
                    {address.firstName} {address.lastName} • {address.line1}
                    {address.city ? `, ${address.city}` : ""}
                    {address.state ? `, ${address.state}` : ""} {address.zip}
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
                        <div style={{ fontWeight: 900 }}>{it.product?.name}</div>
                        <div className={styles.muted}>
                          Qty: {it.quantity}
                          {it.variant ? ` • ${it.variant.color} • ${it.variant.storage}` : ""}
                        </div>
                      </div>
                      <div style={{ fontWeight: 900 }}>{fmt(discounted(it.product?.basePrice ?? 0) * it.quantity)}</div>
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

        <div className={`${styles.infoCard} ${c.summarySticky}`}>
          <h3 className={c.sectionTitle}>Order Summary</h3>
          <div className={`${styles.muted} ${styles.small}`}>Prices reflect 10% off. Shipping updates in real-time.</div>

          <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
            {detailed.slice(0, 4).map((it: any) => (
              <div
                key={`${it.slug}-${it.variant?.color ?? ""}-${it.variant?.storage ?? ""}`}
                style={{ display: "flex", justifyContent: "space-between", gap: 12 }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 900, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {it.product?.name}
                  </div>
                  <div className={`${styles.muted} ${styles.small}`}>
                    Qty {it.quantity}
                    {it.variant ? ` • ${it.variant.color} • ${it.variant.storage}` : ""}
                  </div>
                </div>
                <div style={{ fontWeight: 900 }}>{fmt(discounted(it.product?.basePrice ?? 0) * it.quantity)}</div>
              </div>
            ))}
            {detailed.length > 4 ? <div className={`${styles.muted} ${styles.small}`}>+ {detailed.length - 4} more item(s)</div> : null}
          </div>

          <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className={styles.muted}>Subtotal (after 10%)</div>
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
