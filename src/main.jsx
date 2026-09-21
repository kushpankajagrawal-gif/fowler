import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, Heart, Menu, Search, ShoppingBag, Sparkles, X } from 'lucide-react'
import './styles.css'

const products = [
  { id: 1, name: 'Sunlit Marigolds', category: 'Everyday joy', price: 32, color: 'saffron', image: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Blush Garden', category: 'Signature', price: 58, color: 'blush', image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Wild Meadow', category: 'Seasonal', price: 46, color: 'meadow', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Petal Party', category: 'Best sellers', price: 64, color: 'coral', image: 'https://images.unsplash.com/photo-1495231916356-a86217efff12?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'Lemon & Lace', category: 'Everyday joy', price: 38, color: 'lemon', image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'The Rose Edit', category: 'Signature', price: 72, color: 'rose', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85' },
]

const categories = ['All stems', 'Everyday joy', 'Signature', 'Seasonal']

function App() {
  const [activeCategory, setActiveCategory] = useState('All stems')
  const [cart, setCart] = useState([])
  const [followedProducts, setFollowedProducts] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const filteredProducts = activeCategory === 'All stems'
    ? products
    : products.filter((product) => product.category === activeCategory)

  const toggleFollow = (productId) => {
    setFollowedProducts((current) => current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId])
  }

  const addToCart = (product) => setCart((current) => [...current, product])
  const removeFromCart = (index) => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index))
  const cartTotal = cart.reduce((total, product) => total + product.price, 0)

  return (
    <div className="app-shell">
      <div className="announcement"><Sparkles size={14} /> Same-day delivery in Delhi NCR <span>•</span> Free note with every bouquet</div>
      <header className="site-header">
        <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setIsMenuOpen(true)}><Menu size={22} /></button>
        <a className="brand" href="#top" aria-label="Phoolfolk home"><span className="brand-mark">✽</span><span>phoolfolk</span></a>
        <nav className={isMenuOpen ? 'main-nav is-open' : 'main-nav'}>
          <button className="nav-close icon-button" onClick={() => setIsMenuOpen(false)} aria-label="Close menu"><X size={22} /></button>
          <a href="#shop" onClick={() => setIsMenuOpen(false)}>Shop flowers</a>
          <a href="#story" onClick={() => setIsMenuOpen(false)}>Our story</a>
          <a href="#journal" onClick={() => setIsMenuOpen(false)}>Journal</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Search"><Search size={20} /></button>
          <button className="bag-button" onClick={() => setIsCartOpen(true)} aria-label="Open shopping bag"><ShoppingBag size={19} /><span>{cart.length}</span></button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Flowers for all the little big moments</p>
            <h1>Let a little<br /><em>joy</em> bloom.</h1>
            <p className="hero-description">Colourful, characterful flowers grown with care and arranged by hand in New Delhi.</p>
            <a className="primary-button" href="#shop">Find your flowers <ArrowRight size={17} /></a>
            <div className="hero-note"><span className="note-line" /> <span>Freshness guaranteed for 7 days</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap"><img src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=90" alt="A colourful bouquet of fresh flowers" /></div>
            <div className="sun-stamp">fresh<br /><strong>every<br />day</strong></div>
            <div className="hero-caption">The Sunday bunch <strong>₹1,850</strong></div>
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading"><div><p className="eyebrow">Pick your palette</p><h2>Flowers with a point of view.</h2></div><p className="section-intro">No two bunches are exactly alike. That is the whole point.</p></div>
          <div className="category-row">{categories.map((category) => <button key={category} className={activeCategory === category ? 'category active' : 'category'} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
          <div className="product-grid">{filteredProducts.map((product) => {
            const isFollowing = followedProducts.includes(product.id)

            return (
              <article className="product-card" key={product.id}>
                <div className={`product-image ${product.color}`}>
                  <img src={product.image} alt={product.name} />
                  <button
                    className={isFollowing ? 'wishlist active' : 'wishlist'}
                    aria-label={isFollowing ? `Unfollow ${product.name}` : `Follow ${product.name}`}
                    onClick={() => toggleFollow(product.id)}
                  >
                    <Heart size={18} fill={isFollowing ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="product-info">
                  <div><h3>{product.name}</h3><p>{product.category}</p></div>
                  <strong>₹{product.price.toLocaleString('en-IN')}</strong>
                </div>
                <div className="product-actions">
                  <button className={isFollowing ? 'follow-button is-following' : 'follow-button'} onClick={() => toggleFollow(product.id)}>
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                  <button className="add-button" onClick={() => { addToCart(product); setIsCartOpen(true) }}>Add to bag <span>+</span></button>
                </div>
              </article>
            )
          })}</div>
        </section>

        <section className="story-section" id="story"><div className="story-image"><img src="https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1000&q=85" alt="Florist arranging flowers" /></div><div className="story-copy"><p className="eyebrow">The phoolfolk way</p><h2>More colour.<br /><em>Less fuss.</em></h2><p>We work with local growers, follow the seasons, and make every arrangement feel like it has just wandered in from a beautiful garden.</p><a className="text-link" href="#journal">Meet the flower folk <ArrowRight size={17} /></a></div></section>

        <section className="newsletter" id="journal"><div><p className="eyebrow">A little something in your inbox</p><h2>Fresh notes, no fluff.</h2></div><form onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Your email address" aria-label="Your email address" /><button type="submit" className="primary-button">Join us <ArrowRight size={17} /></button></form></section>
      </main>

      <footer><a className="brand" href="#top"><span className="brand-mark">✽</span><span>phoolfolk</span></a><p>Flowers that make a room feel like a celebration.</p><span>© 2026 Phoolfolk</span></footer>

      {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="cart-header"><div><p className="eyebrow">Your bunches</p><h2>Shopping bag <span>{cart.length}</span></h2></div><button className="icon-button" aria-label="Close shopping bag" onClick={() => setIsCartOpen(false)}><X size={23} /></button></div>{cart.length === 0 ? <div className="empty-cart"><span>✽</span><p>Your bag is waiting<br />for a little colour.</p><button className="text-link" onClick={() => setIsCartOpen(false)}>Explore flowers <ArrowRight size={17} /></button></div> : <><div className="cart-items">{cart.map((product, index) => <div className="cart-item" key={`${product.id}-${index}`}><img src={product.image} alt="" /><div><h3>{product.name}</h3><p>₹{product.price.toLocaleString('en-IN')}</p><button onClick={() => removeFromCart(index)}>Remove</button></div></div>)}</div><div className="cart-footer"><div><span>Subtotal</span><strong>₹{cartTotal.toLocaleString('en-IN')}</strong></div><button className="primary-button">Checkout <ArrowRight size={17} /></button></div></>}</aside></div>}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
