import { useState, useEffect, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import './index.css'

const menuItems = [
  { name: 'Spicy Honey Chicken Rice Bowl 🌶', category: 'Bowls & Pasta', price: '€7.20', image: 'https://imageproxy.wolt.com/assets/692438ea62c0f58ea1cb25ce' },
  { name: 'Berry Good Oats', category: 'Breakfast Bowls', price: '€4.30', image: 'https://imageproxy.wolt.com/assets/692438dd62c0f58ea1cb25b1' },
  { name: 'Sandwich Crunch', category: 'Sandwiches', price: '€4.60', image: 'https://imageproxy.wolt.com/assets/692438ea62c0f58ea1cb25cd' },
  { name: 'Chicken & Avocado Pasta', category: 'Bowls & Pasta', price: '€6.40', image: 'https://imageproxy.wolt.com/assets/692438e762c0f58ea1cb25c8' },
  { name: 'Protein Choco Stack', category: 'Pancakes', price: '€5.00', image: 'https://imageproxy.wolt.com/assets/692438d762c0f58ea1cb25a3' },
  { name: 'Rise & Shine Plate', category: 'Egg & Protein', price: '€5.00', image: 'https://imageproxy.wolt.com/assets/692438e062c0f58ea1cb25b8' },
  { name: 'Wrap me Pulë & Hummus', category: 'Wraps', price: '€6.10', image: 'https://imageproxy.wolt.com/assets/692438da62c0f58ea1cb25ab' },
  { name: 'Cacao Chia Boost', category: 'Breakfast Bowls', price: '€4.60', image: 'https://imageproxy.wolt.com/assets/692438dd62c0f58ea1cb25b2' },
  { name: 'Vezë Fshati', category: 'Egg & Protein', price: '€3.30', image: 'https://imageproxy.wolt.com/assets/692438e062c0f58ea1cb25ba' },
  { name: 'Tost The Avo Scramble', category: 'Toast', price: '€4.60', image: 'https://imageproxy.wolt.com/assets/692438e462c0f58ea1cb25c0' },
  { name: 'Tost Avocado Heat 🌶', category: 'Toast', price: '€4.10', image: 'https://imageproxy.wolt.com/assets/692438e062c0f58ea1cb25bb' },
  { name: 'The Scramble Stack', category: 'Egg & Protein', price: '€5.30', image: 'https://imageproxy.wolt.com/assets/692438e062c0f58ea1cb25b7' },
  { name: 'Spin & Egg', category: 'Egg & Protein', price: '€5.10', image: 'https://imageproxy.wolt.com/assets/692438e062c0f58ea1cb25b9' },
  { name: 'Tost Garden Ricotta', category: 'Toast', price: '€4.20', image: 'https://imageproxy.wolt.com/assets/692438e462c0f58ea1cb25c4' },
  { name: 'Briosh i Thjeshtë', category: 'Brioche', price: '€1.30', image: 'https://imageproxy.wolt.com/assets/692438d762c0f58ea1cb25a2' },
  { name: 'Briosh me Fistik', category: 'Brioche', price: '€2.00', image: 'https://imageproxy.wolt.com/assets/692438d762c0f58ea1cb25a4' },
  { name: 'Briosh me Çokollatë', category: 'Brioche', price: '€1.80', image: 'https://imageproxy.wolt.com/assets/692438d762c0f58ea1cb25a6' },
  { name: 'Briosh me Fruta', category: 'Brioche', price: '€2.40', image: 'https://imageproxy.wolt.com/assets/692438d762c0f58ea1cb25a5' },
  { name: 'Graham Cracker Dream', category: 'Pancakes', price: '€4.60', image: 'https://imageproxy.wolt.com/assets/692438da62c0f58ea1cb25a8' },
  { name: 'Morning Fruit Fix', category: 'Pancakes', price: '€4.40', image: 'https://imageproxy.wolt.com/assets/692438e462c0f58ea1cb25c3' },
  { name: 'Salad Çezar', category: 'Salads', price: '€6.10', image: 'https://imageproxy.wolt.com/assets/692438e462c0f58ea1cb25c2' },
  { name: 'Dotte Salad', category: 'Salads', price: '€6.60', image: 'https://imageproxy.wolt.com/assets/692438e462c0f58ea1cb25c1' },
  { name: 'Rucola', category: 'Salads', price: '€5.20', image: 'https://imageproxy.wolt.com/assets/692438e762c0f58ea1cb25c5' },
  { name: 'Dotte Pasta', category: 'Bowls & Pasta', price: '€6.80', image: 'https://imageproxy.wolt.com/assets/692438e762c0f58ea1cb25c9' },
  { name: 'Prosciutto & Cream Pasta', category: 'Bowls & Pasta', price: '€6.10', image: 'https://imageproxy.wolt.com/assets/692438e762c0f58ea1cb25c7' },
  { name: 'Spicy Red Pasta 🌶', category: 'Bowls & Pasta', price: '€5.40', image: 'https://imageproxy.wolt.com/assets/692438e762c0f58ea1cb25c6' },
  { name: 'Sandwich Pule', category: 'Sandwiches', price: '€4.40', image: 'https://imageproxy.wolt.com/assets/692438da62c0f58ea1cb25a9' },
  { name: 'Sandwich Veggie', category: 'Sandwiches', price: '€4.20', image: 'https://imageproxy.wolt.com/assets/692438da62c0f58ea1cb25aa' },
  { name: 'Wrap me Perime', category: 'Wraps', price: '€5.70', image: 'https://imageproxy.wolt.com/assets/692438da62c0f58ea1cb25ac' },
  { name: 'Burger Viçi', category: 'Burgers', price: '€4.30', image: 'https://imageproxy.wolt.com/assets/692438dd62c0f58ea1cb25af' },
  { name: 'Burger Crunch', category: 'Burgers', price: '€4.30', image: 'https://imageproxy.wolt.com/assets/692438dd62c0f58ea1cb25b0' },
  { name: 'Tiramisu', category: 'Desserts', price: '€4.00', image: 'https://imageproxy.wolt.com/assets/692438ea62c0f58ea1cb25cf' },
  { name: 'Kek me Çokollatë', category: 'Desserts', price: '€4.30', image: 'https://imageproxy.wolt.com/assets/692438ea62c0f58ea1cb25cc' },
  { name: 'Cheesecake', category: 'Desserts', price: '€4.30', image: 'https://imageproxy.wolt.com/assets/692438ed62c0f58ea1cb25d3' },
  { name: 'Coca-Cola', category: 'Drinks', price: '€1.50', image: 'https://imageproxy.wolt.com/assets/6924396b62c0f58ea1cb25f8' },
  { name: 'Coca-Cola Zero', category: 'Drinks', price: '€1.50', image: 'https://imageproxy.wolt.com/assets/6924396e62c0f58ea1cb25f9' },
  { name: 'Fanta', category: 'Drinks', price: '€1.50', image: 'https://imageproxy.wolt.com/assets/6924397a46255756c0dcd5c5' },
  { name: 'Schweppes', category: 'Drinks', price: '€1.50', image: 'https://imageproxy.wolt.com/assets/6924399338bc8f1db3966e8d' },
  { name: 'Sprite', category: 'Drinks', price: '€1.50', image: 'https://imageproxy.wolt.com/assets/6924399038bc8f1db3966e89' },
  { name: 'Schweppes Tonic', category: 'Drinks', price: '€1.50', image: 'https://imageproxy.wolt.com/assets/69243c3538bc8f1db3967002' },
  { name: 'Ice Tea', category: 'Drinks', price: '€1.50', image: 'https://imageproxy.wolt.com/assets/692707f4d40d5433297166e6' },
  { name: 'Ujë', category: 'Drinks', price: '€1.20', image: 'https://imageproxy.wolt.com/assets/69270786bdb7711ba3d377d8' },
  { name: 'Ujë Mineral', category: 'Drinks', price: '€1.30', image: 'https://imageproxy.wolt.com/assets/692707bd4be0f0d2140ec519' },
  { name: 'Santal', category: 'Drinks', price: '€1.50', image: 'https://imageproxy.wolt.com/assets/69243c4038bc8f1db3967005' },
  { name: 'Santal Big', category: 'Drinks', price: '€1.80', image: 'https://imageproxy.wolt.com/assets/69243c4938bc8f1db396700b' },
]

const reviews = [
  { text: "There is no better atmosphere than in Dotte, the coffee, music and the view is so perfect", author: "A. K.", rating: 5 },
  { text: "Amazing restaurant with excellent food quality. The chicken avocado pasta is a must-try dish!", author: "L. M.", rating: 5 },
  { text: "Dotte did not disappoint. Perfect cocktails and desserts, the vibe is super aesthetic.", author: "S. R.", rating: 5 },
  { text: "Absolutely loved this place! The food is super fresh and clearly made with quality ingredients.", author: "E. H.", rating: 5 },
  { text: "This is my go-to spot in Prishtina, I have my morning coffee here almost every day.", author: "M. D.", rating: 5 },
  { text: "The tiramisu is always fresh, clearly made with high-quality ingredients.", author: "J. P.", rating: 5 },
]

function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    let start = 0
    const startTime = performance.now()
    const step = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }
    requestAnimationFrame(step)
  }, [inView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

function FadeIn({ children, className = '', delay = 0 }) {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setInView(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`fade-in ${inView ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-caramel' : 'text-latte'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-warm-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-2xl font-display text-espresso tracking-tight">
          Dotte<span className="text-caramel">.</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {['Menu', 'Reviews', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-mocha/70 hover:text-espresso transition-colors">
              {item}
            </a>
          ))}
          <a href="https://wolt.com/sq/xkx/pristina/restaurant/dotte" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-espresso text-warm-white text-sm font-medium rounded-full hover:bg-mocha transition-colors">
            Order Now
          </a>
        </div>
        <button className="md:hidden text-espresso" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-warm-white/95 backdrop-blur-md border-t border-latte/50 px-6 py-4 flex flex-col gap-4">
          {['Menu', 'Reviews', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-base font-medium text-mocha/70 hover:text-espresso" onClick={() => setMobileOpen(false)}>
              {item}
            </a>
          ))}
          <a href="https://wolt.com/sq/xkx/pristina/restaurant/dotte" target="_blank" rel="noopener noreferrer" className="px-5 py-3 bg-espresso text-warm-white text-sm font-medium rounded-full text-center">
            Order Now
          </a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-warm-white to-latte/30">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-caramel/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-sage/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-caramel/15 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-latte/50 mb-8">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-mocha/80">Open now · See hours below</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-display text-espresso mb-6 leading-tight">
          Dotte<span className="text-caramel">.</span>
        </h1>
        <p className="text-xl md:text-2xl text-mocha/70 mb-8 max-w-2xl mx-auto font-light">
          Where great coffee, fresh food, and perfect vibes come together in the heart of Prishtina
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          <div className="flex items-center gap-2">
            <StarRating rating={5} />
            <span className="text-lg font-semibold text-espresso">4.7</span>
          </div>
          <div className="w-px h-6 bg-latte hidden md:block" />
          <div className="flex items-center gap-2 text-mocha/70">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-medium">Prishtina</span>
          </div>
          <div className="w-px h-6 bg-latte hidden md:block" />
          <div className="flex items-center gap-2 text-mocha/70">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="https://wolt.com/sq/xkx/pristina/restaurant/dotte" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-espresso text-warm-white rounded-full font-semibold hover:bg-mocha transition-all hover:scale-105 shadow-lg shadow-espresso/20">
            Place an Order
          </a>
          <a href="#menu" className="px-8 py-4 bg-white/60 backdrop-blur-sm text-espresso rounded-full font-semibold border border-latte hover:bg-white transition-all hover:scale-105">
            View Menu
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-mocha/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-semibold text-caramel uppercase tracking-wider">About Dotte</span>
            <h2 className="text-4xl md:text-5xl font-display text-espresso mt-3 mb-6">A hidden gem with an unbeatable vibe</h2>
            <p className="text-lg text-mocha/70 mb-6 leading-relaxed">
              Dotte is the perfect mix of vibrant energy and relaxing charm. With a modern yet cozy atmosphere, it's ideal for both casual meals and night outs with friends.
            </p>
            <p className="text-lg text-mocha/70 mb-8 leading-relaxed">
              From handcrafted coffee to fresh, healthy food options, everything at Dotte is made with passion and the finest ingredients.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Reviews', value: 4.7, suffix: '/5', decimals: 1 },
                { label: 'Total Reviews', value: 69, suffix: '' },
                { label: 'Happy Guests', value: 99, suffix: '%' },
              ].map((stat, i) => (
                <div key={i} className="p-4 bg-cream rounded-2xl text-center">
                  <div className="text-2xl font-display text-espresso">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-mocha/60 mt-1 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl shimmer">
              <img
                src="https://imageproxy.wolt.com/assets/6927073f4be0f0d2140ec4c4"
                alt="Dotte cafe interior"
                className="w-full h-full object-cover relative z-10"
                onLoad={(e) => e.target.parentElement.classList.remove('shimmer')}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-sage/30 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-caramel/20 rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

function TodaysSpecial() {
  const special = { name: 'Spicy Honey Chicken Rice Bowl 🌶', category: 'Most Popular', price: '€7.20', image: 'https://imageproxy.wolt.com/assets/692438ea62c0f58ea1cb25ce' }
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-caramel uppercase tracking-wider">Chef's Pick</span>
          <h2 className="text-4xl md:text-5xl font-display text-espresso mt-3">Today's Special</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="group bg-gradient-to-br from-cream to-latte/30 rounded-3xl p-8 md:p-12 border border-latte/50 hover:border-caramel/50 hover:shadow-2xl transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg shimmer">
                <img src={special.image} alt={special.name} className="w-full h-full object-cover relative z-10" onLoad={(e) => e.target.parentElement.classList.remove('shimmer')} />
              </div>
              <div>
                <div className="inline-block px-3 py-1 bg-caramel/20 text-caramel text-xs font-semibold rounded-full mb-4">MOST ORDERED</div>
                <h3 className="text-3xl font-display text-espresso mb-2">{special.name}</h3>
                <p className="text-mocha/60 mb-6">{special.category} — the crowd favorite that keeps our guests coming back.</p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-display text-caramel">{special.price}</span>
                  <StarRating rating={5} />
                </div>
                <a href="https://wolt.com/sq/xkx/pristina/restaurant/dotte" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-espresso text-warm-white rounded-full font-semibold hover:bg-mocha transition-all hover:scale-105 shadow-lg">
                  Order Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Menu() {
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', 'Breakfast Bowls', 'Egg & Protein', 'Toast', 'Brioche', 'Pancakes', 'Salads', 'Bowls & Pasta', 'Sandwiches', 'Wraps', 'Burgers', 'Desserts', 'Drinks']

  const filtered = activeCategory === 'All' ? menuItems : menuItems.filter(item => item.category === activeCategory)
  const visibleItems = filtered.slice(0, 8)

  return (
    <section id="menu" className="py-24 bg-cream/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-caramel uppercase tracking-wider">Our Offerings</span>
          <h2 className="text-4xl md:text-5xl font-display text-espresso mt-3">Menu Highlights</h2>
          <p className="text-mocha/60 mt-4 max-w-xl mx-auto">Fresh, flavorful, and made with love. Discover what makes Dotte special.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-espresso text-warm-white shadow-lg'
                  : 'bg-white text-mocha/70 hover:bg-latte/50 border border-latte'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleItems.map((item, i) => (
            <div key={i} className="group bg-white rounded-2xl border border-latte/50 hover:border-caramel/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="aspect-[4/3] bg-cream relative overflow-hidden shimmer">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
                  onLoad={(e) => e.target.parentElement.classList.remove('shimmer')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-espresso mb-1 leading-tight">{item.name}</h3>
                <p className="text-xs text-mocha/50 uppercase tracking-wider mb-3">{item.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-display text-caramel">{item.price}</span>
                  <span className="text-xs text-mocha/40">Must try</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length > 8 && (
          <div className="flex justify-center mt-12">
            <a
              href="https://wolt.com/sq/xkx/pristina/restaurant/dotte"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center bg-white rounded-2xl p-6 border border-latte/50 hover:border-caramel/50 hover:shadow-xl transition-all"
            >
              <QRCodeSVG
                value="https://wolt.com/sq/xkx/pristina/restaurant/dotte"
                size={140}
                bgColor="#FFFFFF"
                fgColor="#1E3A6E"
                level="M"
                includeMargin={false}
              />
              <span className="mt-4 text-sm font-medium text-espresso">Scan for full menu</span>
              <span className="text-xs text-mocha/50 mt-1">Opens on Wolt</span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

function Reviews() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % reviews.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="reviews" className="py-24 bg-espresso text-warm-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-caramel rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-latte rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-caramel uppercase tracking-wider">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-display mt-3">What our guests say</h2>
        </div>
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
              {reviews.map((review, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div className="bg-warm-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-warm-white/10">
                    <div className="flex justify-center mb-6">
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-xl md:text-2xl text-center leading-relaxed mb-8 font-light">"{review.text}"</p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-caramel/20 flex items-center justify-center text-lg font-display text-caramel">
                        {review.author.charAt(0)}
                      </div>
                      <span className="font-medium">{review.author}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-caramel' : 'w-2 bg-warm-white/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Amenities() {
  const amenities = [
    { icon: '🅿️', label: 'Free Parking' },
    { icon: '🍸', label: 'Cocktails & Bar' },
    { icon: '🕺', label: 'Dancing' },
    { icon: '🍽️', label: 'Table Service' },
    { icon: '🐕', label: 'Dog Friendly' },
    { icon: '🚻', label: 'Restroom' },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-caramel uppercase tracking-wider">Amenities</span>
          <h2 className="text-4xl md:text-5xl font-display text-espresso mt-3">Everything you need</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {amenities.map((item, i) => (
            <div key={i} className="group text-center p-6 rounded-2xl bg-cream/50 hover:bg-cream transition-colors">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
              <div className="text-sm font-medium text-espresso">{item.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="text-center p-8 rounded-3xl bg-cream/30">
            <div className="text-sm font-semibold text-caramel uppercase tracking-wider mb-2">Every Day</div>
            <div className="text-2xl font-display text-espresso mb-2">07:00 – 00:00</div>
            <div className="text-mocha/60">Open from 7 AM to Midnight</div>
          </div>
          <div className="text-center p-8 rounded-3xl bg-cream/30">
            <div className="text-sm font-semibold text-caramel uppercase tracking-wider mb-2">Location</div>
            <div className="text-2xl font-display text-espresso mb-2">Prishtina</div>
            <a href="https://maps.google.com/?q=42.6545375,21.1782969" target="_blank" rel="noopener noreferrer" className="text-sm text-caramel hover:underline">View on Maps</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Music() {
  const playlist = [
    { title: 'Morning Coffee Vibes', emoji: '☕' },
    { title: 'Sunset Cocktails', emoji: '🍹' },
    { title: 'Weekend Brunch', emoji: '🥞' },
    { title: 'Late Night Jazz', emoji: '🎷' },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-caramel uppercase tracking-wider">Dotte Vibes</span>
          <h2 className="text-4xl md:text-5xl font-display text-espresso mt-3">The Soundtrack</h2>
          <p className="text-mocha/60 mt-4 max-w-xl mx-auto">Our carefully curated playlist — the perfect backdrop for great food and company.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {playlist.map((track, i) => (
            <div key={i} className="group bg-cream/50 rounded-2xl p-6 hover:bg-cream transition-colors border border-latte/30 hover:border-caramel/50">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{track.emoji}</div>
              <div className="font-medium text-espresso">{track.title}</div>
              <div className="text-xs text-mocha/50 mt-1">Now Playing</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <div className="inline-flex flex-col items-center bg-cream/30 rounded-2xl p-8 border border-latte/50">
            <QRCodeSVG
              value="https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO"
              size={140}
              bgColor="#FFFFFF"
              fgColor="#1E3A6E"
              level="M"
              includeMargin={false}
            />
            <span className="mt-4 text-sm font-medium text-espresso">Scan to listen</span>
            <span className="text-xs text-mocha/50 mt-1">Spotify playlist</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const items = [
    { image: 'https://imageproxy.wolt.com/assets/692438ea62c0f58ea1cb25ce', label: 'Spicy Honey Chicken Rice Bowl', aspect: 'md:col-span-2 md:row-span-2' },
    { image: 'https://imageproxy.wolt.com/assets/692438dd62c0f58ea1cb25b3', label: 'Greek Yogurt & Granola', aspect: '' },
    { image: 'https://imageproxy.wolt.com/assets/692438e762c0f58ea1cb25c8', label: 'Chicken & Avocado Pasta', aspect: 'md:row-span-2' },
    { image: 'https://imageproxy.wolt.com/assets/692438ea62c0f58ea1cb25cf', label: 'Tiramisu', aspect: '' },
    { image: 'https://imageproxy.wolt.com/assets/692438e462c0f58ea1cb25c2', label: 'Caesar Salad', aspect: 'md:col-span-2' },
    { image: 'https://imageproxy.wolt.com/assets/692438d762c0f58ea1cb25a3', label: 'Protein Choco Stack', aspect: '' },
    { image: 'https://imageproxy.wolt.com/assets/692438ea62c0f58ea1cb25cd', label: 'Sandwich Crunch', aspect: '' },
    { image: 'https://imageproxy.wolt.com/assets/692438e062c0f58ea1cb25b8', label: 'Rise & Shine Plate', aspect: '' },
  ]

  return (
    <section className="py-24 bg-cream/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-caramel uppercase tracking-wider">Gallery</span>
          <h2 className="text-4xl md:text-5xl font-display text-espresso mt-3">Food & Atmosphere</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[120px]">
          {items.map((item, i) => (
            <div
              key={i}
              className={`rounded-3xl overflow-hidden relative group shimmer ${item.aspect}`}
            >
              <img
                src={item.image}
                alt={item.label}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
                onLoad={(e) => e.target.parentElement.classList.remove('shimmer')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs font-medium leading-tight">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-24 bg-espresso text-warm-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-caramel rounded-full blur-3xl -translate-x-1/2" />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <span className="text-sm font-semibold text-caramel uppercase tracking-wider">Visit Us</span>
        <h2 className="text-4xl md:text-5xl font-display mt-3 mb-6">Come experience Dotte</h2>
        <p className="text-lg text-warm-white/70 mb-12 max-w-xl mx-auto">
          Whether you're here for your morning coffee, a relaxed lunch, or an evening with cocktails and friends — we've got a seat for you.
        </p>
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Call us', value: '+383 49 400 070', icon: '📞', href: 'tel:+38349400070' },
            { label: 'Address', value: 'M53H+R87, Prishtina', icon: '📍', href: 'https://maps.google.com/?q=42.6545375,21.1782969' },
            { label: 'Wolt', value: 'Order delivery', icon: '🛵', href: 'https://wolt.com/sq/xkx/pristina/restaurant/dotte' },
          ].map((info, i) => (
            <a key={i} href={info.href} target="_blank" rel="noopener noreferrer" className="bg-warm-white/10 backdrop-blur-sm rounded-2xl p-6 border border-warm-white/10 hover:bg-warm-white/20 transition-colors text-center">
              <div className="text-2xl mb-2">{info.icon}</div>
              <div className="text-xs text-caramel uppercase tracking-wider mb-1">{info.label}</div>
              <div className="font-medium">{info.value}</div>
            </a>
          ))}
        </div>
        <div className="rounded-2xl overflow-hidden mb-12 border border-warm-white/10 shadow-2xl">
          <iframe
            title="Dotte location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.5!2d21.1782969!3d42.6545375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDM0JzIzLjYiTiAyMsKwMTUnMjQuNCJF!5e0!3m2!1sen!2s!4v1"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <a
          href="https://maps.google.com/?q=42.6545375,21.1782969"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-warm-white rounded-full font-medium hover:bg-white/20 transition-colors mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Get Directions
        </a>
        <br />
        <a
          href="https://wolt.com/sq/xkx/pristina/restaurant/dotte"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 bg-caramel text-espresso rounded-full font-display text-lg hover:bg-caramel/90 transition-all hover:scale-105 shadow-2xl shadow-caramel/20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Order on Wolt
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-mocha text-warm-white/60 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-2xl font-display text-warm-white">
            Dotte<span className="text-caramel">.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/dotte.pri/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-caramel transition-colors">Instagram</a>
            <a href="#" className="text-sm hover:text-caramel transition-colors">Facebook</a>
            <a href="https://wolt.com/sq/xkx/pristina/restaurant/dotte" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-caramel transition-colors">Wolt</a>
          </div>
          <div className="text-sm">
            © 2025 Dotte. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

function StickyMobileBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-espresso/95 backdrop-blur-md border-t border-latte/30 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
      <a
        href="https://wolt.com/sq/xkx/pristina/restaurant/dotte"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-caramel text-espresso font-display py-3 rounded-full hover:bg-caramel/90 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        Order on Wolt
      </a>
    </div>
  )
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-20 right-6 z-40 w-12 h-12 bg-espresso text-warm-white rounded-full shadow-lg hover:bg-mocha transition-all hover:scale-110 flex items-center justify-center"
      aria-label="Scroll to top"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  )
}

function App() {
  return (
    <div className="antialiased pb-16 md:pb-0">
      <Navbar />
      <FadeIn><Hero /></FadeIn>
      <FadeIn><TodaysSpecial /></FadeIn>
      <FadeIn><About /></FadeIn>
      <FadeIn><Menu /></FadeIn>
      <FadeIn><Reviews /></FadeIn>
      <FadeIn><Gallery /></FadeIn>
      <FadeIn><Music /></FadeIn>
      <FadeIn><Amenities /></FadeIn>
      <FadeIn><Contact /></FadeIn>
      <Footer />
      <StickyMobileBar />
      <ScrollToTop />
    </div>
  )
}

export default App
