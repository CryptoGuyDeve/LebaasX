import React from "react";
import Container from "@/components/Container";

const AboutPage = () => {
  return (
    <Container className="max-w-6xl py-12 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold">About LebaasX</h1>
      <p className="mb-4">
        LebaasX is a modern clothing brand that blends style, comfort, and affordability for 
        young fashion enthusiasts. We focus on trendy t-shirts and trousers designed for 
        individuals aged 15-25 who seek premium quality at an accessible price.
      </p>
      <p className="mb-4">
        At LebaasX, we believe fashion is more than just clothing—it's an expression of identity. 
        That&apos;s why we carefully craft each piece with attention to detail, ensuring top-notch fabric, 
        unique prints, and a perfect fit that complements your style.
      </p>
      <p>
        Our mission is to redefine everyday fashion by offering stylish, comfortable, and durable 
        apparel. Join us on this journey to make bold fashion statements with confidence and originality.
      </p>
    </Container>
  );
};

export default AboutPage;
