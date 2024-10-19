function NotFound() {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gray-100'>
      <h1 className='text-4xl font-bold text-gray-800'>404</h1>
      <p className='text-lg text-gray-600'>Page not found.</p>
      <a href='/' className='mt-4 text-blue-500 hover:underline'>
        Go back to homepage
      </a>
    </div>
  );
}

export default NotFound;
