import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, MessageSquare, Briefcase, User, Github, Linkedin, Battery, Wifi, Signal, ChevronLeft, ExternalLink } from 'lucide-react'

const HomeOS = () => {
    const [activeApp, setActiveApp] = useState(null)

    // Get current date and time
    const now = new Date()
    const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' })
    const monthDay = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

    // Project Data (Mock)
    const projects = [
        {
            title: "CryptoWallet Pro",
            subtitle: "DeFi Dashboard",
            tech: ["React Native", "Firebase", "Web3"],
            color: "bg-orange-500",
            // Example GIF showing app interaction
            image: "https://media.tenor.com/t2Xbe_yL8owAAAAC/mobile-app-design-scroll.gif",
            link: "https://github.com"
        },
        {
            title: "FitTrack AI",
            subtitle: "Workout Assistant",
            tech: ["Flutter", "TensorFlow", "HealthKit"],
            color: "bg-blue-500",
            image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            link: "https://github.com"
        },
        {
            title: "EcoEats",
            subtitle: "Sustainable Delivery",
            tech: ["SwiftUI", "Node.js", "Maps SDK"],
            color: "bg-green-500",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            link: "https://github.com"
        }
    ]

    // Apps configuration
    const apps = [
        {
            id: 'about',
            name: 'About',
            icon: User,
            color: 'bg-indigo-500',
            content: (
                <div className="p-12">
                    <h2 className="text-8xl font-bold mb-10">About Me</h2>
                    <p className="text-5xl text-gray-300 leading-relaxed">
                        I'm a passionate mobile developer with 5 years of experience building high-performance iOS and Android applications.
                    </p>
                </div>
            )
        },
        { id: 'contact', name: 'Contact', icon: MessageSquare, color: 'bg-green-500', content: <div className="p-12 text-7xl font-bold">Contact Me</div> },
        {
            id: 'projects',
            name: 'Projects',
            icon: Briefcase,
            color: 'bg-blue-500',
            content: (
                <div className="p-8 pb-48 space-y-16">
                    <h2 className="text-9xl font-bold sticky top-0 bg-black/80 backdrop-blur-md py-10 z-10">Featured Work</h2>

                    {projects.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-gray-900 rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-2xl"
                        >
                            {/* Media Placeholder - ideally a GIF */}
                            <div className="h-[32rem] bg-gray-800 relative overflow-hidden group-hover:opacity-90 transition-opacity">
                                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <span className="bg-black/50 px-10 py-5 rounded-full text-5xl backdrop-blur-md">Play Demo</span>
                                </div>
                            </div>

                            <div className="p-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="font-bold text-7xl leading-tight mb-4">{p.title}</h3>
                                        <p className="text-5xl text-gray-400">{p.subtitle}</p>
                                    </div>
                                    <a href={p.link} target="_blank" rel="noreferrer" className="p-5 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                                        <ExternalLink size={48} />
                                    </a>
                                </div>

                                <div className="flex flex-wrap gap-4 mt-8">
                                    {p.tech.map((t) => (
                                        <span key={t} className="px-6 py-2 bg-white/5 rounded-2xl text-3xl text-gray-300 border border-white/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <div className="text-center text-4xl text-gray-500 py-10">
                        Tap project to view code
                    </div>
                </div>
            )
        },
        { id: 'github', name: 'GitHub', icon: Github, color: 'bg-gray-800', content: null, external: 'https://github.com/PaulLeung93' },
        { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700', content: null, external: 'https://www.linkedin.com/in/paulleung1993/' },
    ]

    return (
        <div className="w-full h-full bg-black text-white select-none flex flex-col font-sans">

            {/* Dynamic Island Area */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 pointer-events-none"></div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                {!activeApp ? (
                    <motion.div
                        key="home"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex-1 p-6 flex flex-col pt-16"
                    >
                        {/* Date Widget */}
                        <div className="mb-16 pl-2">
                            <h2 className="text-9xl font-thin text-white/90 mb-1">{dayOfWeek}</h2>
                            <h3 className="text-5xl text-white/60">{monthDay}</h3>
                        </div>

                        {/* App Grid */}
                        <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                            {apps.map((app) => (
                                <motion.div
                                    key={app.id}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        if (app.external) {
                                            window.open(app.external, '_blank')
                                        } else {
                                            setActiveApp(app)
                                        }
                                    }}
                                    className="flex flex-col items-center gap-4 cursor-pointer group"
                                >
                                    <div className={`${app.color} w-48 h-48 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                                        <app.icon size={96} color="white" />
                                    </div>
                                    <span className="text-5xl text-gray-200 font-medium tracking-wide">{app.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="app-view"
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 300, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="flex-1 bg-black w-full h-full relative pt-12 overflow-y-auto"
                    >
                        {/* App Header */}
                        <div className="absolute top-12 left-0 w-full px-8 mb-6 flex items-center gap-4">
                            <button
                                onClick={() => setActiveApp(null)}
                                className="p-3 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <ChevronLeft size={64} />
                            </button>
                            <span className="font-semibold text-5xl">{activeApp.name}</span>
                        </div>

                        {/* App Content Container */}
                        <div className="mt-24">
                            {activeApp.content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default HomeOS
