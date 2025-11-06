"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import Loader from "./Loader";
import { gsap } from "gsap";

export default function ClientLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    gsap.from(".loader", { opacity: 0, duration: 0.5 });
  }, []);

  // Simula carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // termina la carga
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Cuando termina la carga, animamos y luego desmontamos
  useEffect(() => {
    if (!loading) {
      gsap.to(".loader", {
        opacity: 0,
        duration: 0.3,
        ease: "power1.out",
        onComplete: () => setShowLoader(false),
      });
    }
  }, [loading]);

  if (showLoader) return <Loader />; // se mantiene visible mientras se anima

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
