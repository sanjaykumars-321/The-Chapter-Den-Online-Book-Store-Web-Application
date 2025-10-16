function Spinner() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <div className="spinner"></div>
      <h1 className="text-2xl font-normal text-gray-950">
        Please Wait Loading...
      </h1>
    </div>
  );
}

export default Spinner;
