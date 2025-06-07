const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col items-center mx-auto min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'>
      {children}
    </div>
  );
};

export default MainWrapper;
