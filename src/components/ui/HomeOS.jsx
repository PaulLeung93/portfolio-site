import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, MessageSquare, Briefcase, User, Github, Linkedin, Battery, Wifi, Signal, ChevronLeft, ExternalLink, Music, Settings, Image as ImageIcon, Moon, Sun, Globe, Upload, Play, SkipForward, Pause, X, Check, Mail } from 'lucide-react'
import { translations } from './translations'

// Wallpaper Imports
import wallpaperAndroid from '../../assets/wallpapers/android.png'
import wallpaperIos from '../../assets/wallpapers/ios.png'
import wallpaperFlutter from '../../assets/wallpapers/flutter.png'
import profilePic from '../../assets/profile-pic.jpg'

// Photo Imports
import droidcon1 from '../../assets/photos/droidcon-1.jpg'
import droidcon2 from '../../assets/photos/droidcon-2.jpg'
import aiInsiders1 from '../../assets/photos/ai-insiders-1.jpg'
import aiInsiders2 from '../../assets/photos/ai-insiders-2.jpg'
import buildWithAi1 from '../../assets/photos/build-with-ai-1.jpg'
import buildWithAi2 from '../../assets/photos/build-with-ai-2.jpg'

// Project Images
import projectEcho from '../../assets/projects/echo.png'
import projectGeoguesser from '../../assets/projects/geoguesser.png'
import projectSimpleTweet from '../../assets/projects/simpletweet.png'

