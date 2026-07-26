import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-screen w-screen overflow-hidden"
    >
      <Image
        src="/image/Background.png"
        alt="LIMO Automation"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </section>
  );
}