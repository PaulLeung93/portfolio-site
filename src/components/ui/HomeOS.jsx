import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, MessageSquare, Briefcase, User, Github, Linkedin, Battery, Wifi, Signal, ChevronLeft, ExternalLink, Music, Settings, Image as ImageIcon, Moon, Sun, Globe, Upload, Play, SkipForward, Pause, X, Check } from 'lucide-react'
import { translations } from './translations'

const HomeOS = () => {
    const [activeAppId, setActiveAppId] = useState(null)
    const [isDark, setIsDark] = useState(true)
    const [lang, setLang] = useState('en')
    const [wallpaper, setWallpaper] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLangOpen, setIsLangOpen] = useState(false)

    const t = translations[lang]

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
        { code: 'it', name: 'Italiano' },
        { code: 'pt', name: 'Português' },
        { code: 'ru', name: 'Русский' },
        { code: 'ja', name: '日本語' },
        { code: 'zh', name: '中文' },
        { code: 'ko', name: '한국어' },
        { code: 'hi', name: 'हिंदी' },
        { code: 'bn', name: 'বাংলা' },
        { code: 'ar', name: 'العربية' },
        { code: 'id', name: 'Bahasa Indonesia' },
    ]



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
            name: t.about,
            icon: User,
            color: 'bg-indigo-500',
            content: (
                <div className="p-12">
                    <h2 className={`text-8xl font-bold mb-10 ${!isDark ? 'text-gray-900' : 'text-white'}`}>{t.aboutMe}</h2>
                    <p className={`text-5xl leading-relaxed ${!isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                        {t.aboutDesc}
                    </p>
                </div>
            )
        },
        { id: 'contact', name: t.contact, icon: MessageSquare, color: 'bg-green-500', content: <div className="p-12 text-7xl font-bold">{t.contactMe}</div> },
        {
            id: 'projects',
            name: t.projects,
            icon: Briefcase,
            color: 'bg-blue-500',
            content: (
                <div className="p-8 pb-48 space-y-16">
                    <h2 className={`text-9xl font-bold sticky top-0 backdrop-blur-md py-10 z-10 ${!isDark ? 'bg-white/80 text-gray-900' : 'bg-black/80 text-white'}`}>{t.featuredWork}</h2>

                    {projects.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`rounded-[3rem] overflow-hidden border-2 shadow-2xl ${!isDark ? 'bg-white border-gray-200' : 'bg-gray-900 border-white/10'}`}
                        >
                            {/* Media Placeholder - ideally a GIF */}
                            <div className="h-[32rem] bg-gray-800 relative overflow-hidden group-hover:opacity-90 transition-opacity">
                                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <span className="bg-black/50 px-10 py-5 rounded-full text-5xl backdrop-blur-md">{t.playDemo}</span>
                                </div>
                            </div>

                            <div className="p-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className={`font-bold text-7xl leading-tight mb-4 ${!isDark ? 'text-gray-900' : 'text-white'}`}>{p.title}</h3>
                                        <p className={`text-5xl ${!isDark ? 'text-gray-500' : 'text-gray-400'}`}>{p.subtitle}</p>
                                    </div>
                                    <a href={p.link} target="_blank" rel="noreferrer" className={`p-5 rounded-full transition-colors ${!isDark ? 'bg-black/5 hover:bg-black/10 text-gray-900' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                                        <ExternalLink size={48} />
                                    </a>
                                </div>

                                <div className="flex flex-wrap gap-4 mt-8">
                                    {p.tech.map((t) => (
                                        <span key={t} className={`px-6 py-2 rounded-2xl text-3xl border ${!isDark ? 'bg-black/5 text-gray-600 border-black/5' : 'bg-white/5 text-gray-300 border-white/5'}`}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <div className="text-center text-4xl text-gray-500 py-10">
                        {t.tapToView}
                    </div>
                </div>
            )
        },
        {
            id: 'music',
            name: t.music,
            icon: Music,
            color: 'bg-red-500',
            content: (
                <div className="p-8 h-full flex flex-col">
                    <div className="flex-1 flex items-center justify-center p-8">
                        <div className="w-64 h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-4xl shadow-2xl flex items-center justify-center mb-12">
                            <Music size={80} className="text-white/50" />
                        </div>
                    </div>
                    <div className="mb-12">
                        <h3 className={`text-5xl font-bold mb-2 text-center ${!isDark ? 'text-gray-900' : 'text-white'}`}>{t.lofiBeats}</h3>
                        <p className={`text-3xl text-center ${!isDark ? 'text-gray-500' : 'text-gray-400'}`}>{t.codingChill}</p>
                    </div>
                    <div className="flex flex-col gap-6 mb-12">
                        <div className={`w-full h-2 rounded-full overflow-hidden ${!isDark ? 'bg-gray-200' : 'bg-gray-800'}`}>
                            <div className={`w-1/3 h-full rounded-full ${!isDark ? 'bg-black' : 'bg-white'}`}></div>
                        </div>
                        <div className={`flex justify-between text-2xl font-medium ${!isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <span>1:23</span>
                            <span>3:45</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-12 pb-12">
                        <button className={`${!isDark ? 'text-gray-400 hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors`}>
                            <SkipForward size={48} className="rotate-180" />
                        </button>
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className={`w-24 h-24 rounded-full flex items-center justify-center hover:scale-105 transition-transform ${!isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
                        >
                            {isPlaying ? <Pause size={40} fill={!isDark ? 'white' : 'black'} /> : <Play size={40} fill={!isDark ? 'white' : 'black'} className="ml-1" />}
                        </button>
                        <button className={`${!isDark ? 'text-gray-400 hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors`}>
                            <SkipForward size={48} />
                        </button>
                    </div>
                </div>
            )
        },
        {
            id: 'photos',
            name: t.photos,
            icon: ImageIcon,
            color: 'bg-yellow-500',
            content: (
                <div className="p-4 grid grid-cols-2 gap-4 pb-32">
                    <div className="col-span-2 py-4">
                        <h2 className={`text-5xl font-bold px-4 ${!isDark ? 'text-gray-900' : 'text-white'}`}>{t.recents}</h2>
                    </div>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="aspect-square bg-gray-800 rounded-2xl overflow-hidden relative group">
                            <img
                                src={`https://images.unsplash.com/photo-${i === 1 ? '1540553016337-6100a7ac6dcf' : i === 2 ? '1505373872125-38d5f22d9961' : i === 3 ? '1517694712202-14dd9538aa97' : '1550745165-9bc0b252726f'}?auto=format&fit=crop&w=400&q=80`}
                                alt="Event"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                    <div className="col-span-2 py-8 text-center text-gray-500 text-3xl">
                        {t.photoCount}
                    </div>
                </div>
            )
        },
        {
            id: 'settings',
            name: t.settings,
            icon: Settings,
            color: 'bg-gray-600',
            content: (
                <div className={`p-0 min-h-full pt-12 transition-colors duration-300 ${!isDark ? 'bg-gray-100 text-black' : 'bg-black text-white'}`}>
                    {/* Header removed to avoid duplication with generic app header */}

                    <div className={`mx-6 rounded-3xl overflow-hidden mb-8 transition-colors duration-300 ${!isDark ? 'bg-white shadow-lg' : 'bg-gray-900'}`}>
                        <div className={`p-8 flex items-center justify-between border-b ${!isDark ? 'border-gray-100' : 'border-gray-800'}`}>
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-blue-500 rounded-2xl"><Moon size={40} className="text-white" /></div>
                                <span className="text-6xl font-medium">{t.darkMode}</span>
                            </div>
                            <div
                                onClick={() => setIsDark(!isDark)}
                                className={`w-24 h-14 rounded-full p-1 transition-colors duration-300 ${isDark ? 'bg-green-500' : 'bg-gray-600'}`}
                            >
                                <div className={`w-12 h-12 bg-white rounded-full shadow-md transition-transform duration-300 ${isDark ? 'translate-x-10' : 'translate-x-0'}`} />
                            </div>
                        </div>

                        <div className="p-8 flex items-center justify-between relative z-20">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-orange-500 rounded-2xl"><Globe size={40} className="text-white" /></div>
                                <span className="text-6xl font-medium">{t.language}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsLangOpen(true)}
                                    className={`text-5xl font-medium flex items-center gap-2 ${!isDark ? 'text-gray-500' : 'text-gray-400'}`}
                                >
                                    {languages.find(l => l.code === lang)?.name}
                                    <ChevronLeft size={32} className="rotate-180" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={`mx-6 rounded-3xl overflow-hidden transition-colors duration-300 ${!isDark ? 'bg-white shadow-lg' : 'bg-gray-900'}`}>
                        <div className="p-8 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-pink-500 rounded-2xl"><Upload size={40} className="text-white" /></div>
                                <span className="text-6xl font-medium">{t.wallpaper}</span>
                            </div>
                            <label className="text-5xl text-blue-500 font-medium cursor-pointer">
                                {t.select}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0]
                                        if (file) {
                                            const url = URL.createObjectURL(file)
                                            setWallpaper(url)
                                        }
                                    }}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Language Modal/Dropdown Portal-like behavior */}
                    <AnimatePresence>
                        {isLangOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: '-100%' }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: '-100%' }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className={`fixed inset-0 z-50 flex flex-col ${!isDark ? 'bg-gray-100' : 'bg-black'}`}
                            >
                                <div className={`p-8 pt-12 flex items-center justify-between border-b ${!isDark ? 'border-gray-200 bg-white' : 'border-gray-800 bg-gray-900'}`}>
                                    <span className="text-6xl font-bold px-4">{t.select}</span>
                                    <button onClick={() => setIsLangOpen(false)} className="p-4 rounded-full bg-gray-500/10">
                                        <X size={48} />
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    {languages.map((l) => (
                                        <button
                                            key={l.code}
                                            onClick={() => {
                                                setLang(l.code)
                                                setIsLangOpen(false)
                                            }}
                                            className={`w-full p-8 rounded-3xl flex items-center justify-between text-5xl font-medium transition-colors ${lang === l.code
                                                ? (!isDark ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white')
                                                : (!isDark ? 'bg-white text-gray-900 hover:bg-gray-200' : 'bg-gray-900 text-gray-200 hover:bg-gray-800')
                                                }`}
                                        >
                                            <span>{l.name}</span>
                                            {lang === l.code && <Check size={40} />}
                                        </button>
                                    ))}
                                    <div className="h-32"></div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )
        },
        { id: 'github', name: 'GitHub', icon: Github, color: 'bg-gray-800', content: null, external: 'https://github.com/PaulLeung93' },
        { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700', content: null, external: 'https://www.linkedin.com/in/paulleung1993/' },
    ]
    const activeApp = apps.find(a => a.id === activeAppId)
    const now = new Date()

    // Map internal lang keys to standard locale strings
    const localeMap = {
        en: 'en-US', es: 'es-ES', de: 'de-DE', fr: 'fr-FR', it: 'it-IT',
        pt: 'pt-PT', ru: 'ru-RU', ja: 'ja-JP', zh: 'zh-CN', ko: 'ko-KR',
        hi: 'hi-IN', bn: 'bn-BD', ar: 'ar-SA', id: 'id-ID'
    }
    const locale = localeMap[lang] || 'en-US'
    const dayOfWeek = now.toLocaleDateString(locale, { weekday: 'long' })
    const monthDay = now.toLocaleDateString(locale, { month: 'long', day: 'numeric' })



    // Apps configuration


    // Apps configuration

    return (
        <div
            className={`w-full h-full bg-black text-white select-none flex flex-col font-sans transition-colors duration-300 ${!isDark ? 'bg-gray-100 text-black' : ''}`}
            style={wallpaper ? { backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
            {/* Dark overlay for readability if wallpaper is set */}
            {wallpaper && <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />}

            {/* Dynamic Island Area */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 pointer-events-none"></div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                {!activeAppId ? (
                    <motion.div
                        key="home"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex-1 p-6 flex flex-col pt-16"
                    >
                        {/* Date Widget */}
                        <div className="mb-16 pl-2 relative z-10">
                            <h2 className={`text-9xl font-thin mb-1 ${!isDark && !wallpaper ? 'text-black/90' : 'text-white/90'}`}>{dayOfWeek}</h2>
                            <h3 className={`text-5xl ${!isDark && !wallpaper ? 'text-black/60' : 'text-white/60'}`}>{monthDay}</h3>
                        </div>

                        {/* App Grid */}
                        <div className="grid grid-cols-4 gap-y-16 gap-x-2">
                            {apps.map((app) => (
                                <motion.div
                                    key={app.id}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        if (app.external) {
                                            window.open(app.external, '_blank')
                                        } else {
                                            setActiveAppId(app.id)
                                        }
                                    }}
                                    className="flex flex-col items-center gap-4 cursor-pointer group"
                                >
                                    <div className={`${app.color} w-48 h-48 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                                        <app.icon size={96} color="white" />
                                    </div>
                                    <span className={`text-5xl font-medium tracking-wide ${!isDark && !wallpaper ? 'text-gray-800' : 'text-gray-200'}`}>{app.name}</span>
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
                        className={`flex-1 w-full h-full relative pt-12 overflow-y-auto transition-colors duration-300 ${!isDark ? 'bg-gray-100 text-black' : 'bg-black text-white'}`}
                    >
                        {/* App Header */}
                        <div className="absolute top-12 left-0 w-full px-8 mb-6 flex items-center gap-4">
                            <button
                                onClick={() => setActiveAppId(null)}
                                className={`p-3 rounded-full transition-colors ${!isDark ? 'hover:bg-black/10' : 'hover:bg-white/10'}`}
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
