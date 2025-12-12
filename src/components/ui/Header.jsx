import { motion } from 'framer-motion';

const Header = () => {
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
            <div className="text-xl font-bold tracking-tighter">
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

            <button className="md:hidden text-white">
                {/* Mobile Menu Icon Placeholder */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        </motion.header>
    );
};

export default Header;