const HomeOS = ({ activeAppId, setActiveAppId }) => {
    // const [activeAppId, setActiveAppId] = useState(null) // Controlled by parent
    const [isDark, setIsDark] = useState(true)
    const [lang, setLang] = useState('en')
    const [wallpaper, setWallpaper] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLangOpen, setIsLangOpen] = useState(false)
    const [isWallpaperOpen, setIsWallpaperOpen] = useState(false)
    const [previewWallpaper, setPreviewWallpaper] = useState(null)
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState(null)

    const t = translations[lang]

    const wallpapers = [
        { src: wallpaperAndroid, name: 'Android' },
        { src: wallpaperIos, name: 'iOS' },
        { src: wallpaperFlutter, name: 'Flutter' }
    ]

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



    // Project Data
    const projects = [
        {
            title: "Echo",
            subtitle: "Location-based Social Platform",
            tech: ["Kotlin", "Jetpack Compose", "Firebase", "Google Maps"],
            color: "bg-indigo-900",
            image: projectEcho,
            link: "https://github.com/PaulLeung93/Echo"
        },
        {
            title: "GeoGuesser",
            subtitle: "World Exploration Game",
            tech: ["Kotlin", "Google Maps API", "Street View", "Volley"],
            color: "bg-blue-500",
            image: projectGeoguesser,
            link: "https://github.com/PaulLeung93/GeoGuesser"
        },
        {
            title: "SimpleTweet",
            subtitle: "Minimalist Twitter Client",
            tech: ["Android", "REST API", "OAuth", "Room DB"],
            color: "bg-sky-500",
            image: projectSimpleTweet,
            link: "https://github.com/PaulLeung93/SimpleTweet"
        }
    ]

    // Custom Photos Data
    const myPhotos = [
        { id: 1, src: droidcon1, caption: 'Droidcon NYC 2025' },
        { id: 2, src: droidcon2, caption: 'GenAI on Android!' },
        { id: 3, src: aiInsiders1, caption: 'Android AI Insiders' },
        { id: 4, src: aiInsiders2, caption: 'Google NYC' },
        { id: 5, src: buildWithAi1, caption: 'Build with AI' },
        { id: 6, src: buildWithAi2, caption: 'Agent Workshop' },
    ]

    // Apps configuration
    const apps = [
        {
            id: 'about',
            name: t.about,
            icon: User,
            color: 'bg-indigo-500',
            content: (
                <div className="p-8 pb-32">
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6 bg-gray-200">
                            {/* Placeholder Profile Pic - Replace with actual photo */}
                            <img
                                src={profilePic}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className={`text-8xl font-bold mb-4 text-center ${!isDark ? 'text-gray-900' : 'text-white'}`}>{t.aboutMe}</h2>
                    </div>

                    <div className="space-y-8 px-4">
                        <p className={`text-5xl leading-relaxed ${!isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                            I’m a mobile engineer, a native New Yorker who enjoys making native apps (ba dum tss). I’ve always been drawn to mobile because, honestly, I spend way too much time on my phone — but more importantly, I love how quickly mobile products can reach people. There’s something powerful about building experiences that are immediately accessible, anywhere, anytime.
                        </p>
                        <p className={`text-5xl leading-relaxed ${!isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                            My background is primarily in Android development, where I’ve spent years working with Kotlin, Jetpack Compose, and XML-based UIs, alongside cloud services, Firebase, and on-device capabilities. Over time, I’ve tried not to box myself in. I care less about platforms in isolation and more about building experiences that feel intentional, reliable, and human — regardless of the tech stack underneath.
                        </p>
                        <p className={`text-5xl leading-relaxed ${!isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                            I previously served as a Tech Fellow at CodePath and now serve as a Tech Fellow Manager, and that experience has profoundly reshaped how I see myself in this field. Working at CodePath helped me realize that there is a space for me in STEM — something I didn’t always take for granted. That realization has stayed with me, and it’s a big part of why I care so deeply about the work I do there now.
                        </p>
                        <p className={`text-5xl leading-relaxed ${!isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                            Supporting students and teaching assistants has influenced how I approach both engineering and mentorship. I’ve learned that confidence is often built through support, that clarity is an act of kindness, and that good technology — like good teaching — should help people feel capable rather than overwhelmed. I hope to pay that forward by creating spaces where students feel seen, supported, and empowered to keep going.
                        </p>
                        <p className={`text-5xl leading-relaxed ${!isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                            Community has been a constant through all of this. Whether it’s volunteering at Droidcon, attending small developer events, or having hallway conversations that end up being more meaningful than the talks themselves, I’ve learned that some of the most important growth happens outside of code. Being part of these spaces has helped me stay curious, grounded, and quite simply, happy.
                        </p>
                        <p className={`text-5xl leading-relaxed ${!isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                            Outside of work, you’ll probably find me at karaoke, confidently (and perhaps overly dramatically) singing “Go the Distance” by Michael Bolton. When I’m not doing that, I’m usually tinkering with my Bambu Lab 3D printer, running up my filament bill with all the neat 3D files I find online. I also have a soft spot for quiet cafe moments — especially if there’s a Peach Green Tea Lemonade from Starbucks involved. <del>Coffee chat</del> Tea chat sometime?
                        </p>
                        <p className={`text-5xl leading-relaxed ${!isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                            At the end of the day, I’m motivated by building things that help people — whether that’s an app, a learning experience, or a community. If you’re interested in mobile, AI, education, or just want to jam at karaoke, I’d love to connect.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'contact',
            name: t.contact,
            icon: MessageSquare,
            color: 'bg-green-500',
            content: (
                <div className="h-full flex flex-col items-center justify-center p-8">
                    {/* Digital Business Card */}
                    <div className={`w-full max-w-[90%] rounded-[5rem] p-16 shadow-2xl border-4 mb-16 ${!isDark ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'}`}>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-80 h-80 rounded-full border-[12px] border-blue-500 overflow-hidden mb-12 shadow-2xl">
                                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <h2 className={`text-9xl font-bold mb-6 ${!isDark ? 'text-gray-900' : 'text-white'}`}>Paul Leung</h2>
                            <p className={`text-6xl font-medium mb-16 ${!isDark ? 'text-blue-500' : 'text-blue-400'}`}>Mobile Engineer</p>

                            <div className="flex gap-12 w-full justify-center">
                                <a
                                    href="mailto:PaulLeung93@gmail.com"
                                    className={`p-10 rounded-[3rem] transition-transform hover:scale-110 active:scale-95 ${!isDark ? 'bg-gray-100 text-gray-700' : 'bg-gray-700 text-gray-200'}`}
                                >
                                    <Mail size={80} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/paulleung1993/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`p-10 rounded-[3rem] transition-transform hover:scale-110 active:scale-95 ${!isDark ? 'bg-blue-50 text-blue-600' : 'bg-blue-900/30 text-blue-400'}`}
                                >
                                    <Linkedin size={80} />
                                </a>
                                <a
                                    href="https://github.com/PaulLeung93"
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`p-10 rounded-[3rem] transition-transform hover:scale-110 active:scale-95 ${!isDark ? 'bg-gray-900 text-white' : 'bg-black text-white'}`}
                                >
                                    <Github size={80} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={`w-full max-w-[90%] p-12 rounded-[4rem] text-center ${!isDark ? 'bg-gray-200/50' : 'bg-white/5'}`}>
                        <p className={`text-6xl font-medium leading-relaxed ${!isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                            "Always happy to chat!"
                        </p>
                    </div>
                </div>
            )
        },
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
                <div className="h-full flex flex-col items-center justify-center p-8">
                    <div className="w-full max-w-[90%]">
                        <h3 className={`text-9xl font-bold mb-8 text-center ${!isDark ? 'text-gray-900' : 'text-white'}`}>My Playlist</h3>
                        <p className={`text-6xl text-center mb-16 ${!isDark ? 'text-gray-500' : 'text-gray-400'}`}>Curated coding vibes</p>

                        {/* Spotify Embed Scaled for Readability */}
                        <div className="w-full overflow-hidden shadow-2xl rounded-[3rem] relative bg-black" style={{ height: '1600px' }}>
                            <div className="absolute top-0 left-0 origin-top-left w-[31.25%] h-[500px]" style={{ transform: 'scale(3.2)' }}>
                                <iframe
                                    style={{ borderRadius: '12px' }}
                                    src="https://open.spotify.com/embed/playlist/35SBSeV8u4ZVhpPwQdAtLy?utm_source=generator&theme=0"
                                    width="100%"
                                    height="500"
                                    frameBorder="0"
                                    allowFullScreen=""
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>

                        <p className={`text-5xl text-center mt-12 ${!isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            🎵 Click play to start the music
                        </p>
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
                <div className="relative h-full flex flex-col">
                    <div className="p-4 grid grid-cols-2 gap-4 pb-32 overflow-y-auto">
                        <div className="col-span-2 py-4">
                            <h2 className={`text-5xl font-bold px-4 ${!isDark ? 'text-gray-900' : 'text-white'}`}>{t.recents}</h2>
                        </div>
                        {myPhotos.map((photo) => (
                            <motion.button
                                key={photo.id}
                                layoutId={`photo-${photo.id}`}
                                onClick={() => setSelectedPhoto(photo)}
                                className="aspect-square bg-gray-800 rounded-2xl overflow-hidden relative group cursor-pointer border-0 p-0"
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.caption}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </motion.button>
                        ))}
                        <div className="col-span-2 py-8 text-center text-gray-500 text-3xl">
                            {myPhotos.length} Photos
                        </div>
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

                        <div className={`p-8 flex items-center justify-between relative z-20 border-b ${!isDark ? 'border-gray-100' : 'border-gray-800'}`}>
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

                        <div className="p-8 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-pink-500 rounded-2xl"><Upload size={40} className="text-white" /></div>
                                <span className="text-6xl font-medium">{t.wallpaper}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        setPreviewWallpaper(wallpaper) // Initialize preview
                                        setIsWallpaperOpen(true)
                                    }}
                                    className={`text-5xl font-medium flex items-center gap-2 ${!isDark ? 'text-gray-500' : 'text-gray-400'}`}
                                >
                                    {t.select}
                                    <ChevronLeft size={32} className="rotate-180" />
                                </button>
                            </div>
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
                                    <span className="text-6xl font-bold px-4">{t.language}</span>
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

                        {isWallpaperOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: '100%' }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: '100%' }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className={`fixed inset-0 z-50 flex flex-col ${!isDark ? 'bg-gray-100' : 'bg-black'}`}
                                onLayoutAnimationComplete={() => {
                                    // Initialize preview with current wallpaper when opening
                                    if (!previewWallpaper && wallpaper) setPreviewWallpaper(wallpaper)
                                }}
                            >
                                <div className={`p-8 pt-12 flex items-center justify-between border-b ${!isDark ? 'border-gray-200 bg-white' : 'border-gray-800 bg-gray-900'}`}>
                                    <span className="text-6xl font-bold px-4">{t.wallpaper}</span>
                                    <button onClick={() => setIsWallpaperOpen(false)} className="p-4 rounded-full bg-gray-500/10">
                                        <X size={48} />
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-6 relative">
                                    <div className="grid grid-cols-2 gap-6 mb-8">
                                        {wallpapers.map((wp, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setPreviewWallpaper(wp.src)}
                                                className={`relative aspect-[9/16] rounded-[2.5rem] overflow-hidden border-4 transition-all duration-300 ${previewWallpaper === wp.src ? 'border-blue-500 scale-95 shadow-xl' : 'border-transparent hover:scale-95 shadow-md'}`}
                                            >
                                                <img src={wp.src} alt={wp.name} className="w-full h-full object-cover" />
                                                {previewWallpaper === wp.src && (
                                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-[1px]">
                                                        <div className="bg-blue-500 p-3 rounded-full shadow-lg">
                                                            <Check size={32} className="text-white" />
                                                        </div>
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="p-2 pb-48">
                                        <label className={`w-full py-8 rounded-[2rem] flex items-center justify-center gap-4 text-4xl font-medium cursor-pointer transition-all active:scale-95 ${!isDark ? 'bg-white shadow-sm text-gray-700' : 'bg-gray-900 text-gray-300'} ${previewWallpaper && !wallpapers.find(w => w.src === previewWallpaper) ? 'ring-4 ring-blue-500' : ''}`}>
                                            <Upload size={40} />
                                            <span>{uploadSuccess ? 'Uploaded!' : 'Upload Custom'}</span>
                                            {previewWallpaper && !wallpapers.find(w => w.src === previewWallpaper) && <Check size={40} className="text-blue-500" />}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files[0]
                                                    if (file) {
                                                        const url = URL.createObjectURL(file)
                                                        setPreviewWallpaper(url)
                                                        setUploadSuccess(true)
                                                        setTimeout(() => setUploadSuccess(false), 2000)
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>

                                    {/* Confirmation Button */}
                                    <div className="absolute bottom-12 left-0 w-full px-8">
                                        <button
                                            onClick={() => {
                                                if (previewWallpaper) {
                                                    setWallpaper(previewWallpaper)
                                                    setIsWallpaperOpen(false)
                                                }
                                            }}
                                            disabled={!previewWallpaper || previewWallpaper === wallpaper}
                                            className={`w-full py-6 rounded-[2rem] text-4xl font-bold shadow-xl transition-all ${previewWallpaper && previewWallpaper !== wallpaper
                                                ? 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
                                                : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            Set Wallpaper
                                        </button>
                                    </div>
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
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    // Map internal lang keys to standard locale strings
    const localeMap = {
        en: 'en-US', es: 'es-ES', de: 'de-DE', fr: 'fr-FR', it: 'it-IT',
        pt: 'pt-PT', ru: 'ru-RU', ja: 'ja-JP', zh: 'zh-CN', ko: 'ko-KR',
        hi: 'hi-IN', bn: 'bn-BD', ar: 'ar-SA', id: 'id-ID'
    }
    const locale = localeMap[lang] || 'en-US'
    const dayOfWeek = now.toLocaleDateString(locale, { weekday: 'long' })
    const monthDay = now.toLocaleDateString(locale, { month: 'long', day: 'numeric' })
    const timeString = now.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' })



    // Apps configuration


    // Apps configuration

    return (
        <div
            className={`w-full h-full bg-black text-white select-none flex flex-col font-sans transition-colors duration-300 ${!isDark ? 'bg-gray-100 text-black' : ''}`}
            style={wallpaper ? { backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
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
                        className="flex-1 p-6 flex flex-col pt-16 relative z-10"
                    >
                        {/* Date Widget */}
                        <div className="mb-16 pl-2 relative z-10">
                            <h2 className={`text-9xl font-thin mb-4 ${!isDark && !wallpaper ? 'text-black/90' : 'text-white/90'}`}>{timeString}</h2>
                            <h3 className={`text-6xl ${!isDark && !wallpaper ? 'text-black/60' : 'text-white/60'}`}>{dayOfWeek}, {monthDay}</h3>
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

            {/* Global Lightbox Overlay */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center p-8 pointer-events-auto"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.div
                            key={selectedPhoto.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = offset.x;

                                if (swipe < -50) {
                                    // Swipe Left - Next Photo
                                    const currentIndex = myPhotos.findIndex(p => p.id === selectedPhoto.id)
                                    const nextIndex = (currentIndex + 1) % myPhotos.length
                                    setSelectedPhoto(myPhotos[nextIndex])
                                } else if (swipe > 50) {
                                    // Swipe Right - Previous Photo
                                    const currentIndex = myPhotos.findIndex(p => p.id === selectedPhoto.id)
                                    const prevIndex = (currentIndex - 1 + myPhotos.length) % myPhotos.length
                                    setSelectedPhoto(myPhotos[prevIndex])
                                }
                            }}
                            className="w-full aspect-square bg-gray-900 rounded-3xl overflow-hidden shadow-2xl mb-12 relative touch-none cursor-grab active:cursor-grabbing"
                            onClick={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                            onPointerUp={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedPhoto.src}
                                alt={selectedPhoto.caption}
                                className="w-full h-full object-contain pointer-events-none"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="text-center w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <p className="text-white text-5xl font-medium mb-12">{selectedPhoto.caption}</p>
                            <div className="flex flex-col items-center gap-4">
                                <p className="text-white/50 text-3xl animate-pulse">Swipe to navigate</p>
                                <button
                                    onClick={() => setSelectedPhoto(null)}
                                    className="px-12 py-5 bg-white/10 rounded-full text-white text-4xl backdrop-blur-md border border-white/20 active:scale-95 transition-transform mt-4"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default HomeOS
