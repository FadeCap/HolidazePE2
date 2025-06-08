import heroImage from "../../assets/hero-image.jpg";

function Hero({ children }) {
  return (
    <section
      style={{ backgroundImage: `url(${heroImage})` }}
      className="relative bg-cover bg-center h-96 flex flex-col justify-center items-center px-4"
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <h1 className="relative z-10 text-4xl font-extrabold mb-6 text-center max-w-lg text-white">
        Find Your Perfect Stay
      </h1>
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </section>
  );
}

export default Hero;
