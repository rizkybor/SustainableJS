function HomePage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('/assets/background-image.jpg')`,
      }}
    >
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 shadow-lg rounded-lg p-8 text-center">
        {/* Jumbotron Content */}
        <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        © Jendela Kode
        </h3>
        <p className="text-gray-600 text-lg md:text-xl mb-6">
          Jury System with Sustainable Timing System
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">
            Get Started
          </button>
          <button className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;