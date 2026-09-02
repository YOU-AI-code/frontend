import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ChevronRight, Clock3, MapPin, Phone, ShoppingBag, Star, X, Plus, Minus, Send, Instagram, Facebook, Youtube, Music2 } from 'lucide-react';
import './styles.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const WA = '923702090917';

const menu = [
  {id:'tikka',cat:'Premium',name:'Premium Chicken Tikka',price:600,desc:'Juicy chicken tikka, mozzarella, fresh onions, capsicum and signature tikka sauce.',img:'https://images.deliveryhero.io/image/fd-pk/products/54235107.jpg?width=900',badge:'Popular'},
  {id:'malai',cat:'Premium',name:'Chicken Malai Boti White',price:600,desc:'Creamy malai boti, mozzarella, sweet corn and smooth white sauce.',badge:'Customer Favourite'},
  {id:'chargha',cat:'Premium',name:'Chicken Chargha Spicy',price:600,desc:'Chargha-style chicken, spicy masala, cheese, onions and green chilies.'},
  {id:'behari',cat:'Premium',name:'Chicken Behari',price:600,desc:'Rich Behari chicken with traditional spices, cheese and onions.'},
  {id:'shawarma',cat:'Premium',name:'Chicken Shawarma',price:600,desc:'Shawarma chicken, garlic sauce, cheese, onions and cabbage.'},
  {id:'tandoori',cat:'Premium',name:'Chicken Tandoori',price:600,desc:'Smoky tandoori chicken, cheese, onions and capsicum.'},
  {id:'sicilian',cat:'Premium',name:'Chicken Sicilian Spicy',price:600,desc:'Italian herbs, spicy chicken, olives, capsicum and extra cheese.'},
  {id:'arabic',cat:'Premium',name:'Chicken Arabic Green',price:600,desc:'Arabic-style chicken, green herb sauce, cheese, olives and vegetables.'},
  {id:'hot',cat:'Premium',name:'Pizza Master Hot & Spicy',price:600,desc:'House special with spicy chicken, jalapeños, capsicum and extra cheese.',badge:'House Special'},
  {id:'supreme',cat:'Premium',name:'Premium Chicken Supreme',price:600,desc:'Chicken chunks, vegetables, olives and extra cheese.'},
  {id:'creamy-fajita',cat:'Premium',name:'Chicken Creamy Fajita Spicy',price:600,desc:'Creamy and spicy fajita chicken with cheese and capsicum.'},
  {id:'creamy-tikka',cat:'Premium',name:'Premium Creamy Tikka',price:600,desc:'Soft tikka chicken, creamy sauce, extra cheese and light vegetables.'},
  {id:'pepperoni',cat:'Premium',name:'Premium Pepperoni Hot & Spicy',price:600,desc:'Pepperoni, cheese, jalapeños and spicy sauce.'},
  {id:'afghani-feast',cat:'Premium',name:'Premium Special Afghani Feast',price:600,desc:'Afghani chicken, white sauce, cheese, black olives and creamy sauce.'},
  {id:'mughlai',cat:'Premium',name:'Premium Chicken Mughlai',price:600,desc:'Mughlai chicken, creamy sauce, cheese and mild spices.'},
  {id:'italian',cat:'Premium',name:'Premium Italian Delight',price:600,desc:'Italian herbs, grilled chicken, olives, capsicum and cheese.'},
  {id:'margherita',cat:'Premium',name:'Premium Cheesy Margherita',price:600,desc:'Extra mozzarella, pizza sauce and herbs.'},
  {id:'fajita-special',cat:'Premium',name:'Premium Special Fajita',price:600,desc:'Fajita chicken, extra cheese, onions, capsicum and bold seasoning.'},
  {id:'kabab-chaska',cat:'Premium',name:'Premium Kabab Chaska Large',price:900,desc:'Chicken tikka and seekh kabab with onions, peppers, tomatoes, olives and mozzarella.',badge:'Big Favourite'},
  {id:'kabab-fantum',cat:'Premium',name:'Premium Kabab Fantum Large',price:1000,desc:'12-inch large pizza loaded with premium kabab, extra cheese, olives, vegetables and signature sauce.'},
  {id:'small-mb',cat:'Personal',name:'Chicken Malai Boti Small',price:300,desc:'6-inch pan pizza with creamy malai boti, cheese and mild flavours.'},
  {id:'small-fajita',cat:'Personal',name:'Chicken Fajita Small',price:300,desc:'6-inch pan pizza with fajita chicken, cheese, capsicum and onions.'},
  {id:'small-tikka',cat:'Personal',name:'Chicken Tikka Small',price:300,desc:'6-inch pan pizza with chicken tikka, cheese and desi spices.'},
  {id:'small-afghani',cat:'Personal',name:'Chicken Afghani Small',price:300,desc:'6-inch pan pizza with Afghani chicken, creamy sauce and cheese.'},
  {id:'small-chargha',cat:'Personal',name:'Chicken Chargha Small',price:300,desc:'6-inch pan pizza with chargha chicken, cheese and desi masala.'},
  {id:'deal6',cat:'Deals',name:'Deal 6 — Late Night Cravings',price:807.5,desc:'1 large pizza + 345ml drink.',badge:'Late Night'},
  {id:'deal2',cat:'Deals',name:'Deal 2 — For 2 Persons',price:1105,desc:'2 regular pizzas + 1 litre drink free.'},
  {id:'deal4',cat:'Deals',name:'Deal 4 — Family Favourite',price:1615,desc:'2 large pizzas + 1 litre drink.',badge:'Best Seller'},
  {id:'deal5',cat:'Deals',name:'Deal 5 — Kids & Family',price:1275,desc:'1 large pizza + 2 small pizzas + 1 litre drink.'},
  {id:'deal7',cat:'Deals',name:'Deal 7 — Friends Gathering',price:2422.5,desc:'3 large pizzas + 1.5 litre drink.'},
  {id:'deal8',cat:'Deals',name:'Deal 8 — Family Party',price:3187.5,desc:'4 large pizzas + 1.5 litre drink.'},
  {id:'deal9',cat:'Deals',name:'Deal 9 — Family Festival',price:3995,desc:'5 large pizzas + jumbo drink.'},
  {id:'deal10',cat:'Deals',name:'Deal 10 — Family Feast',price:4760,desc:'6 large pizzas + jumbo drink.'},
  {id:'deal11',cat:'Deals',name:'Deal 11 — XL + Small',price:1615,desc:'1 extra-large pizza + 1 small pizza + 1 litre drink.'},
  {id:'fizup345',cat:'Drinks',name:'Fizup 345ml',price:130,desc:'Refreshing 345ml bottle.'},
  {id:'cola345',cat:'Drinks',name:'Cola Next 345ml',price:130,desc:'Refreshing 345ml bottle.'},
  {id:'fizup1',cat:'Drinks',name:'Fizup 1 Litre',price:200,desc:'1 litre bottle.'},
  {id:'cola1',cat:'Drinks',name:'Cola Next 1 Litre',price:200,desc:'1 litre bottle.'},
  {id:'fizup15',cat:'Drinks',name:'Fizup 1.5 Litre',price:250,desc:'1.5 litre bottle.'},
  {id:'cola15',cat:'Drinks',name:'Cola Next 1.5 Litre',price:250,desc:'1.5 litre bottle.'},
  {id:'fizupjumbo',cat:'Drinks',name:'Fizup Jumbo',price:480,desc:'2.25 litre jumbo bottle.'},
  {id:'colajumbo',cat:'Drinks',name:'Cola Next Jumbo',price:480,desc:'Jumbo bottle.'}
];

