import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, MessageSquare, Briefcase, User, Github, Linkedin, Battery, Wifi, Signal, ChevronLeft, ExternalLink } from 'lucide-react'

const HomeOS = () => {
    const [activeApp, setActiveApp] = useState(null)
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

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
            id: 'projects',
            name: 'Projects',
            icon: Briefcase,
            color: 'bg-blue-500',
            content: (
                <div className="p-4 pb-20 space-y-6">
                    <h2 className="text-4xl font-bold sticky top-0 bg-black/80 backdrop-blur-md py-4 z-10">Featured Work</h2>

                    {projects.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-gray-900 rounded-2xl overflow-hidden border border-white/10 shadow-lg"
                        >
                            {/* Media Placeholder - ideally a GIF */}
                            <div className="h-56 bg-gray-800 relative overflow-hidden group-hover:opacity-90 transition-opacity">
                                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <span className="bg-black/50 px-4 py-2 rounded-full text-lg backdrop-blur-md">Play Demo</span>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-2xl leading-tight mb-1">{p.title}</h3>
                                        <p className="text-base text-gray-400">{p.subtitle}</p>
                                    </div>
                                    <a href={p.link} target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                                        <ExternalLink size={20} />
                                    </a>
                                </div>

                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {p.tech.map((t) => (
                                        <span key={t} className="px-2 py-0.5 bg-white/5 rounded-md text-[10px] text-gray-300 border border-white/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <div className="text-center text-xs text-gray-500 py-4">
                        Tap project to view code
                    </div>
                </div>
            )
        },
        {
            id: 'about',
            name: 'About',
            icon: User,
            color: 'bg-indigo-500',
            content: (
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">About Me</h2>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        I'm a passionate mobile developer with 5 years of experience building high-performance iOS and Android applications.
                    </p>
                </div>
            )
        },
        { id: 'contact', name: 'Contact', icon: MessageSquare, color: 'bg-green-500', content: <div className="p-4">Contact Me</div> },
        { id: 'github', name: 'GitHub', icon: Github, color: 'bg-gray-800', content: null, external: 'https://github.com' },
        { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700', content: null, external: 'https://linkedin.com' },
    ]

    return (
        <div className="w-full h-full bg-black text-white select-none flex flex-col font-sans">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 pt-3 text-xs font-semibold">
                <span>9:41</span>
                <div className="flex gap-2 items-center">
                    <Signal size={12} />
                    <Wifi size={12} />
                    <Battery size={14} />
                </div>
            </div>

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
                        <div className="mb-10 pl-2">
                            <h2 className="text-6xl font-thin text-white/90 mb-1">Monday</h2>
                            <h3 className="text-2xl text-white/60">December 12</h3>
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
                                    className="flex flex-col items-center gap-1 cursor-pointer group"
                                >
                                    <div className={`${app.color} w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                                        <app.icon size={42} color="white" />
                                    </div>
                                    <span className="text-sm text-gray-200 font-medium tracking-wide">{app.name}</span>
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
                        <div className="absolute top-12 left-0 w-full px-4 mb-4 flex items-center gap-2">
                            <button
                                onClick={() => setActiveApp(null)}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <span className="font-semibold text-lg">{activeApp.name}</span>
                        </div>

                        {/* App Content Container */}
                        <div className="mt-12">
                            {activeApp.content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Dock (Only visible on home) */}
            {!activeApp && (
                <div className="mt-auto m-4 p-4 bg-white/10 backdrop-blur-md rounded-[30px] flex justify-around items-center mb-6">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="w-12 h-12 bg-gray-700/50 rounded-xl hover:scale-110 transition-transform duration-200" />
                    ))}
                </div>
            )}

            {/* Home Line */}
            <div
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full cursor-pointer hover:bg-white transition-colors z-50"
                onClick={() => setActiveApp(null)}
            />
        </div>
    )
}

export default HomeOS
