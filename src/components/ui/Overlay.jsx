import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Smartphone, Globe, Mail, X, ChevronRight, ExternalLink } from 'lucide-react'

const Section = ({ children, className, ...props }) => (
    <section className={`min-h-screen w-full flex flex-col justify-center p-8 ${className}`} {...props}>
        {children}
    </section>
)

const experiences = [
    {
        id: 'popstock',
        company: 'PopStock',
        role: 'Android Engineer',
        period: 'Nov 2025 – Present',
        website: 'https://popstock.io/',
        shortDescription: 'Empowering America’s underprivileged youth with financial literacy through simulation tools.',
        fullDescription: 'Developing and maintaining production features for PopStock’s consumer Android app. Focus on reliable, maintainable mobile experiences, collaborating with product and design, and making thoughtful engineering decisions that balance velocity with long-term quality.',
        aboutCompany: 'PopStock is a software development company on a mission to empower America’s underprivileged youth with financial literacy. Their free-to-use software combines pop culture icons with a stock market simulation tool, making complex financial concepts engaging and accessible in classrooms and alternative learning programs nationwide.',
        color: 'from-blue-500 to-indigo-600'
    },
    {
        id: 'lumina',
        company: 'Lumina View',
        role: 'Android Developer',
        period: 'Mar 2025 – Sept 2025',
        website: 'https://luminaview.ai/#product',
        shortDescription: 'Next-generation AI-powered digital display designed to enhance productivity and lifestyle.',
        fullDescription: 'Built and shipped Android features for Lumina View’s consumer-facing app, focusing on performance, maintainability, and user-centered functionality. Contributed to integrating advanced AI-driven features while ensuring a smooth, responsive mobile experience.',
        aboutCompany: 'Lumina View is a next-generation AI-powered digital display designed to enhance productivity and lifestyle while keeping data private. Its locally deployed language model (LLM) enables advanced AI capabilities without sending data to the cloud.',
        color: 'from-purple-500 to-pink-600'
    },
    {
        id: 'codepath',
        company: 'CodePath',
        role: 'Tech Fellow Manager',
        period: '2023 – Present',
        website: 'https://www.codepath.org/',
        shortDescription: 'Mentoring students and shaping learning experiences for thousands of aspiring engineers.',
        fullDescription: 'Mentor students and manage teaching assistants across mobile programs. Contribute to curriculum development and instructional design, shaping learning experiences for thousands of aspiring engineers. This role informs my approach to software: clarity, fundamentals, and systems that scale to both teams and people.',
        aboutCompany: 'CodePath is a nonprofit dedicated to increasing equity in tech education by providing free, high-quality courses and mentorship for students pursuing careers in software engineering.',
        color: 'from-emerald-500 to-teal-600'
    }
]

import Header from './Header'
import ScrollDownIndicator from './ScrollDownIndicator'