const branches = [
  'Azizabad — Shop No 4, Plot A59, Liaquat Ali Khan Chowk',
  'Gulistan-e-Johar — Shop #B-01, Lakhani Pride, Block 13',
  'Federal B Area — Zahid Square, Block 16',
  'Gulshan-e-Iqbal — Block 2',
  'North Nazimabad',
  'North Karachi — Sector 11-A',
  'Anda Mor — Sector 7-D/1',
  'Shah Faisal Colony — Qadri Muhalla',
  'Surjani Town — Sector 5',
  'Gulshan-e-Jamal',
  'Gulshan-e-Johar Block 19'
];

function money(n){return `Rs. ${Number(n).toLocaleString('en-PK',{maximumFractionDigits:2})}`}
function App(){
  const [cat,setCat]=useState('Deals'); const [cart,setCart]=useState([]); const [openCart,setOpenCart]=useState(false); const [search,setSearch]=useState(''); const [toast,setToast]=useState('');
  const [form,setForm]=useState({name:'',phone:'',address:'',branch:branches[0],notes:''});
  const cats=['Deals','Premium','Personal','Drinks'];
  const shown=useMemo(()=>menu.filter(x=>x.cat===cat && x.name.toLowerCase().includes(search.toLowerCase())),[cat,search]);
  const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
  const add=(item)=>{setCart(c=>{const old=c.find(x=>x.id===item.id);return old?c.map(x=>x.id===item.id?{...x,qty:x.qty+1}:x):[...c,{...item,qty:1}]});setToast(`${item.name} added to cart`);setTimeout(()=>setToast(''),1800)};
  const change=(id,d)=>setCart(c=>c.map(x=>x.id===id?{...x,qty:x.qty+d}:x).filter(x=>x.qty>0));
  const order=async(e)=>{e.preventDefault(); if(!cart.length){setToast('Add an item first');return;} const payload={...form,items:cart,total}; try{const r=await fetch(`${API}/orders`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const data=await r.json();const lines=cart.map(x=>`${x.qty}x ${x.name} — ${money(x.price*x.qty)}`).join('%0A');const msg=`Hello Pizza Master G!%0AOrder #${data.orderId}%0A%0A${lines}%0A%0ATotal: ${money(total)}%0A%0AName: ${form.name}%0APhone: ${form.phone}%0AAddress: ${form.address}%0ABranch: ${form.branch}%0ANotes: ${form.notes||'None'}`;window.open(`https://wa.me/${WA}?text=${msg}`,'_blank');setCart([]);setOpenCart(false);setToast(`Order #${data.orderId} created`)}catch(err){setToast('Backend unavailable — WhatsApp order can still be sent manually.')}};
  useEffect(()=>{document.title='Pizza Master G | Pizza. Deals. Delivered.'},[]);
  return <div className="app">
    <div className="topbar"><span>Karachi • Multiple Branches</span><span>Open late • Order online or on WhatsApp</span></div>
    <header className="nav"><a className="brand" href="#home"><span className="brand-mark">PMG</span><span><b>Pizza Master</b> <strong>G</strong><small>PIZZA • DEALS • DELIVERED</small></span></a><nav><a href="#menu">Menu</a><a href="#deals">Deals</a><a href="#branches">Branches</a><a href="#about">About</a></nav><button className="cart-btn" onClick={()=>setOpenCart(true)}><ShoppingBag size={19}/> Cart <span>{cart.reduce((s,x)=>s+x.qty,0)}</span></button></header>
    <main>
      <section id="home" className="hero"><div className="hero-copy"><div className="eyebrow"><Star size={14} fill="currentColor"/> Karachi's pizza destination</div><h1>Big flavour.<br/><em>Better deals.</em><br/>Made for sharing.</h1><p>From desi favourites like Chicken Tikka and Malai Boti to loaded family combos, Pizza Master G brings serious pizza cravings to Karachi.</p><div className="hero-actions"><a className="primary" href="#menu">Explore Menu <ChevronRight size={18}/></a><a className="secondary" href={`https://wa.me/${WA}`} target="_blank">Order on WhatsApp</a></div><div className="trust"><span><b>4.8★</b><small>500+ ratings on Foodpanda at FB Area</small></span><span><b>Rs. 300+</b><small>personal pan pizzas</small></span><span><b>11+</b><small>listed Karachi locations</small></span></div></div><div className="hero-art"><div className="glow"></div><img src="https://images.deliveryhero.io/image/fd-pk/products/54235107.jpg?width=900" alt="Pizza Master G chicken tikka pizza"/><div className="floating-card"><span>BEST SELLER</span><b>Deal 4</b><small>2 Large Pizzas + 1L Drink</small><strong>{money(1615)}</strong></div></div></section>
      <section className="strip"><div><Clock3/> Late-night friendly</div><div><MapPin/> Multiple Karachi branches</div><div><ShoppingBag/> Easy online ordering</div><div><Star/> Value-focused deals</div></section>
      <section id="deals" className="promo"><div><span className="eyebrow">THE VALUE PLAY</span><h2>Feed the table,<br/>not just the craving.</h2><p>Our most popular combinations are built for families, friends and late-night plans.</p><a href="#menu" className="light-btn">Shop deals <ChevronRight size={17}/></a></div><img src="https://images.deliveryhero.io/image/global-menu-service/FP_PK/vendor/rxgx/product/100655268/bff976bc-3b84-4457-a05b-58ba5d5bccaf.jpg?width=900" alt="Pizza Master G value deal"/></section>
      <section id="menu" className="menu-section"><div className="section-head"><div><span className="eyebrow">OUR MENU</span><h2>Pick your favourite.</h2></div><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search pizza, deal or drink..."/></div><div className="tabs">{cats.map(c=><button className={cat===c?'active':''} key={c} onClick={()=>setCat(c)}>{c}</button>)}</div><div className="grid">{shown.map(item=><article className="card" key={item.id}><div className="food-img">{item.img?<img src={item.img} alt=""/>:<span>🍕</span>}{item.badge&&<b>{item.badge}</b>}</div><div className="card-body"><div><h3>{item.name}</h3><p>{item.desc}</p></div><footer><strong>{money(item.price)}</strong><button onClick={()=>add(item)}><Plus size={17}/> Add</button></footer></div></article>)}</div></section>
      <section id="about" className="about"><div className="about-card"><span className="eyebrow">WHY PMG</span><h2>Built around flavour, value & convenience.</h2><p>Pizza Master G has grown around a simple idea: give Karachi customers bold flavours, generous choices and deals that make sense for everyday meals and gatherings.</p><div className="about-stats"><div><b>20+</b><span>premium flavours & variants</span></div><div><b>Rs. 300</b><span>starting personal pizza price</span></div><div><b>Karachi</b><span>multi-branch delivery footprint</span></div></div></div><div className="about-image"><img src="https://images.deliveryhero.io/image/global-menu-service/FP_PK/vendor/rc4c/product/102060843/b62816af-42e4-4e71-b9bb-eae052b735a9.jpg?width=900" alt="Pizza Master G deal"/></div></section>
      <section id="branches" className="branches"><div className="section-head"><div><span className="eyebrow">FIND US</span><h2>Pizza Master G, around Karachi.</h2></div><a className="secondary" href={`tel:+${WA}`}><Phone size={17}/> Call to order</a></div><div className="branch-grid">{branches.map((b,i)=><div className="branch" key={b}><span>0{i+1}</span><MapPin size={17}/><p>{b}</p></div>)}</div></section>
      <section className="order-cta"><div><span className="eyebrow">READY WHEN YOU ARE</span><h2>Your next pizza night starts here.</h2><p>Choose your favourites, add them to your cart and send your order directly to Pizza Master G on WhatsApp.</p></div><button className="primary" onClick={()=>setOpenCart(true)}>Open cart <ShoppingBag size={18}/></button></section>
    </main>
    <footer><div className="footer-brand"><a className="brand" href="#home"><span className="brand-mark">PMG</span><span><b>Pizza Master</b> <strong>G</strong><small>PIZZA • DEALS • DELIVERED</small></span></a><p>Bold pizzas. Smart deals. Karachi.</p></div><div className="social"><a href="https://www.facebook.com/pmgmcb" target="_blank"><Facebook/></a><a href="https://www.instagram.com/pizzamasterg" target="_blank"><Instagram/></a><a href="https://youtube.com/@pizzamasterg4184" target="_blank"><Youtube/></a><a href="https://tiktok.com/@PizzaMasterG" target="_blank"><Music2/></a></div><div className="foot-bottom"><span>© {new Date().getFullYear()} Pizza Master G. All rights reserved.</span><span>Order line: +92 370 2090917</span></div></footer>
    {toast&&<div className="toast">{toast}</div>}
    {openCart&&<div className="modal-backdrop" onClick={()=>setOpenCart(false)}><aside className="cart" onClick={e=>e.stopPropagation()}><div className="cart-head"><div><span className="eyebrow">YOUR ORDER</span><h2>Cart</h2></div><button onClick={()=>setOpenCart(false)}><X/></button></div>{!cart.length?<div className="empty"><ShoppingBag size={42}/><h3>Your cart is empty</h3><p>Add a pizza or deal and we'll build the order for you.</p><button className="primary" onClick={()=>setOpenCart(false)}>Browse menu</button></div>:<><div className="cart-items">{cart.map(x=><div className="cart-row" key={x.id}><div><b>{x.name}</b><small>{money(x.price)} each</small></div><div className="qty"><button onClick={()=>change(x.id,-1)}><Minus size={14}/></button><b>{x.qty}</b><button onClick={()=>change(x.id,1)}><Plus size={14}/></button></div><strong>{money(x.price*x.qty)}</strong></div>)}</div><div className="cart-total"><span>Total</span><b>{money(total)}</b></div><form onSubmit={order} className="checkout"><input required placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input required placeholder="Phone number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/><textarea required placeholder="Delivery address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/><select value={form.branch} onChange={e=>setForm({...form,branch:e.target.value})}>{branches.map(b=><option key={b}>{b}</option>)}</select><textarea placeholder="Notes (optional)" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/><button className="primary full"><Send size={17}/> Create order & WhatsApp</button></form></>}</aside></div>}
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);
