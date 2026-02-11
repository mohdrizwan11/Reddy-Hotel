import { Phone, Mail, MapPin, MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import logo from "@/assets/reddy-hotel-logo.jpeg";
import chickenRiceImg from "@/assets/chicken-rice.jpg";
import eggRiceImg from "@/assets/egg-rice.jpg";
import doubleEggRiceImg from "@/assets/double-egg-rice.jpg";
import gobiRiceImg from "@/assets/gobi-rice.jpg";
import chickenKababImg from "@/assets/chicken-kabab.jpg";
import chickenNoodlesImg from "@/assets/chicken-noodles.jpg";
import vegNoodlesImg from "@/assets/veg-noodles.jpg";
import eggNoodlesImg from "@/assets/egg-noodles.jpg";

const WHATSAPP_NUMBER = "919100284142";
const DEFAULT_ORDER_MESSAGE =
  "Welcome to Reddy Hotel, Feeling Hungry, Order now the delicious food at affordable price and show the menu along with the prices";

const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const orderLink = (item: string, price: string) =>
  whatsappLink(`${DEFAULT_ORDER_MESSAGE}. Order: ${item} (₹${price}).`);

const contactWhatsappLink = (num: string) =>
  num === "9100284142"
    ? `https://wa.me/91${num}?text=${encodeURIComponent(DEFAULT_ORDER_MESSAGE)}`
    : `https://wa.me/91${num}?text=${encodeURIComponent(
        "Hi! I'd like to enquire about Reddy Hotel."
      )}`;

type MenuItem = { name: string; price: string; image: string };

const menuSections: { category: string; emoji: string; items: MenuItem[] }[] = [
  {
    category: "Starters",
    emoji: "🍗",
    items: [
      { name: "Chicken Kabab (per kg)", price: "350", image: chickenKababImg },
      { name: "Chicken Kabab (half kg)", price: "180", image: chickenKababImg },
    ],
  },
  {
    category: "Fried Rice",
    emoji: "🍚",
    items: [
      { name: "Chicken Fried Rice", price: "110", image: chickenRiceImg },
      { name: "Egg Fried Rice", price: "60", image: eggRiceImg },
      { name: "Double Egg Fried Rice", price: "70", image: doubleEggRiceImg },
      { name: "Gobi Fried Rice", price: "60", image: gobiRiceImg },
    ],
  },
  {
    category: "Noodles",
    emoji: "🍜",
    items: [
      { name: "Chicken Noodles", price: "100", image: chickenNoodlesImg },
      { name: "Veg Noodles", price: "50", image: vegNoodlesImg },
      { name: "Egg Noodles", price: "60", image: eggNoodlesImg },
    ],
  },
];

const DishCard = ({ item }: { item: MenuItem }) => (
  <div className="group rounded-2xl overflow-hidden bg-card shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="aspect-square overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
    </div>
    <div className="p-4 text-center">
      <h4 className="font-semibold text-foreground text-lg mb-1">{item.name}</h4>
      <p className="text-primary font-bold text-xl mb-3">₹{item.price}</p>
      <a
        href={orderLink(item.name, item.price)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          size="sm"
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          Order Now
        </Button>
      </a>
    </div>
  </div>
);

const CategorySection = ({
  category,
  emoji,
  items,
  index,
}: {
  category: string;
  emoji: string;
  items: MenuItem[];
  index: number;
}) => (
  <section
    id={category.toLowerCase().replace(/\s+/g, "-")}
    className="min-h-screen flex flex-col justify-center py-16 px-4"
  >
    <div className="max-w-6xl mx-auto w-full">
      <FadeInOnScroll>
        <div className="text-center mb-10">
          <span className="text-5xl mb-3 block">{emoji}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-2">{category}</h2>
          <div className="w-20 h-1 bg-primary/40 mx-auto rounded-full" />
        </div>
      </FadeInOnScroll>

      <div
        className={`grid gap-6 ${
          items.length === 1
            ? "max-w-sm mx-auto"
            : items.length === 2
            ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
            : category === "Noodles"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {items.map((item, i) => (
          <FadeInOnScroll key={item.name} delay={i * 0.1}>
            <DishCard item={item} />
          </FadeInOnScroll>
        ))}
      </div>
    </div>
  </section>
);

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background scroll-smooth page-bg">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
          <a href="#" className="flex items-center gap-2">
            <img src={logo} alt="Reddy Hotel" className="w-9 h-9 rounded-full object-cover" />
            <span className="font-bold text-lg text-primary font-['Playfair_Display']">
              Reddy Hotel
            </span>
          </a>
          <div className="flex gap-3 sm:gap-5 text-sm items-center">
            {/* Desktop Menu Links */}
            {menuSections.map((s) => (
              <a
                key={s.category}
                href={`#${s.category.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-muted-foreground hover:text-primary transition-colors hidden sm:inline"
              >
                {s.category}
              </a>
            ))}
            
            {/* Mobile Collapsible Menu */}
            <div className="sm:hidden">
              <Collapsible open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <CollapsibleTrigger asChild>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                    Menu
                    <ChevronDown 
                      className={`h-3 w-3 transition-transform duration-200 ${
                        isMenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="absolute right-4 top-16 bg-background border border-border rounded-lg shadow-lg p-2 min-w-[150px]">
                  <div className="flex flex-col gap-1">
                    {[
                      { name: 'Starters', id: 'starters' },
                      { name: 'Fried Rice', id: 'fried-rice' },
                      { name: 'Noodles', id: 'noodles' }
                    ].map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="px-3 py-2 rounded hover:bg-primary/10 transition-all text-foreground text-sm"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden py-14 sm:py-20 px-4">
        <div className="absolute -top-32 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 animate-fade-in-scale">
              <img
                src={logo}
                alt="Reddy Hotel logo"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-contain bg-white shadow-2xl border-2 border-primary/40 p-2"
              />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary animate-fade-up">
                Reddy Hotel
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-foreground/90 mb-4 animate-fade-up stagger-1 max-w-xl mx-auto">
              Delicious food, Served with love
            </p>
            <div className="flex flex-wrap gap-2 justify-center animate-fade-up stagger-2">
              {["Chicken Fried Rice", "Chicken Kabab", "Egg Noodles", "Gobi Fried Rice"].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full bg-card/80 border border-border text-sm text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 animate-fade-up stagger-2 flex flex-col items-center gap-3">
              <Badge className="bg-primary text-primary-foreground text-sm px-4 py-1.5">
                 Fresh Cooking + Fast Delivery
              </Badge>
              <Badge className="bg-green-600 text-white text-sm px-4 py-1.5 border-0">
                 🚚 Delivery available on orders ₹200 or above
              </Badge>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center animate-fade-up stagger-3">
              <Collapsible open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <CollapsibleTrigger asChild>
                  <Button size="lg" className="gap-2">
                    View Menu
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isMenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="flex flex-col gap-2 max-w-xs mx-auto">
                    {[
                      { name: 'Starters', id: 'starters' },
                      { name: 'Fried Rice', id: 'fried-rice' },
                      { name: 'Noodles', id: 'noodles' }
                    ].map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="px-4 py-2 rounded-lg bg-card border border-border hover:bg-primary/10 hover:border-primary/40 transition-all text-center font-medium text-foreground"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                asChild
              >
                <a href={whatsappLink(DEFAULT_ORDER_MESSAGE)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  Order on WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
            {[chickenRiceImg, chickenKababImg, chickenNoodlesImg, eggNoodlesImg].map((img, i) => (
              <div
                key={img}
                className={`rounded-3xl overflow-hidden shadow-xl border border-border bg-card/80 animate-fade-in-scale ${
                  i % 2 === 0 ? "float-slow" : "float-mid"
                }`}
              >
                <img src={img} alt="Reddy Hotel dish" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Menu Sections — each category is a full page */}
      <div id="menu">
        {menuSections.map((section, i) => (
          <CategorySection
            key={section.category}
            category={section.category}
            emoji={section.emoji}
            items={section.items}
            index={i}
          />
        ))}
      </div>

      {/* Contact */}
      <section id="contact" className="bg-card py-16 min-h-[60vh] flex items-center">
        <div className="max-w-3xl mx-auto px-4 text-center w-full">
          <FadeInOnScroll>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-8">Contact Us</h2>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.1}>
            <p className="text-xl font-semibold text-foreground mb-6">Mallela Mahesh Reddy</p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.2}>
            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto text-left">
              {["9100284142", "9182870092"].map((num) => (
                <div key={num} className="flex items-center gap-3 bg-background rounded-xl p-3">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <a href={`tel:${num}`} className="text-foreground hover:text-primary transition-colors">
                    {num}
                  </a>
                  <a
                    href={contactWhatsappLink(num)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto"
                  >
                    <MessageCircle className="h-4 w-4 text-accent" />
                  </a>
                </div>
              ))}

              <div className="flex items-center gap-3 sm:col-span-2 bg-background rounded-xl p-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="mailto:mallelamahesh328223@gmail.com"
                  className="text-foreground hover:text-primary transition-colors break-all text-sm"
                >
                  mallelamahesh328223@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2 bg-background rounded-xl p-3">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground text-sm">
                  Palasamudram, Gorantla Mandal, Sri Sathya Sai District
                </span>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 text-center">
        <p className="text-lg font-['Playfair_Display'] mb-2">
          Thank you for choosing Reddy Hotel!
        </p>
        <div className="flex gap-4 justify-center text-sm opacity-80">
          <a href="#starters" className="hover:opacity-100 transition-opacity">Menu</a>
          <a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappLink(DEFAULT_ORDER_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-accent text-accent-foreground rounded-full p-4 shadow-xl hover:scale-110 transition-transform animate-bounce"
        style={{ animationDuration: "2s", animationIterationCount: 3 }}
        aria-label="Order on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
};

export default Index;
