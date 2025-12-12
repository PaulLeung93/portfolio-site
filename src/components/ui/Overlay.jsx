import { motion } from 'framer-motion'
import { Code, Smartphone, Globe, Mail } from 'lucide-react'

const Section = ({ children, className, ...props }) => (
    <section className={`min-h-screen w-full flex flex-col justify-center p-8 ${className}`} {...props}>
        {children}
    </section>
)

import Header from './Header'

const Overlay = () => {
    return (
        <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
            <Header />

            {/* Hero Section */}
            <Section className="items-start max-w-2xl pt-20" id="hero">
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
                                <p className="text-sm text-gray-400">Swift, Kotlin, Jetpack Compose, SwiftUI</p>
                            </div>
                            <div className="p-4 bg-gray-900/50 border border-white/5 rounded-xl">
                                <Code className="mb-2 text-secondary" />
                                <h3 className="font-bold">Cross-Platform</h3>
                                <p className="text-sm text-gray-400">React Native, Flutter, Expo</p>
                            </div>
                            <div className="p-4 bg-gray-900/50 border border-white/5 rounded-xl">
                                <Globe className="mb-2 text-green-400" />
                                <h3 className="font-bold">Web Technologies</h3>
                                <p className="text-sm text-gray-400">React, TypeScript, Tailwind, Node.js</p>
                            </div>
                            <div className="p-4 bg-gray-900/50 border border-white/5 rounded-xl">
                                <Mail className="mb-2 text-purple-400" />
                                <h3 className="font-bold">Backend & Tools</h3>
                                <p className="text-sm text-gray-400">Firebase, Supabase, Git, CI/CD</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Work Section */}
            <Section className="items-start" id="work">
                <div className="max-w-4xl pointer-events-auto">
                    <h2 className="text-4xl font-bold mb-8">Selected Work.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Placeholder Project Card 1 */}
                        <div className="p-6 bg-gray-900/50 border border-white/5 rounded-xl hover:border-primary/50 transition-colors group">
                            <div className="h-48 bg-gray-800 rounded-lg mb-4 flex items-center justify-center text-gray-600">
                                Project Preview
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">E-Commerce App</h3>
                            <p className="text-gray-400 text-sm mb-4">A full-featured mobile shopping experience built with React Native.</p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300">React Native</span>
                                <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300">Node.js</span>
                            </div>
                        </div>

                        {/* Placeholder Project Card 2 */}
                        <div className="p-6 bg-gray-900/50 border border-white/5 rounded-xl hover:border-primary/50 transition-colors group">
                            <div className="h-48 bg-gray-800 rounded-lg mb-4 flex items-center justify-center text-gray-600">
                                Project Preview
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Finance Dashboard</h3>
                            <p className="text-gray-400 text-sm mb-4">Native Android application for tracking personal finances.</p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300">Kotlin</span>
                                <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300">Jetpack Compose</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

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
                        <a href="/Paul%20Leung%20Resume.pdf" download className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2">
                            Download Resume
                        </a>
                    </div>
                    <p className="mt-16 text-gray-600 text-sm">© 2025 Paul Leung. All rights reserved.</p>
                </div>
            </Section>



        </div>
    )
}

export default Overlay
