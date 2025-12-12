import { motion } from 'framer-motion'
import { Code, Smartphone, Globe, Mail } from 'lucide-react'

const Section = ({ children, className }) => (
    <section className={`min-h-screen w-full flex flex-col justify-center p-8 ${className}`}>
        {children}
    </section>
)

const Overlay = () => {
    return (
        <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">

            {/* Hero Section */}
            <Section className="items-start max-w-2xl pt-20">
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
                        <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                            View Work
                        </button>
                        <button className="px-8 py-3 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                            Contact Me
                        </button>
                    </div>
                </motion.div>

            </Section>

            {/* Tech Stack / About Section */}
            <Section className="md:items-end md:text-right">
                <div className="max-w-xl md:ml-auto pointer-events-auto">
                    <h2 className="text-4xl font-bold mb-8">Engineering Stack.</h2>
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
            </Section>

            {/* Footer / Contact */}
            <footer className="w-full py-20 px-8 text-center bg-black pointer-events-auto">
                <h2 className="text-4xl font-bold mb-6">Let's Build Something.</h2>
                <a
                    href="mailto:PaulLeung93@gmail.com"
                    className="text-2xl text-gray-400 hover:text-white transition-colors inline-block border-b-2 border-primary pb-1"
                >
                    PaulLeung93@gmail.com
                </a>
                <p className="mt-8 text-gray-600 text-sm">© 2025 Paul Leung. All rights reserved.</p>
            </footer>

        </div>
    )
}

export default Overlay
