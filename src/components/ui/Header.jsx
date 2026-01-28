import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const links = [
        { name: 'About', href: '#about' },
        { name: 'Work', href: '#work' },
        { name: 'Blog', href: '#blog' },
        { name: 'Resume', href: '#resume' },
    ];

    return (
        <motion.header
            className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 pointer-events-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div
                className="text-xl font-bold tracking-tighter cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => window.location.reload()}
            >
                Paul Leung
            </div>

            <nav className="hidden md:flex gap-8">
                {links.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        {link.name}
                    </a>
                ))}
            </nav>

            <button
                className="md:hidden text-white z-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                )}
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <motion.nav
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-64 bg-gray-900/95 backdrop-blur-md z-50 flex flex-col pt-20 px-6 border-l border-white/10"
                        >
                            {links.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-lg font-medium text-gray-300 hover:text-white py-4 border-b border-white/5 transition-colors"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