const Overlay = () => {
    const [selectedExperience, setSelectedExperience] = useState(null)

    return (
        <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
            <Header />
            <ScrollDownIndicator />

            {/* Hero Section */}
            <Section className="items-start pt-20 relative" id="hero">
                <div className="max-w-2xl">
                    <motion.div
                        className="pointer-events-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
                            MOBILE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">MASTERY</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-8 max-w-lg">
                            Crafting seamless native experiences for iOS and Android.
                            Interactive, performant, and reliable.
                        </p>
                        <div className="flex gap-4">
                            <a href="#work" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors text-center">
                                View Work
                            </a>
                            <a href="#resume" className="px-8 py-3 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors text-center">
                                Contact Me
                            </a>
                        </div>
                    </motion.div>
                </div>
            </Section>

            {/* Tech Stack / About Section */}
            <Section className="" id="about">
                <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center pointer-events-auto">
                    {/* Left Column: Bio */}
                    <div>
                        <h2 className="text-4xl font-bold mb-8">About Me</h2>
                        <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                            I'm a passionate mobile developer with a knack for creating immersive, performance-driven applications. I specialize in both native and cross-platform development, always aiming for the perfect balance between design and functionality.
                        </p>
                    </div>

                    {/* Right Column: Stack */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6">Engineering Stack.</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-900/50 border border-white/5 rounded-xl">
                                <Smartphone className="mb-2 text-primary" />
                                <h3 className="font-bold">Native iOS/Android</h3>
                                <p className="text-sm text-gray-400">
                                    Swift, SwiftUI, UIKit <br />
                                    Kotlin, Jetpack Compose, XML
                                </p>
                            </div>
                            <div className="p-4 bg-gray-900/50 border border-white/5 rounded-xl">
                                <Code className="mb-2 text-secondary" />
                                <h3 className="font-bold">Cross-Platform</h3>
                                <p className="text-sm text-gray-400">React Native, Flutter, Kotlin Multiplatform</p>
                            </div>
                            <div className="p-4 bg-gray-900/50 border border-white/5 rounded-xl">
                                <Globe className="mb-2 text-green-400" />
                                <h3 className="font-bold">Web Technologies</h3>
                                <p className="text-sm text-gray-400">React, TypeScript, Tailwind, Next.js</p>
                            </div>
                            <div className="p-4 bg-gray-900/50 border border-white/5 rounded-xl">
                                <Mail className="mb-2 text-purple-400" />
                                <h3 className="font-bold">Backend & Tools</h3>
                                <p className="text-sm text-gray-400">AWS, Firebase, GraphQL, Figma</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Experience Section */}
            <Section className="items-start" id="work">
                <div className="max-w-6xl w-full mx-auto pointer-events-auto">
                    <h2 className="text-4xl font-bold mb-12">Experience.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {experiences.map((exp) => (
                            <motion.div
                                key={exp.id}
                                layoutId={`card-${exp.id}`}
                                onClick={() => setSelectedExperience(exp)}
                                className="group relative p-6 bg-gray-900/50 border border-white/5 rounded-2xl cursor-pointer hover:bg-gray-800/50 transition-colors overflow-hidden"
                            >
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${exp.color} opacity-50 group-hover:opacity-100 transition-opacity`} />

                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">{exp.company}</h3>
                                    <p className="text-sm text-gray-500 font-mono">{exp.period}</p>
                                </div>

                                <h4 className="text-lg font-medium text-white/90 mb-3">{exp.role}</h4>

                                <p className="text-sm text-gray-400 line-clamp-3 mb-6">
                                    {exp.shortDescription}
                                </p>

                                <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
                                    Read More <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Experience Detail Modal */}
            <AnimatePresence>
                {selectedExperience && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedExperience(null)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 pointer-events-auto"
                        />
                        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
                            <motion.div
                                layoutId={`card-${selectedExperience.id}`}
                                className="w-full max-w-2xl bg-gray-900 border border-white/10 rounded-2xl overflow-hidden pointer-events-auto shadow-2xl"
                            >
                                <div className={`h-2 w-full bg-gradient-to-r ${selectedExperience.color}`} />
                                <div className="p-8 max-h-[80vh] overflow-y-auto">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-3xl font-bold mb-1">{selectedExperience.company}</h3>
                                                {selectedExperience.website && (
                                                    <a
                                                        href={selectedExperience.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-1.5 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                                        title="Visit Website"
                                                    >
                                                        <ExternalLink className="w-5 h-5" />
                                                    </a>
                                                )}
                                            </div>
                                            <p className="text-gray-400 font-mono">{selectedExperience.period}</p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedExperience(null)}
                                            className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="text-xl font-bold text-primary mb-4">{selectedExperience.role}</h4>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 mb-6">
                                            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">About Company</h5>
                                            <p className="text-sm text-gray-300 leading-relaxed italic">
                                                {selectedExperience.aboutCompany}
                                            </p>
                                        </div>
                                        <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Key Contributions</h5>
                                        <p className="text-gray-300 leading-relaxed text-lg">
                                            {selectedExperience.fullDescription}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setSelectedExperience(null)}
                                        className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                    >
                                        Close Details
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Blog Section */}
            <Section className="items-start" id="blog">
                <div className="max-w-4xl pointer-events-auto">
                    <h2 className="text-4xl font-bold mb-8">Latest Thoughts.</h2>
                    <div className="space-y-6">
                        <div className="group cursor-pointer">
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">The Future of Mobile Architecture</h3>
                            <p className="text-sm text-gray-500 mb-2">Oct 24, 2024</p>
                            <p className="text-gray-400 text-sm">Exploring MVI and unidirectional data flow in modern mobile apps...</p>
                        </div>
                        <div className="group cursor-pointer">
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Optimizing React Native Performance</h3>
                            <p className="text-sm text-gray-500 mb-2">Sept 12, 2024</p>
                            <p className="text-gray-400 text-sm">Tips and tricks for 60fps animations and faster startup times...</p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Resume / Contact Section */}
            <Section className="items-center text-center" id="resume">
                <div className="pointer-events-auto max-w-2xl">
                    <h2 className="text-4xl font-bold mb-6">Ready to work together?</h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        I'm currently available for freelance projects and looking for full-time opportunities.
                        <br />
                        <span className="text-white font-bold mt-4 block">PaulLeung93@gmail.com</span>
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            type="button"
                            style={{ pointerEvents: 'auto', zIndex: 9999, position: 'relative' }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('Button clicked!');
                                fetch('Paul%20Leung%20Resume.pdf')
                                    .then(response => response.blob())
                                    .then(blob => {
                                        const url = window.URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.style.display = 'none';
                                        a.href = url;
                                        a.download = 'Paul Leung Resume.pdf';
                                        document.body.appendChild(a);
                                        a.click();
                                        window.URL.revokeObjectURL(url);
                                        document.body.removeChild(a);
                                    })
                                    .catch(error => console.error('Download failed:', error));
                            }}
                            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors cursor-pointer inline-flex items-center gap-2"
                        >
                            Download Resume
                        </button>
                    </div>
                    <p className="mt-16 text-gray-600 text-sm">© 2025 Paul Leung. All rights reserved.</p>
                </div>
            </Section>



        </div>
    )
}

export default Overlay
