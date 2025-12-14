import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const ScrollDownIndicator = () => {
    const [isVisible, setIsVisible] = useState(true);

    const sections = ['hero', 'about', 'work', 'blog', 'resume'];

    const getNextSection = () => {
        const currentScroll = window.scrollY + window.innerHeight / 2;

        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const { offsetTop, offsetHeight } = element;
                if (currentScroll >= offsetTop && currentScroll < offsetTop + offsetHeight) {
                    // Find the index of the current section
                    const currentIndex = sections.indexOf(section);
                    // Return the next section ID, or null if it's the last one
                    return sections[currentIndex + 1] || null;
                }
            }
        }
        return 'hero'; // Default to hero if something goes wrong, though logic above should cover.
    };

    // Check which section is active to toggle visibility
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY + window.innerHeight / 2;
            const resumeSection = document.getElementById('resume');

            // Check if we're at the bottom of the page
            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;

            if (resumeSection) {
                const { offsetTop } = resumeSection;
                // Hide if we are entering the resume section area OR if we are at the bottom of the page
                if (currentScroll >= offsetTop || isAtBottom) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToNext = () => {
        const nextId = getNextSection();
        if (nextId) {
            const nextSection = document.getElementById(nextId);
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer pointer-events-auto z-50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    onClick={scrollToNext}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <ChevronDown className="w-8 h-8 text-white/50" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollDownIndicator;
