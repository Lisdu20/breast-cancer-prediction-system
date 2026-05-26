import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Shield, ChevronRight, Heart, Calendar, Users, TrendingDown, BookOpen, Star, ArrowRight } from 'lucide-react'
import Button from '../components/Button'
import ImageWithFallback from '../components/ImageWithFallback'

const stats = [
  { value: '1 de 8', label: 'mujeres desarrollará cáncer de mama' },
  { value: '98%', label: 'tasa de supervivencia con detección temprana' },
  { value: '29,000', label: 'casos nuevos anuales en México' },
  { value: '40+', label: 'años, edad recomendada para mastografía' },
]

const features = [
  { icon: Heart, title: 'Evaluación personalizada', desc: 'Basada en tus factores de riesgo individuales' },
  { icon: Shield, title: 'Prevención informada', desc: 'Conoce las medidas preventivas adecuadas para ti' },
  { icon: TrendingDown, title: 'Seguimiento continuo', desc: 'Monitorea los cambios en tu nivel de riesgo' },
  { icon: BookOpen, title: 'Educación permanente', desc: 'Accede a información actualizada y confiable' },
]

const lifestyleItems = [
  { img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=256&fit=crop', title: 'Actividad física regular', desc: '30 minutos de ejercicio al día' },
  { img: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&h=256&fit=crop', title: 'Alimentación balanceada', desc: 'Rica en frutas, verduras y fibra' },
  { img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=256&fit=crop', title: 'Manejo del estrés', desc: 'Meditación y autocuidado' },
]

const testimonials = [
  { text: 'Gracias a esta herramienta pude tomar acción temprana. Hoy estoy saludable y en control.', author: '— María G.' },
  { text: 'La información clara y las recomendaciones personalizadas me dieron tranquilidad.', author: '— Ana L.' },
  { text: 'Finalmente una plataforma que aborda la prevención con empatía y profesionalismo.', author: '— Carmen R.' },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
      {children}
    </h2>
  )
}

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1579684288382-1a5e6e8e7b0c?w=1920&h=1080&fit=crop"
            alt="Médica profesional"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight max-w-3xl">
              Sistema Inteligente de Predicción de Riesgo de Cáncer de Mama
            </h1>
            <p className="mt-6 text-xl text-white/80 max-w-xl">
              Evalúa tu riesgo de manera informada y toma el control de tu salud con nuestra herramienta basada en inteligencia artificial.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button onClick={() => navigate('/welcome')}>
                Comenzar ahora
              </Button>
              <Button variant="outline" ariaLabel="Conocer más sobre el sistema">
                <a href="#info" className="text-white no-underline">Conocer más</a>
              </Button>
            </div>
            <div className="mt-8 flex items-start gap-3 bg-black/40 backdrop-blur-sm rounded-xl p-4 max-w-lg border border-white/10">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-white/70">
                Esta herramienta no sustituye el diagnóstico médico profesional. Siempre consulta a un especialista.
              </p>
            </div>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronRight className="w-6 h-6 text-white/60 rotate-90" />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-muted/30 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-heading font-bold text-primary">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Info Visual */}
      <section id="info" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=500&fit=crop"
                alt="Consulta médica"
                className="rounded-2xl shadow-lg w-full h-[500px]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-10"
            >
              {[
                { icon: Heart, title: 'Prevención es salud', desc: 'La detección temprana salva vidas' },
                { icon: Calendar, title: 'Detección oportuna', desc: 'Realiza evaluaciones periódicas' },
                { icon: Users, title: 'Cuidado personalizado', desc: 'Recomendaciones adaptadas a ti' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle>¿Por qué usar nuestro sistema?</SectionTitle>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{feat.title}</h3>
                    <p className="text-muted-foreground">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop"
                alt="Estilo de vida saludable"
                className="rounded-2xl shadow-lg w-full h-[500px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lifestyle */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle>Un estilo de vida saludable hace la diferencia</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {lifestyleItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="rounded-2xl overflow-hidden shadow-sm border border-border bg-card"
              >
                <ImageWithFallback
                  src={item.img}
                  alt={item.title}
                  className="w-full h-64"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground mt-2">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle>Lo que dicen nuestras usuarias</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_) => (
                    <Star key={Math.random()} className="w-5 h-5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="italic text-foreground/80 leading-relaxed">"{t.text}"</p>
                <p className="mt-4 font-semibold text-primary">{t.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Tu salud está en tus manos
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Comienza tu evaluación y descubre cómo puedes reducir tu riesgo.
            </p>
            <Button onClick={() => navigate('/welcome')} ariaLabel="Comenzar mi evaluación">
              Comenzar mi evaluación <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-lg font-heading font-semibold text-foreground">
            Sistema Inteligente de Predicción de Riesgo de Cáncer de Mama
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Esta herramienta no sustituye el diagnóstico médico profesional. Siempre consulta a un especialista.
          </p>
        </div>
      </footer>
    </div>
  )
}
