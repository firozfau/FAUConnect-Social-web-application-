const Header = () => {

 
    return (
      <header className="absolute top-0 right-0 p-4 flex justify-between items-center w-full z-10 bg-gradient-to-b from-black to-transparent p-4 h-12 pt-8">
                {/* Logo */}
                <img
                    src="/images/logo.svg" // Replace with the path to your logo image
                    alt="FAU Logo"
                    className="h-14" // Adjust the size as needed
                />
            </header>
    );
  };
  
  export default Header;