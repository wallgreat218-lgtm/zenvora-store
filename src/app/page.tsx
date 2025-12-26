import Link from "next/link";

export default function Home() {
  return (
    <>
      <section>
        <img src="/banner.png" alt="Banner" style={{ width: "100%", height: 300, objectFit: "cover" }} />
      </section>
      <section style={{ marginTop: 24 }}>
        <h1>Welcome to ZenVora</h1>
        <p>Electronics and accessories.</p>
        <Link href="/shop"><button className="btn" style={{ marginTop: 12 }}>Shop Now</button></Link>
      </section>
    </>
  );
}
