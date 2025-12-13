import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Smartphone, Globe, Mail, X, ChevronRight, ExternalLink } from 'lucide-react'

const Section = ({ children, className, ...props }) => (
    <section className={`w-full flex flex-col justify-center py-32 px-8 ${className}`} {...props}>
        {children}
    </section>
)

const experiences = [
    {
        id: 'popstock',
        company: 'PopStock',
        role: 'Android Developer',
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

const blogs = [
    {
        id: 'android-ai-insiders',
        title: 'Android AI Insiders @ Google NYC',
        date: 'October 2025',
        preview: 'Earlier this fall, I had the chance to attend Android AI Insiders, an invite-only, in-person event hosted at Google’s New York office. The event brought together a small group of Android engineers...',
        content: `Earlier this fall, I had the chance to attend Android AI Insiders, an invite-only, in-person event hosted at Google’s New York office. The event brought together a small group of Android engineers and product leaders to explore where AI on Android is headed and how developers can build smarter, more responsible experiences.

Over two days, the focus was on hands-on learning and technical discussions around Android’s evolving AI ecosystem, particularly on-device intelligence and developer tooling. While much of what was discussed aligns with publicly released Android AI features, the real value was in the broader context: how Google is thinking about AI on Android and what that means for developers building real products.

One unexpectedly fun part of the event was the people. A lot of the engineers in the room were folks I’ve “known” for years through Android YouTube videos, Google I/O talks, and official learning guides. Seeing them in person was a little surreal. It felt a little awkward realizing I was treating Android engineers like celebrities, but in a sense, that’s exactly what they were to me. People I’d learned from for years, suddenly just standing next to me in line for coffee.

There was also a hackathon where we got to experiment with newer AI features, whether on-device or in the cloud. I didn’t win, but I did walk away with a free pair of Google Pixel Buds 2. This felt like a victory in itself, especially since I’d been stubbornly clinging to wired headphones up until that point.

Beyond the sessions, it was great connecting with other Android developers who are actively building AI features in production. Those conversations, swapping notes, sharing challenges, and learning how others think, were just as valuable as the talks themselves.

Grateful to the Android team for the invitation and for including me in the Android Insiders Program. Events like this are a reminder of how thoughtful and collaborative the Android community continues to be, and I’m excited to carry those learnings forward as the platform evolves.`,
        color: 'from-green-500 to-emerald-700'
    },
    {
        id: 'droidcon-nyc',
        title: 'Droidcon NYC @ Brooklyn Navy Yard',
        date: 'June 25th to 26th, 2025',
        preview: 'I get to attend Droidcon NYC this year by volunteering. This is partly because I genuinely enjoy helping out at community events, and partly because conference tickets are expensive and this was my workaround...',
        content: `I get to attend Droidcon NYC this year by volunteering. This is partly because I genuinely enjoy helping out at community events, and partly because conference tickets are expensive and this was my workaround 😅. It ends up being a great experience.

Volunteering gives me access to a lot of the talks I’m excited about, and the schedule makes it easy to balance helping out with sitting in on sessions. On the first day, I’m on t-shirt duty, handing out free shirts for both Android and Flutter. It was a surprisingly effective way to meet just about everyone at the conference.

On day two, I’m a stage manager for the speakers. This is a fancy way of saying I quietly cue speakers when they’re running out of time and run around helping with whatever they need. It turns out to be perfect. I get a front-row seat to the talks while still being useful, which is exactly what I wanted.

The event takes place at the Brooklyn Navy Yard, which I’m thankful for since I’m already in Brooklyn. The commute is easy. The venue temperature, however, is not. It’s easily one of the hottest two days of the summer, and the AC is doing its best (but not quite enough).

Heat aside, it’s great meeting so many people who care deeply about Android and the community around it. Droidcon is a reminder that some of the best parts of conferences happen outside the talks. They happen in the conversations, shared complaints about the weather, and mutual excitement about building things.

Hot venue, great people, and lots of free t-shirts. I would absolutely do it again.`,
        color: 'from-purple-500 to-pink-500'
    },
    {
        id: 'build-with-ai',
        title: 'Build with AI @ Google NYC',
        date: 'March 12, 2025',
        preview: 'Recently, I attended Build with AI at Google’s New York office, a hands-on event focused on actually building AI systems, not just talking about them. The sessions dive into agent-based workflows...',
        content: `Recently, I attended Build with AI at Google’s New York office, a hands-on event focused on actually building AI systems, not just talking about them. The sessions dive into agent-based workflows and how to design, customize, and orchestrate AI agents using Google’s AI tooling.

After a few talks, we jump into a guided workshop where I build my first AI agent using Vertex AI Agent Builder. The workshop walks through designing an AI teaching assistant, which feels especially funny given that I work closely with TAs at CodePath. To be clear: this is not a replacement for them 😅. If anything, the exercise highlights how much thought goes into defining an agent’s role, limits, and success metrics before any “intelligence” shows up.

The lab emphasizes intentional design: what problem the agent should solve, how autonomous it should be, what it can and can’t do, and how to ground it with real data. Building an agent around a teaching assistant makes those questions very real, very fast.

And finally, I’d be lying if I didn’t mention the food. There are fresh waffles, extremely fancy catering, and waiters walking around with trays. It was the kind of setup I’ve only ever seen in movies. Easily the most luxurious environment I’ve ever written AI code in.

Overall, it’s a fun, practical introduction to agent-based AI development with great people, great learning, and elite waffles.`,
        color: 'from-blue-500 to-indigo-600'
    }
]

import Header from './Header'
import ScrollDownIndicator from './ScrollDownIndicator'

const Overlay = ({ setPhoneModel, currentModel }) => {
    const [selectedExperience, setSelectedExperience] = useState(null)
    const [selectedBlog, setSelectedBlog] = useState(null)

    return (
        <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
            <Header />
            <ScrollDownIndicator />

            {/* Hero Section */}
            <Section className="min-h-screen items-start pt-20 relative" id="hero">
                <div className="max-w-2xl">
                    <motion.div
                        className="pointer-events-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
                            MOBILE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">DEVELOPER</span>
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

                {/* Phone Switcher - Floating on Right Side */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-end gap-4 pointer-events-auto hidden md:flex"
                >
                    <span className="text-sm text-gray-500 font-bold uppercase tracking-wider text-right">Select<br />Device</span>
                    <div className="flex flex-col bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10 gap-2">
                        <button
                            onClick={() => setPhoneModel('default')}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${currentModel === 'default' ? 'bg-white text-black shadow-lg scale-110' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                            title="Default Black"
                        >
                            <div className="w-6 h-10 border-2 border-current rounded-[4px] relative bg-black/50 overflow-hidden">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-current rounded-b-[2px]" />
                            </div>
                        </button>
                        <button
                            onClick={() => setPhoneModel('iphone')}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${currentModel === 'iphone' ? 'bg-white text-black shadow-lg scale-110' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                            title="iPhone Titanium"
                        >
                            <div className="w-6 h-10 border-2 border-current rounded-[5px] relative overflow-hidden">
                                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-[3px] bg-current rounded-full" />
                            </div>
                        </button>
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
                    <h2 className="text-4xl font-bold mb-12">Experience</h2>
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
                <div className="max-w-6xl w-full mx-auto pointer-events-auto">
                    <h2 className="text-4xl font-bold mb-12">Latest Thoughts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {blogs.map((blog) => (
                            <motion.div
                                key={blog.id}
                                layoutId={`blog-${blog.id}`}
                                onClick={() => setSelectedBlog(blog)}
                                className="group relative p-6 bg-gray-900/50 border border-white/5 rounded-2xl cursor-pointer hover:bg-gray-800/50 transition-colors overflow-hidden"
                            >
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${blog.color} opacity-50 group-hover:opacity-100 transition-opacity`} />

                                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{blog.title}</h3>
                                <p className="text-sm text-gray-500 font-mono mb-4">{blog.date}</p>

                                <p className="text-sm text-gray-400 line-clamp-3 mb-6">
                                    {blog.preview}
                                </p>

                                <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
                                    Read Article <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Blog Detail Modal */}
            <AnimatePresence>
                {selectedBlog && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedBlog(null)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 pointer-events-auto"
                        />
                        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
                            <motion.div
                                layoutId={`blog-${selectedBlog.id}`}
                                className="w-full max-w-2xl bg-gray-900 border border-white/10 rounded-2xl overflow-hidden pointer-events-auto shadow-2xl"
                            >
                                <div className={`h-2 w-full bg-gradient-to-r ${selectedBlog.color}`} />
                                <div className="p-8 max-h-[80vh] overflow-y-auto">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-3xl font-bold mb-2">{selectedBlog.title}</h3>
                                            <p className="text-gray-400 font-mono">{selectedBlog.date}</p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedBlog(null)}
                                            className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="prose prose-invert prose-sm max-w-none mb-8">
                                        {selectedBlog.content.split('\n\n').map((paragraph, index) => (
                                            <p key={index} className="text-gray-300 leading-relaxed text-lg mb-6">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setSelectedBlog(null)}
                                        className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                    >
                                        Close Article
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

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
                            style={{ pointerEvents: 'auto', position: 'relative' }}
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
