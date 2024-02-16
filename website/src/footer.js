import React from 'react';

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-center text-sm text-white z-10 h-12">
        <a href="#" className="underline">FAQ</a> | <a href="#" className="underline">Contact</a> | <a href="#" className="underline">Impressum</a> | <a href="#" className="underline">AGBs</a>
    </footer>
  );
};

export default Footer;