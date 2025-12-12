import { useEffect, useRef } from 'react'

const AnimatedBackground = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let animationFrameId
        let time = 0

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Gradient blob positions and properties
        const blobs = [
            { x: 0.2, y: 0.3, radius: 0.4, color: '#00f2fe', speed: 0.003 },
            { x: 0.8, y: 0.6, radius: 0.5, color: '#4facfe', speed: 0.002 },
            { x: 0.5, y: 0.8, radius: 0.45, color: '#0066ff', speed: 0.0025 },
        ]

        const animate = () => {
            time += 1

            // Clear canvas with base black color
            ctx.fillStyle = '#050505'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw animated gradient blobs
            blobs.forEach((blob, index) => {
                const offsetX = Math.sin(time * blob.speed + index) * 0.1
                const offsetY = Math.cos(time * blob.speed + index * 0.5) * 0.1

                const x = (blob.x + offsetX) * canvas.width
                const y = (blob.y + offsetY) * canvas.height
                const radius = blob.radius * Math.min(canvas.width, canvas.height)

                const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
                gradient.addColorStop(0, `${blob.color}35`) // Low opacity at center
                gradient.addColorStop(0.5, `${blob.color}18`)
                gradient.addColorStop(1, 'transparent')

                ctx.fillStyle = gradient
                ctx.fillRect(0, 0, canvas.width, canvas.height)
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    )
}

export default AnimatedBackground
