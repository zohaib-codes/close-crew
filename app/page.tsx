"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Target,
  TrendingUp,
  Users,
  Zap,
  BarChart3,
  MessageSquare,
  Heart,
  Award,
  Shield,
  Compass,
  Star,
  CheckCircle,
  Home,
  Briefcase,
  Phone,
  UsersIcon,
  Clock,
  Globe,
  Layers,
  PieChart,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"
import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

// Counter animation component
function AnimatedCounter({ end, duration = 1500, isVisible }: { end: number; duration?: number; isVisible: boolean }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) {
      return
    }

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        hasAnimated.current = true
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, isVisible])

  return <span>{count}</span>
}

export default function CloseCrew() {
  const [scrollY, setScrollY] = useState(0)
  const isMobile = useMobile()
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeSection, setActiveSection] = useState("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Intersection observer refs with triggerOnce=true to prevent re-triggering
  const [statsRef, statsVisible] = useIntersectionObserver(0.3, true)
  const [servicesRef, servicesVisible] = useIntersectionObserver(0.1, true)
  const [industriesRef, industriesVisible] = useIntersectionObserver(0.1, true)
  const [processRef, processVisible] = useIntersectionObserver(0.1, true)
  const [valuesRef, valuesVisible] = useIntersectionObserver(0.1, true)
  const [faqRef, faqVisible] = useIntersectionObserver(0.1, true)
  const [calendlyRef, calendlyVisible] = useIntersectionObserver(0.1, true)
  const [crewRef, crewVisible] = useIntersectionObserver(0.1, true)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Track active section
      const sections = ["home", "services", "the-crew"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }

      // Apply parallax effect to refs
      parallaxRefs.current.forEach((ref, index) => {
        if (ref) {
          const speed = 0.05 + index * 0.01
          ref.style.transform = `translateY(${scrollY * speed}px)`
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollY])

  // ===== ADD THE CALENDLY INITIALIZATION HERE =====
  // Place this useEffect hook right after the scroll useEffect
  useEffect(() => {
    const initCalendly = () => {
      if (typeof window !== 'undefined' && (window as any).Calendly) {
        (window as any).Calendly.initInlineWidget({
          url: 'https://calendly.com/zd64811/15-min-call',
          parentElement: document.querySelector('.calendly-inline-widget'),
          prefill: {},
          utm: {}
        });
      }
    };

    // Initialize when component mounts
    initCalendly();

    // Reinitialize when window resizes (for responsiveness)
    window.addEventListener('resize', initCalendly);
    
    return () => window.removeEventListener('resize', initCalendly);
  }, []);



  const services = [
    {
      icon: Target,
      title: "Lead Generation",
      description: "Targeted campaigns that convert",
      features: [
        "Qualified prospect identification",
        "Multi-channel outreach",
        "CRM integration",
        "Performance tracking",
      ],
    },
    {
      icon: TrendingUp,
      title: "Sales Optimization",
      description: "Streamline your sales process",
      features: ["Pipeline analysis", "Conversion rate improvement", "Sales team training", "Process automation"],
    },
    {
      icon: Users,
      title: "Account Management",
      description: "Nurture relationships that last",
      features: ["Client retention strategies", "Upselling opportunities", "Relationship mapping", "Success metrics"],
    },
    {
      icon: Zap,
      title: "Marketing Automation",
      description: "Scale your outreach efforts",
      features: ["Email sequences", "Social media automation", "Lead scoring", "Campaign optimization"],
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Data-driven decision making",
      features: ["Performance dashboards", "ROI tracking", "Market analysis", "Predictive modeling"],
    },
    {
      icon: MessageSquare,
      title: "Communication Strategy",
      description: "Message that resonates",
      features: ["Brand messaging", "Content creation", "Channel strategy", "Audience segmentation"],
    },
  ]

  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description: "We dive deep into your business, understanding your goals, challenges, and market position.",
    },
    {
      number: "02",
      title: "Strategy",
      description: "Custom strategies tailored to your unique needs and market opportunities.",
    },
    {
      number: "03",
      title: "Execution",
      description: "Seamless implementation with our proven methodologies and cutting-edge tools.",
    },
    {
      number: "04",
      title: "Optimization",
      description: "Continuous improvement through data analysis and performance optimization.",
    },
  ]

  const values = [
    { icon: Heart, title: "Passion-Driven", description: "We live and breathe your success" },
    { icon: Award, title: "Excellence First", description: "Quality is never negotiable" },
    { icon: Shield, title: "Trust & Integrity", description: "Your success is our reputation" },
    { icon: Compass, title: "Strategic Vision", description: "Long-term thinking, immediate results" },
    { icon: Star, title: "Innovation Focus", description: "Cutting-edge solutions for modern challenges" },
    { icon: CheckCircle, title: "Results Guaranteed", description: "We deliver what we promise" },
  ]

  const crew = [

  {
      name: "Abdullah",
      role: "The Founder",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Syed Wahaj",
      role: "Co-Founder & CEO",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Noman Azam",
      role: "CTO",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Zohaib Noor",
      role: "CMO",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Ali Qasim",
      role: "Marketing Strategist",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Muawiya Tareen",
      role: "Lead Developer",
      image: "/placeholder.svg?height=150&width=150",
    },
    
  ]

  const stats = [
    { value: 250, suffix: "+", label: "Clients Served" },
    { value: 85, suffix: "%", label: "Conversion Rate" },
    { value: 500, suffix: "+", label: "Projects Completed" },
    { value: 98, suffix: "%", label: "Client Retention" },
  ]

  const industries = [
    { name: "SaaS", icon: Layers },
    { name: "Finance", icon: PieChart },
    { name: "Healthcare", icon: Heart },
    { name: "E-commerce", icon: Globe },
    { name: "Education", icon: Briefcase },
    { name: "Technology", icon: Zap },
  ]

  const faq = [
    {
      question: "How quickly can we see results?",
      answer:
        "Most clients see initial results within 30 days, with significant improvements by the 90-day mark. Our approach focuses on both quick wins and sustainable long-term growth.",
    },
    {
      question: "Do you work with startups?",
      answer:
        "We have specialized packages for startups at different stages, from pre-seed to Series B. Our strategies scale with your growth trajectory.",
    },
    {
      question: "What makes Close Crew different?",
      answer:
        "Our unique combination of data-driven strategies, creative execution, and dedicated account management ensures you get both results and a seamless experience.",
    },
  ]

  const navItems = [
    { name: "Home", icon: Home, href: "#home" },
    { name: "The Crew", icon: UsersIcon, href: "#the-crew" },
    { name: "Services", icon: Briefcase, href: "#services" },
  ]

  return (
    <div className="min-h-screen bg-black text-white font-['Montserrat'] overflow-hidden">
      {/* Parallax Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div
          ref={(el) => (parallaxRefs.current[0] = el)}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent_70%)]"
        ></div>
        <div
          ref={(el) => (parallaxRefs.current[1] = el)}
          className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.1),transparent_70%)]"
        ></div>
        <div
          ref={(el) => (parallaxRefs.current[2] = el)}
          className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.7),transparent)]"
        ></div>
      </div>

      {/* Header - Completely Transparent */}
      <header className="fixed top-0 w-full z-50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-xl font-bold">
              Close<span className="text-orange-500">Crew</span>
            </div>

            {/* Centered Navigation */}
            <nav className="hidden lg:flex items-center bg-white rounded-full px-4 py-2 shadow-lg">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`group px-3 py-2 mx-1 text-sm font-normal transition-all duration-200 hover:bg-orange-500/10 rounded-full flex items-center hover:text-orange-600 ${
                    activeSection === item.href.substring(1) ? "bg-orange-500/20 text-orange-600" : "text-black"
                  }`}
                >
                  <item.icon className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="ml-0 group-hover:ml-2 max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-200 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    {item.name}
                  </span>
                </a>
              ))}

              {/* CTA Button inside nav */}
              <Button 
  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-normal text-sm transition-all duration-200 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] ml-2"
  onClick={() => {
    document.getElementById('calendly-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }}
>
  Let's Talk
</Button>
            </nav>

            {/* Right spacer to balance layout */}
            <div className="w-20"></div>

           {/* Mobile menu button */}
<Button 
  variant="ghost" 
  className="lg:hidden text-white"
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
>
  <Layers className="w-6 h-6" />
</Button>
          </div>
        </div>
      </header>


{/* Mobile Menu */}
{isMobileMenuOpen && (
  <div className="fixed inset-0 z-40 lg:hidden">
    {/* Backdrop */}
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      onClick={() => setIsMobileMenuOpen(false)}
    ></div>
    
    {/* Menu Panel - Reduced size and positioned from top-right */}
    <div className="fixed top-16 right-4 w-48 bg-black/90 backdrop-blur-md border border-gray-800 rounded-lg p-4 shadow-2xl">      
      <nav className="space-y-3">
        {navItems.map((item) => (
          <a key={item.name}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center space-x-3 px-3 py-2 text-white hover:text-orange-500 hover:bg-orange-500/10 rounded-lg transition-all duration-200 text-sm"
          >
            <item.icon className="w-4 h-4 text-orange-500" />
            <span>{item.name}</span>
          </a>
        ))}
        
        <div className="pt-2 border-t border-gray-800">
          <Button 
  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full font-medium transition-all duration-200 text-sm"
  onClick={() => {
    setIsMobileMenuOpen(false);
    document.getElementById('calendly-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }}
>
  Let's Talk
</Button>
        </div>
      </nav>
    </div>
  </div>
)}



{/* Hero Section with Business Team Image - NO WHITE BACKGROUND */}
<section id="home" className="hero-section relative min-h-screen flex items-center overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
  <div
    ref={(el) => (parallaxRefs.current[3] = el)}
    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.4),transparent_70%)]"
  ></div>
  <div
    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.25),transparent_50%)] animate-pulse"
    style={{ animationDuration: "2s" }}
  ></div>

  <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between relative z-20">
    {/* Text Content - Better responsive positioning */}
    <div className="hero-content w-full lg:w-[60%] text-center md:text-left mb-8 sm:mb-12 lg:mb-0 md:pl-8 lg:pl-0">
      <h1 className="hero-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 xl:mb-10 leading-tight animate-fade-in">
        Your Crew to{" "}
        <span className="text-orange-500">
          Close
          <br />
          More
        </span>{" "}
        Deals
      </h1>
      <p className="hero-description text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 lg:mb-10 xl:mb-12 text-gray-300 max-w-2xl mx-auto md:mx-0 lg:mx-0 animate-fade-in-delay">
        We turn strategy into scalable growth
      </p>
      <div className="hero-button-container flex justify-center md:justify-start lg:justify-start">
      <Button 
  className="hero-button bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 sm:px-8 sm:py-4 lg:px-12 lg:py-6 xl:px-16 xl:py-8 rounded-full text-base sm:text-lg lg:text-xl xl:text-2xl font-medium transition-all duration-200 hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] animate-fade-in-delay-2 w-full sm:w-auto max-w-xs md:max-w-none"
  onClick={() => {
    document.getElementById('calendly-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }}
>
  Let's Talk Business
</Button>
      </div>
    </div>

    {/* Business Team Image - Better responsive positioning */}
    <div className="w-full lg:w-[40%] flex justify-center lg:justify-end mt-8 lg:mt-0">
      <Image
        src='https://i.postimg.cc/rmPJS3zN/Untitled-design-2.webp'
        alt="Business team celebrating success"
        width={600}
        height={600}
        className="object-contain w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px]"
        style={{
          filter:
            "drop-shadow(0 10px 30px rgba(0,0,0,0.5)) drop-shadow(0 0 15px rgba(249,115,22,0.2)) brightness(1.05)",
        }}
        priority
      />
    </div>
  </div>
</section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-black/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-500 ${
                  statsVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-bold text-orange-500 mb-2">
                  <AnimatedCounter end={stat.value} isVisible={statsVisible} />
                  {stat.suffix}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-20 bg-black/60 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-500 ${
              servicesVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Services</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Comprehensive solutions to accelerate your business growth
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`group hover:shadow-2xl transition-all duration-500 border border-gray-800 hover:border-orange-500 bg-black/40 backdrop-blur-sm transform hover:-translate-y-2 ${
                  servicesVisible
                    ? "translate-x-0 opacity-100"
                    : index % 2 === 0
                      ? "-translate-x-12 opacity-0"
                      : "translate-x-12 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <service.icon className="w-10 h-10 text-orange-500 group-hover:scale-110 transition-transform duration-200" />
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-white/90">{service.title}</h3>
                  <p className="text-gray-400 mb-6 text-sm">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs text-gray-300">
                        <CheckCircle className="w-3 h-3 text-orange-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section ref={industriesRef} className="py-20 bg-black/70 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-500 ${
              industriesVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Industries We Serve</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Specialized expertise across diverse business sectors
            </p>
          </div>

         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {industries.map((industry, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center p-6 border border-gray-800 rounded-lg hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] ${
                  industriesVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                <industry.icon className="w-10 h-10 text-orange-500 mb-3" />
                <span className="text-sm font-medium">{industry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* Calendly Section - Replace your existing Calendly section with this */}
<section id="calendly-section" ref={calendlyRef} className="py-20 bg-black/60 backdrop-blur-sm relative z-10">
  <div className="container mx-auto px-6">
    <div className="max-w-7xl mx-auto">
      
      {/* Desktop Layout - Side by Side */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Side - Calendly Widget */}
        <div 
          className={`transition-all duration-500 ${
            calendlyVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          {/* Calendly inline widget embed */}
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/zd64811/15-min-call"
            style={{ minWidth: '320px', height: '700px' }}
          ></div>
        </div>

        {/* Right Side - Content */}
        <div 
          className={`space-y-8 transition-all duration-500 ${
            calendlyVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          
          {/* Profile Image Circle */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-40 h-40 rounded-full border-4 border-orange-500 overflow-hidden p-1 shadow-[0_0_15px_rgba(249,115,22,0.6)] ml-6">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Syed Wahaj"
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              SCHEDULE YOUR CALL WITH
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-orange-500 mb-1">
              SYED WAHAJ
            </h3>
            <p className="text-xl md:text-2xl font-semibold text-white">
              Free 15-Minute Demo Call
            </p>
          </div>

          {/* Description Paragraph */}
          <div className="text-center lg:text-left">
            <p className="text-gray-300 text-base leading-relaxed">
              By the end of this Audit call, you will have a clear understanding of the next steps you can take for your business to start generating consistent and reliable results. Find a time on Wahaj's calendar to schedule your call today and we look forward to speaking to you soon!
            </p>
          </div>

          {/* Perfect For Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-orange-500 text-center lg:text-left">
              THIS AUDIT CALL IS PERFECT FOR:
            </h4>
            
            <ul className="space-y-3">
              <li className="flex items-start text-gray-300 text-sm">
                <CheckCircle className="w-4 h-4 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                <span>Businesses looking to convert their current website into a <span className="font-semibold text-white">high quality & streamlined funnel format.</span></span>
              </li>
              <li className="flex items-start text-gray-300 text-sm">
                <CheckCircle className="w-4 h-4 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                <span>Businesses looking to take their offline business <span className="font-semibold text-white">online</span></span>
              </li>
              <li className="flex items-start text-gray-300 text-sm">
                <CheckCircle className="w-4 h-4 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                <span>Businesses looking to understand their <span className="font-semibold text-white">increased revenue potential</span> with funnels & conversion rate optimization.</span>
              </li>
              <li className="flex items-start text-gray-300 text-sm">
                <CheckCircle className="w-4 h-4 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                <span>Businesses looking to <span className="font-semibold text-white">maximize their conversion rates</span> & <span className="font-semibold text-white">average order value.</span></span>
              </li>
              <li className="flex items-start text-gray-300 text-sm">
                <CheckCircle className="w-4 h-4 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                <span>Businesses looking for a reliable agency that can <span className="font-semibold text-white">make their company a priority.</span></span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Mobile & Tablet Layout - Stacked Vertically */}
      <div className="lg:hidden space-y-8">
        
        {/* Profile Image */}
        <div 
          className={`flex justify-center transition-all duration-500 ${
            calendlyVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-orange-500 overflow-hidden p-1 shadow-[0_0_10px_rgba(249,115,22,0.6)]">
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="Syed Wahaj"
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Headings */}
        <div 
          className={`text-center space-y-2 transition-all duration-500 ${
            calendlyVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            SCHEDULE YOUR CALL WITH
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-orange-500">
            SYED WAHAJ
          </h3>
          <p className="text-lg sm:text-xl font-semibold text-white">
            Free 15-Minute Demo Call
          </p>
        </div>

        {/* Description */}
        <div 
          className={`text-center px-4 transition-all duration-500 ${
            calendlyVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            By the end of this Audit call, you will have a clear understanding of the next steps you can take for your business to start generating consistent and reliable results online with Funnels & Paid Advertising.
          </p>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-4">
            Find a time on Wahaj's calendar to schedule your call today and we look forward to speaking to you soon!
          </p>
        </div>

        {/* Calendly Widget */}
        <div 
          className={`transition-all duration-500 ${
            calendlyVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div 
            className="calendly-inline-widget mx-auto" 
            data-url="https://calendly.com/zd64811/15-min-call"
            style={{ minWidth: '100%', height: '500px' }}
          ></div>
        </div>

        {/* Perfect For Section */}
        <div 
          className={`space-y-4 px-4 transition-all duration-500 ${
            calendlyVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <h4 className="text-lg sm:text-xl font-bold text-orange-500 text-center">
            THIS AUDIT CALL IS PERFECT FOR:
          </h4>
          
          <ul className="space-y-3 max-w-2xl mx-auto">
            <li className="flex items-start text-gray-300 text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 text-orange-500 mr-3 mt-1 flex-shrink-0" />
              <span>Businesses looking to convert their current website into a <span className="font-semibold text-white">high quality & streamlined funnel format.</span></span>
            </li>
            <li className="flex items-start text-gray-300 text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 text-orange-500 mr-3 mt-1 flex-shrink-0" />
              <span>Businesses looking to take their offline business <span className="font-semibold text-white">online</span></span>
            </li>
            <li className="flex items-start text-gray-300 text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 text-orange-500 mr-3 mt-1 flex-shrink-0" />
              <span>Businesses looking to understand their <span className="font-semibold text-white">increased revenue potential</span> with funnels & conversion rate optimization.</span>
            </li>
            <li className="flex items-start text-gray-300 text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 text-orange-500 mr-3 mt-1 flex-shrink-0" />
              <span>Businesses looking to <span className="font-semibold text-white">maximize their conversion rates</span> & <span className="font-semibold text-white">average order value.</span></span>
            </li>
            <li className="flex items-start text-gray-300 text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 text-orange-500 mr-3 mt-1 flex-shrink-0" />
              <span>Businesses looking for a reliable agency that can <span className="font-semibold text-white">make their company a priority.</span></span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</section>


      {/* Process Section */}
      <section ref={processRef} className="py-20 bg-black/60 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-500 ${
              processVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Process</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A proven methodology that delivers consistent results
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-start mb-12 last:mb-0 group transform hover:-translate-x-2 transition-all duration-300 ${
                  processVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex-shrink-0 mr-6">
                  <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-black font-medium text-lg group-hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all duration-200">
                    {step.number}
                  </div>
                  {index < processSteps.length - 1 && <div className="w-0.5 h-16 bg-orange-500/30 mx-auto mt-4"></div>}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium mb-2 text-orange-500">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Drives Us Section */}
      <section ref={valuesRef} className="py-20 bg-black/70 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-500 ${
              valuesVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">What Drives Us</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">Our core values that move us forward</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <Card
                key={index}
                className={`bg-black/40 backdrop-blur-sm border border-gray-800 hover:border-orange-500 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transform hover:scale-105 ${
                  valuesVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-5 flex items-center space-x-4">
                  <value.icon className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <h3 className="text-base font-medium text-white mb-1">{value.title}</h3>
                    <p className="text-gray-400 text-xs">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-20 bg-black/60 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-500 ${
              faqVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">Common questions about our services and approach</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faq.map((item, index) => (
              <Card
                key={index}
                className={`bg-black/40 backdrop-blur-sm border border-gray-800 hover:border-orange-500 transition-all duration-300 ${
                  faqVisible
                    ? "translate-x-0 opacity-100"
                    : index % 2 === 0
                      ? "-translate-x-8 opacity-0"
                      : "translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-orange-500 mb-3">{item.question}</h3>
                  <p className="text-gray-300 text-sm">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Crew Section */}
      <section id="the-crew" ref={crewRef} className="py-20 bg-black/70 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-500 ${
              crewVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Meet the Crew</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">The experts behind the results</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {crew.map((member, index) => (
              <div
                key={index}
                className={`flex flex-col items-center transition-all duration-500 ${
                  crewVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-orange-500 overflow-hidden mb-3 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=150&width=150"
                      alt={member.name}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-sm md:text-base font-medium text-white">{member.name}</h3>
                <p className="text-orange-500 font-medium text-xs">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black/80 backdrop-blur-sm relative z-10">
        <div
          ref={(el) => (parallaxRefs.current[4] = el)}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.2),transparent_70%)]"
        ></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            Ready to handle business the <span className="text-orange-500">right way?</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can accelerate your growth and close more deals together.
          </p>
          <Button 
  className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] hover:scale-105"
  onClick={() => {
    document.getElementById('calendly-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }}
>
  Let's Talk Business
</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black/90 backdrop-blur-sm border-t border-gray-800 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            <div className="space-y-4">
              <div className="text-2xl font-bold mb-4">
                Close<span className="text-orange-500">Crew</span>
              </div>
              <p className="text-gray-400 text-sm">
                We're a team of marketing and sales experts dedicated to helping businesses scale through strategic
                growth initiatives and data-driven approaches.
              </p>
              <div className="flex space-x-4 pt-4">             
                
                
                <a 
  href="https://www.linkedin.com/company/closecrewmarketing/" 
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-400 hover:text-orange-500 transition-colors"
>
  <Linkedin className="w-5 h-5" />
</a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-orange-500 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-orange-500 transition-colors">
                    Services
                  </a>
                </li>
               
                <li>
                  <a href="#the-crew" className="text-gray-400 hover:text-orange-500 transition-colors">
                    The Crew
                  </a>
                </li>
                 <li>
                  <a href="#services" className="text-gray-400 hover:text-orange-500 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-orange-500 transition-colors">
                    Terms of Services
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a  className="text-gray-400 hover:text-orange-500 transition-colors">
                    Lead Generation
                  </a>
                </li>
                <li>
                  <a  className="text-gray-400 hover:text-orange-500 transition-colors">
                    Sales Optimization
                  </a>
                </li>
                <li>
                  <a  className="text-gray-400 hover:text-orange-500 transition-colors">
                    Account Management
                  </a>
                </li>
                <li>
                  <a  className="text-gray-400 hover:text-orange-500 transition-colors">
                    Marketing Automation
                  </a>
                </li>
                <li>
                  <a  className="text-gray-400 hover:text-orange-500 transition-colors">
                    Analytics & Insights
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 text-orange-500 mr-2 mt-1" />
                  <span className="text-gray-400">
                    Lake Forest Drive, Round Round
                    <br />
                    Texas, 78665 USA
                  </span>
                </li>
               
                <li className="flex items-center">
                  <Mail className="w-4 h-4 text-orange-500 mr-2" />
                  <span className="text-gray-400">contact@closecrewmarketing.com</span>
                </li>
               
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p className="text-sm">
              &copy; 2025 Close Crew. All rights reserved. | Powered by CodeLixi{" "} 
            </p>
            
          </div>
        </div>
      </footer>
    </div>
  )
}
