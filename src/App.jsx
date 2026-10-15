import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Badge, Button, TextInput, Textarea, Alert, SegmentedControl, Tooltip } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import * as Accordion from '@radix-ui/react-accordion'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Tilt from 'react-parallax-tilt'
import emailjs from '@emailjs/browser'
import { ArrowUpRight, ArrowRight, ArrowDown, Code2, Database, Cpu, Layers, Braces, Mail, MessageCircle, MapPin, Menu, X, Plus, ChevronDown, GraduationCap, BadgeCheck, ImagePlus, Pause, Play, ExternalLink, Check, Sparkles } from 'lucide-react'
import { biography, certificates, education, experiences, interests, profile, projects, skillGroups } from './content'
import { assetUrl, sortedProjects, text, validHttpUrl, validateContact } from './utils'
import { CursorGlow, Reveal } from './components/Interactions'
import { Github, Linkedin } from './components/BrandIcons'
import './App.css'

const Scene = lazy(() => import('./components/Scene'))
const pages = ['inicio', 'sobre', 'projetos', 'experiencias', 'contato']
const navLabels = { pt: ['Início', 'Sobre mim', 'Projetos', 'Experiências', 'Contato'], en: ['Home', 'About me', 'Projects', 'Experience', 'Contact'] }
function currentPage() { const slug = window.location.hash.replace('#', ''); return pages.includes(slug) ? slug : 'inicio' }
function getStored(key, fallback) { try { return localStorage.getItem(key) ?? fallback } catch { return fallback } }
function External({ href, children, className = '' }) { return validHttpUrl(href) ? <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}</a> : null }
function Tags({ items }) { return <div className="tags">{items.map((item) => <Badge key={item} variant="outline" radius="sm">{item}</Badge>)}</div> }
function SectionHeading({ index, eyebrow, title, children }) { return <div className="section-heading"><div><div className="eyebrow"><span>{index}</span>{eyebrow}</div><h2>{title}</h2></div>{children}</div> }
function PageHeading({ index, label, title, description }) { return <header className="page-heading"><div className="eyebrow"><span>{index}</span>{label}</div><h1>{title}</h1><p>{description}</p></header> }

function ProjectCard({ project, language, disabled }) {
  const pt = language === 'pt'
  const [broken, setBroken] = useState(false)
  const validDate = !Number.isNaN(Date.parse(project.date))
  return <Tilt tiltEnable={!disabled} tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.01} transitionSpeed={1500}>
    <article className="project-card">
      <div className="project-image">{project.image && !broken ? <img src={assetUrl(project.image)} alt={text(project.title, language)} loading="lazy" onError={() => setBroken(true)} /> : <div className="empty-image"><ImagePlus size={35} /><span>{pt ? 'Imagem/GIF a adicionar' : 'Image/GIF to add'}</span></div>}</div>
      <div className="project-body"><span className="mono small">{validDate ? new Intl.DateTimeFormat(pt ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(project.date)) : (pt ? 'Data a adicionar' : 'Date to add')}</span><h3>{text(project.title, language)}</h3><p>{text(project.description, language)}</p><Tags items={project.technologies ?? []} /><div className="project-links">{validHttpUrl(project.repository) ? <External href={project.repository}><Github size={16} />{pt ? 'Repositório' : 'Repository'}<ArrowUpRight size={16} /></External> : <span className="muted">{pt ? 'Repositório a adicionar' : 'Repository to add'}</span>}<External href={project.live}>{pt ? 'Ver projeto' : 'Live project'}<ArrowUpRight size={16} /></External></div></div>
    </article>
  </Tilt>
}

function Home({ language, disabled }) {
  const pt = language === 'pt'
  const [photoFailed, setPhotoFailed] = useState(false)
  const icons = [Code2, Braces, Database, Cpu, Layers]
  const featured = sortedProjects(projects).filter((project) => project.featured).slice(0, 2)
  const show = featured.length ? featured : sortedProjects(projects).slice(0, 2)
  return <>
    <section className="hero">
      <Reveal disabled={disabled} className="hero-copy">
        <div className="eyebrow"><span className="status-dot" />{pt ? 'ENGENHARIA DE SOFTWARE · PUC MINAS' : 'SOFTWARE ENGINEERING · PUC MINAS'}</div>
        <h1>Matheus<br /><span>Coelho<span className="name-dot">.</span></span></h1>
        
<div className="hero-role">
  Full Stack <span>/</span> {pt ? 'IA & Automação' : 'AI & Automation'} <span>/</span> {pt ? 'Planejamento & Gestão de Projetos' : 'Project Planning & Management'}
</div>

        
<p>
  {pt
    ? 'Sou estudante de Engenharia de Software, com formação técnica e experiência em desenvolvimento de sistemas, automação e integração de tecnologias.'
    : 'I am a Software Engineering student with a technical background and experience in systems development, automation, and technology integration.'}
</p>

        <div className="hero-actions"><Button component="a" href="#projetos" size="lg" rightSection={<ArrowUpRight size={18} />}>{pt ? 'Explorar projetos' : 'Explore projects'}</Button><a className="text-link" href="#sobre">{pt ? 'Um pouco sobre mim' : 'A little about me'}<ArrowRight size={17} /></a></div>
        <div className="hero-footnote"><MapPin size={14} />{profile.city}<span className="hairline" />{pt ? 'Aprendizado em movimento' : 'Always learning'}</div>
      </Reveal>
      <Reveal disabled={disabled} delay={0.1} className="hero-visual">
        <div className="scene-top"><span className="mono">MC / INTERACTIVE LAB</span><span className="scene-dot" /></div>
        <Suspense fallback={<div className="scene-fallback"><div /><span>MC</span></div>}><Scene paused={disabled} /></Suspense>
        <div className="floating-tag tag-one"><Braces size={15} />&lt;developer /&gt;</div><div className="floating-tag tag-two"><Database size={14} />{pt ? 'dados + ideias' : 'data + ideas'}</div>
        <div className="scene-bottom"><span>{disabled ? (pt ? 'Cena 3D · animações pausadas' : '3D scene · animations paused') : (pt ? 'Mova o cursor. Clique no núcleo.' : 'Move the cursor. Click the core.')}</span><span className="mono">01 / 3D</span></div>
      </Reveal>
    </section>
    
<div className="discipline-strip" aria-label={pt ? 'Áreas de interesse' : 'Areas of interest'}>
  <span>FULL STACK</span>
  <Plus />
  <span>{pt ? 'INTELIGÊNCIA ARTIFICIAL' : 'ARTIFICIAL INTELLIGENCE'}</span>
  <Plus />
  <span>{pt ? 'AUTOMAÇÃO' : 'AUTOMATION'}</span>
  <Plus />
  <span>{pt ? 'PLANEJAMENTO DE PROJETOS' : 'PROJECT PLANNING'}</span>
  <Plus />
  <span>{pt ? 'GESTÃO DE PROJETOS' : 'PROJECT MANAGEMENT'}</span>
</div>

    <section className="section home-about">
      <Reveal disabled={disabled}><SectionHeading index="01" eyebrow={pt ? 'QUEM SOU' : 'WHO I AM'} title={pt ? 'Tecnologia, com contexto.' : 'Technology, with context.'} /></Reveal>
      <div className="about-preview-grid"><Reveal disabled={disabled} className="about-preview-copy"><p>{pt ? 'Minha base veio do COTEMIG. Na PUC Minas, aprofundo programação, arquitetura e desenvolvimento de software. Fora da sala de aula, conheci a automação de atendimento e a rotina de equipes multiculturais.' : 'My foundation started at COTEMIG. At PUC Minas, I’m expanding my knowledge of programming, architecture, and software development. Beyond the classroom, I’ve explored customer service automation and multicultural teamwork.'}</p><a href="#sobre" className="text-link">{pt ? 'Conheça minha trajetória' : 'Discover my story'}<ArrowUpRight size={18} /></a></Reveal>
      <Reveal disabled={disabled} className="profile-note"><div className="profile-avatar">{profile.photo && !photoFailed ? <img src={assetUrl(profile.photo)} alt={profile.name} onError={() => setPhotoFailed(true)} /> : <span>MC</span>}</div><div><strong>{profile.name}</strong><span>{pt ? 'Estudante & desenvolvedor em formação' : 'Student & developer in training'}</span><small>{profile.photo && !photoFailed ? 'PUC Minas · COTEMIG' : (pt ? 'Espaço reservado para sua foto' : 'Space reserved for your photo')}</small></div></Reveal></div>
      <div className="interest-grid">{interests.map((interest, i) => { const Icon = icons[i]; return <Reveal key={i} disabled={disabled} delay={i * 0.04}><div className="interest-card"><Icon size={24} strokeWidth={1.4} /><h3>{text(interest.title, language)}</h3><p>{text(interest.description, language)}</p></div></Reveal> })}</div>
    </section>
    <section className="section projects-preview"><Reveal disabled={disabled}><SectionHeading index="02" eyebrow={pt ? 'DO CÓDIGO À PRÁTICA' : 'FROM CODE TO PRACTICE'} title={pt ? 'Projetos em construção.' : 'Projects in the making.'}><a href="#projetos" className="text-link">{pt ? 'Ver todos' : 'View all'}<ArrowUpRight size={18} /></a></SectionHeading></Reveal><div className="project-grid">{show.length ? show.map((project) => <Reveal key={project.id} disabled={disabled}><ProjectCard project={project} language={language} disabled={disabled} /></Reveal>) : <p>{pt ? 'Projetos em breve.' : 'Projects coming soon.'}</p>}</div></section>
    <section className="section"><Reveal disabled={disabled}><SectionHeading index="03" eyebrow={pt ? 'ALÉM DA SALA DE AULA' : 'BEYOND THE CLASSROOM'} title={pt ? 'Experiências que somam.' : 'Experience that adds up.'}><a href="#experiencias" className="text-link">{pt ? 'Trajetória completa' : 'Full journey'}<ArrowUpRight size={18} /></a></SectionHeading></Reveal><div className="experience-preview">{experiences.map((experience) => <Reveal key={experience.id} disabled={disabled}><a href="#experiencias" className="experience-row"><span className="company-mark">{experience.initials}</span><div><h3>{experience.company}</h3><p>{text(experience.role, language)}</p></div><span className="mono experience-date">{text(experience.date, language)}</span><ArrowUpRight size={22} /></a></Reveal>)}</div></section>
    <ContactBanner language={language} disabled={disabled} />
  </>
}

function About({ language, disabled }) {
  const pt = language === 'pt'
  const [failed, setFailed] = useState(false)
  return <>
    <PageHeading index="01" label={pt ? 'SOBRE MIM' : 'ABOUT ME'} title={pt ? 'Uma trajetória em evolução.' : 'A journey in progress.'} description={pt ? 'Formação técnica, experiências práticas e vontade de entender como as coisas funcionam.' : 'Technical training, practical experience, and curiosity about how things work.'} />
    <section className="bio-grid"><Reveal disabled={disabled} className="bio-sidebar"><div className="portrait">{profile.photo && !failed ? <img src={assetUrl(profile.photo)} alt={profile.name} onError={() => setFailed(true)} /> : <><span>MC<span>.</span></span><small>{pt ? 'Sua foto pode entrar aqui.' : 'Your photo can go here.'}</small></>}</div><div className="bio-id"><h2>{profile.name}</h2><p>{pt ? 'Estudante de Engenharia de Software' : 'Software Engineering student'}</p><span><MapPin size={14} />{profile.city}</span></div>{profile.resume && <Button component="a" href={assetUrl(profile.resume)} target="_blank" variant="outline" rightSection={<ArrowUpRight size={16} />}>{pt ? 'Ver currículo' : 'View résumé'}</Button>}</Reveal><Reveal disabled={disabled} className="biography"><div className="eyebrow">{pt ? 'DO PRIMEIRO CONTATO À CONSTRUÇÃO DE SOLUÇÕES' : 'FROM FIRST STEPS TO BUILDING SOLUTIONS'}</div>{biography[language].map((paragraph, i) => <p key={i}>{paragraph}</p>)}</Reveal></section>
    <section className="section"><SectionHeading index="01.1" eyebrow={pt ? 'BASE & FORMAÇÃO' : 'FOUNDATION & EDUCATION'} title={pt ? 'Onde tudo se conecta.' : 'Where it all connects.'} /><div className="education-grid">{education.map((item) => <Reveal disabled={disabled} key={item.institution}><article className="education-card"><GraduationCap size={28} strokeWidth={1.4} /><span className="mono">{item.period}</span><h3>{item.institution}</h3><h4>{text(item.label, language)}</h4><small>{text(item.status, language)}</small><p>{text(item.description, language)}</p></article></Reveal>)}</div></section>
    <section className="section"><SectionHeading index="01.2" eyebrow={pt ? 'CONHECIMENTOS & COMPETÊNCIAS' : 'KNOWLEDGE & SKILLS'} title={pt ? 'Minha caixa de ferramentas.' : 'My toolbox.'} /><p className="section-intro">{pt ? 'Conhecimentos vindos de formação, cursos e experiências. As áreas abaixo representam diferentes etapas de aprendizado, sem pressupor o mesmo nível de domínio em todas.' : 'Knowledge gained through education, courses, and experience. These areas represent different stages of learning, rather than equal proficiency in every tool.'}</p><Accordion.Root className="skills-accordion" type="multiple" defaultValue={['0', '1']}>{skillGroups.map((group, i) => <Accordion.Item key={i} value={String(i)} className="skills-item"><Accordion.Header><Accordion.Trigger className="skills-trigger"><span className="mono">0{i + 1}</span><span>{text(group.name, language)}</span><span className="skill-count">{group.items.length}</span><ChevronDown size={20} /></Accordion.Trigger></Accordion.Header><Accordion.Content className="skills-content"><div><Tags items={group.items} /></div></Accordion.Content></Accordion.Item>)}</Accordion.Root></section>
    <section className="section"><SectionHeading index="01.3" eyebrow={pt ? 'APRENDIZADO CONTÍNUO' : 'CONTINUOUS LEARNING'} title={pt ? 'Cursos & certificações.' : 'Courses & certificates.'} /><div className="certificate-grid">{certificates.map((certificate) => <Reveal key={certificate.id} disabled={disabled}><article className="certificate-card"><BadgeCheck size={26} /><span className="mono small">{text(certificate.date, language)}</span><h3>{certificate.name}</h3><span className="issuer">{certificate.issuer}</span><p>{text(certificate.description, language)}</p><External href={certificate.url} className="text-link">{pt ? 'Verificar credencial' : 'Verify credential'}<ExternalLink size={16} /></External></article></Reveal>)}</div></section>
    <ContactBanner language={language} disabled={disabled} />
  </>
}
function Projects({ language, disabled }) {
  const pt = language === 'pt'
  const all = sortedProjects(projects)

  return (
    <>
      <PageHeading
        index="02"
        label={pt ? 'PROJETOS' : 'PROJECTS'}
        title={pt ? 'Ideias que viram código.' : 'Ideas that become code.'}
        description={
          pt
            ? 'Uma linha do tempo do que construo e aprendo. Do projeto mais antigo ao mais recente.'
            : 'A timeline of what I build and learn. From the earliest project to the latest.'
        }
      />

      <div className="project-toolbar">
        <span className="mono">
          {pt
            ? 'PROJETOS · DO MAIS ANTIGO AO MAIS RECENTE'
            : 'PROJECTS · EARLIEST TO LATEST'}
        </span>
      </div>

      <div className="project-report-list">
        {all.map((project, index) => {
          
          const photos = project.photos?.length
            ? project.photos
            : project.image
              ? [{ src: project.image, caption: '' }]
              : [{ src: '', caption: '' }]

          return (
            <article className="project-report" key={project.id}>
              <h2>
                <span>{index + 1})</span>{' '}
                {text(project.title, language)}
              </h2>

              <p className="project-report-description">
                {text(project.description, language)}
              </p>

              <Tags items={project.technologies ?? []} />
              <div className="project-photo-grid">
                {photos.map((photo, photoIndex) => {
                  const caption = text(photo.caption, language)

                  return (
                    <figure
                      className="project-photo"
                      key={`${project.id}-${photoIndex}`}
                    >
                      {photo.src ? (
                        <a
                          href={assetUrl(photo.src)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={
                            pt
                              ? `Abrir foto ${photoIndex + 1}`
                              : `Open photo ${photoIndex + 1}`
                          }
                        >
                          <img
                            src={assetUrl(photo.src)}
                            alt={
                              caption ||
                              `${text(project.title, language)} — ${
                                photoIndex + 1
                              }`
                            }
                            loading="lazy"
                          />
                        </a>
                      ) : (
                        <div className="project-photo-placeholder">
                          <ImagePlus size={32} strokeWidth={1} />
                          <span>
                            {pt
                              ? 'Espaço para foto do projeto'
                              : 'Space for a project photo'}
                          </span>
                        </div>
                      )}

                      {caption && <figcaption>{caption}</figcaption>}
                    </figure>
                  )
                })}
              </div>

              {(validHttpUrl(project.repository) ||
                validHttpUrl(project.live)) && (
                <div className="project-report-links">
                  <External href={project.repository}>
                    <Github size={16} />
                    {pt ? 'Repositório' : 'Repository'}
                    <ArrowUpRight size={15} />
                  </External>

                  <External href={project.live}>
                    {pt ? 'Ver projeto' : 'Live project'}
                    <ArrowUpRight size={15} />
                  </External>
                </div>
              )}
            </article>
          )
        })}

        {all.length === 0 && (
          <p className="section-intro">
            {pt
              ? 'Projetos em breve.'
              : 'Projects coming soon.'}
          </p>
        )}
      </div>

      <ContactBanner language={language} disabled={disabled} />
    </>
  )
}
function Experience({ language, disabled }) {
  const pt = language === 'pt'
  return <><PageHeading index="03" label={pt ? 'EXPERIÊNCIAS' : 'EXPERIENCE'} title={pt ? 'Aprender fazendo. E vivendo.' : 'Learning by doing. And living.'} description={pt ? 'IA, backend e uma experiência internacional. Diferentes ambientes, novos repertórios.' : 'AI, backend, and international experience. Different settings, new perspectives.'} /><div className="experience-timeline">{experiences.map((experience, i) => <Reveal key={experience.id} disabled={disabled} className="experience-entry"><div className="experience-period"><span className="mono">{text(experience.date, language)}</span><span className="timeline-dot" /></div><article className="experience-detail"><div className="experience-top"><span className="company-mark">{experience.initials}</span><span className="mono small">0{i + 1}</span></div><h2>{experience.company}</h2><h3>{text(experience.role, language)}</h3><span className="location"><MapPin size={14} />{text(experience.location, language)}</span><p>{text(experience.description, language)}</p><Tags items={experience.skills} /></article></Reveal>)}</div><div className="experience-note"><Sparkles size={23} /><p>{pt ? 'A experiência no Camp Manitou ampliou minha comunicação em inglês, responsabilidade, adaptação e colaboração com pessoas de diferentes culturas.' : 'My Camp Manitou experience strengthened my English communication, responsibility, adaptability, and collaboration with people from different cultures.'}</p></div><ContactBanner language={language} disabled={disabled} /></>
}

function Contact({ language }) {
  const pt = language === 'pt'
  const [values, setValues] = useState({ name: '', email: '', message: '', website: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)
  const busy = useRef(false)
  const lastSent = useRef(0)
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const configured = Boolean(serviceId && templateId && publicKey && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email))
  const links = [
    { label: 'E-mail', value: profile.email, href: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email) ? `mailto:${profile.email}` : '', icon: Mail },
    { label: 'WhatsApp', value: profile.whatsapp, href: /^\d{10,15}$/.test(profile.whatsapp) ? `https://wa.me/${profile.whatsapp}` : '', icon: MessageCircle },
    { label: 'LinkedIn', value: 'Matheus Coelho', href: validHttpUrl(profile.linkedin) ? profile.linkedin : '', icon: Linkedin },
    { label: 'GitHub', value: profile.github, href: validHttpUrl(profile.github) ? profile.github : '', icon: Github },
  ]
  function update(field, value) { setValues((old) => ({ ...old, [field]: value })); setErrors((old) => ({ ...old, [field]: undefined })); setStatus(null) }
  async function submit(event) {
    event.preventDefault()
    if (busy.current) return
    const issues = validateContact(values, language)
    setErrors(issues)
    if (Object.keys(issues).length) return
    if (values.website) { setStatus({ type: 'error', message: pt ? 'Não foi possível enviar a mensagem.' : 'Unable to send the message.' }); return }
    if (!configured) { setStatus({ type: 'error', message: pt ? 'O envio ainda precisa ser configurado pelo proprietário do portfólio.' : 'The portfolio owner still needs to configure email delivery.' }); return }
    if (Date.now() - lastSent.current < 60000) { setStatus({ type: 'error', message: pt ? 'Aguarde um minuto antes de enviar outra mensagem.' : 'Please wait one minute before sending another message.' }); return }
    busy.current = true; setSending(true)
    try {
      await emailjs.send(serviceId, templateId, { from_name: values.name.trim(), from_email: values.email.trim(), reply_to: values.email.trim(), message: values.message.trim(), to_name: profile.name, to_email: profile.email }, { publicKey })
      lastSent.current = Date.now()
      setStatus({ type: 'success', message: pt ? 'Mensagem enviada. Obrigado pelo contato!' : 'Message sent. Thank you for reaching out!' })
      setValues({ name: '', email: '', message: '', website: '' })
    } catch { setStatus({ type: 'error', message: pt ? 'Não foi possível enviar. Tente novamente ou use um contato direto.' : 'Unable to send. Please try again or use a direct contact link.' }) }
    finally { busy.current = false; setSending(false) }
  }
  return <><PageHeading index="04" label={pt ? 'CONTATO' : 'CONTACT'} title={pt ? 'Vamos trocar uma ideia?' : 'Let’s start a conversation.'} description={pt ? 'Projetos, oportunidades ou uma conversa sobre tecnologia. Escolha o canal que faz sentido para você.' : 'Projects, opportunities, or a conversation about technology. Choose the channel that works for you.'} /><div className="contact-grid"><div className="contact-info"><div className="eyebrow">{pt ? 'UM CONTATO DIRETO' : 'GET IN TOUCH'}</div><h2>{pt ? 'Conexões começam com um olá.' : 'Connections start with hello.'}</h2><div className="contact-links">{links.map(({ label, value, href, icon: Icon }) => href ? <a key={label} href={href} target={label === 'E-mail' ? undefined : '_blank'} rel="noopener noreferrer" className="contact-link"><Icon size={22} /><div><strong>{label}</strong><span>{value}</span></div><ArrowUpRight size={19} /></a> : <div key={label} className="contact-link unset"><Icon size={22} /><div><strong>{label}</strong><span>{pt ? 'Contato a adicionar' : 'Contact to add'}</span></div><Plus size={18} /></div>)}</div><div className="contact-location"><MapPin size={16} />{profile.city}</div></div>
    <div className="form-panel"><div className="form-heading"><h2>{pt ? 'Envie uma mensagem' : 'Send a message'}</h2><ArrowUpRight size={24} /></div>{!configured && <Alert variant="light" color="gray" mb="lg">{pt ? 'Envio indisponível no momento. Entre em contato por e-mail ou WhatsApp.' : 'Sending is currently unavailable. Please contact me by email or WhatsApp.'}</Alert>}<form onSubmit={submit} noValidate><TextInput id="contact-name" name="name" label={pt ? 'Seu nome' : 'Your name'} placeholder={pt ? 'Como posso chamar você?' : 'What should I call you?'} autoComplete="name" required maxLength={100} value={values.name} onChange={(event) => update('name', event.target.value)} error={errors.name} disabled={sending} /><TextInput id="contact-email" name="email" type="email" label="E-mail" placeholder="voce@exemplo.com" autoComplete="email" required maxLength={254} value={values.email} onChange={(event) => update('email', event.target.value)} error={errors.email} disabled={sending} /><Textarea id="contact-message" name="message" label={pt ? 'Sua mensagem' : 'Your message'} placeholder={pt ? 'Conte um pouco sobre sua ideia…' : 'Tell me a little about your idea…'} minRows={5} required maxLength={5000} value={values.message} onChange={(event) => update('message', event.target.value)} error={errors.message} disabled={sending} /><div className="honeypot" aria-hidden="true"><label>Website<input name="website" autoComplete="off" tabIndex={-1} value={values.website} onChange={(event) => update('website', event.target.value)} /></label></div><Button type="submit" fullWidth size="lg" loading={sending} disabled={!configured} rightSection={<ArrowUpRight size={18} />}>{configured ? (pt ? 'Enviar mensagem' : 'Send message') : (pt ? 'Envio indisponível' : 'Sending unavailable')}</Button><p className="form-note">{pt ? 'Seu nome e e-mail serão usados para responder à mensagem.' : 'Your name and email will be used to reply to your message.'}</p>{status && <Alert role={status.type === 'error' ? 'alert' : 'status'} mt="md" color={status.type === 'success' ? 'green' : 'red'} icon={status.type === 'success' ? <Check size={18} /> : undefined}>{status.message}</Alert>}</form></div></div></>
}
function ContactBanner({ language, disabled }) { const pt = language === 'pt'; return <Reveal disabled={disabled} className="contact-banner"><div><span className="eyebrow">{pt ? 'PRÓXIMA CONVERSA' : 'NEXT CONVERSATION'}</span><h2>{pt ? 'Algo bom começa' : 'Something good starts'}<br />{pt ? 'com uma conexão.' : 'with a connection.'}</h2></div><a href="#contato" className="round-link" aria-label={pt ? 'Entrar em contato' : 'Get in touch'}><ArrowUpRight size={42} strokeWidth={1.3} /></a></Reveal> }

export default function App() {
  const [page, setPage] = useState(currentPage)
  const [language, setLanguage] = useState(() => getStored('mc-language', 'pt') === 'en' ? 'en' : 'pt')
  const [menuOpen, setMenuOpen] = useState(false)
  const [paused, setPaused] = useState(() => getStored('mc-paused', 'false') === 'true')
  const reduced = useReducedMotion()
  const compact = useMediaQuery('(max-width: 700px)')
  const offscreen = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [visible, setVisible] = useState(true)
  const main = useRef()
  const navChanged = useRef(false)
  const disabled = paused || reduced || offscreen || !visible
  const labels = navLabels[language]
  useEffect(() => {
    const navigate = () => { setPage(currentPage()); setMenuOpen(false); navChanged.current = true; window.scrollTo({ top: 0, behavior: 'instant' }) }
    window.addEventListener('hashchange', navigate)
    const visibility = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', visibility)
    return () => { window.removeEventListener('hashchange', navigate); document.removeEventListener('visibilitychange', visibility) }
  }, [])
  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
    document.title = `${profile.name} — ${labels[pages.indexOf(page)]}`
    try { localStorage.setItem('mc-language', language); localStorage.setItem('mc-paused', String(paused)) } catch { return }
  }, [language, paused, page, labels])
  useEffect(() => { if (navChanged.current) main.current?.focus({ preventScroll: true }) }, [page])
  const props = { language, disabled: disabled || compact }
  return <>
    <CursorGlow disabled={disabled} />
    <a className="skip-link" href="#main" onClick={(event) => { event.preventDefault(); main.current?.focus(); main.current?.scrollIntoView() }}>{language === 'pt' ? 'Pular para conteúdo' : 'Skip to content'}</a>
    <header className="site-header"><div className="header-inner"><a href="#inicio" className="logo" aria-label={`${profile.name} — ${labels[0]}`}>mc<span>.</span><small>MATHEUS COELHO</small></a><nav id="mobile-nav" aria-label={language === 'pt' ? 'Navegação principal' : 'Main navigation'} className={menuOpen ? 'main-nav open' : 'main-nav'}>{pages.map((slug, i) => <a key={slug} href={`#${slug}`} aria-current={page === slug ? 'page' : undefined}>{labels[i]}{page === slug && <span />}</a>)}</nav><div className="header-controls"><SegmentedControl aria-label={language === 'pt' ? 'Idioma' : 'Language'} size="xs" value={language} onChange={setLanguage} data={[{ label: 'PT', value: 'pt' }, { label: 'EN', value: 'en' }]} /><Tooltip label={language === 'pt' ? (paused ? 'Ativar animações' : 'Pausar animações') : (paused ? 'Enable animations' : 'Pause animations')}><button className="icon-button motion-toggle" aria-label={language === 'pt' ? (paused ? 'Ativar animações' : 'Pausar animações') : (paused ? 'Enable animations' : 'Pause animations')} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={16} /> : <Pause size={16} />}</button></Tooltip><button className="icon-button mobile-menu" aria-controls="mobile-nav" aria-expanded={menuOpen} aria-label={language === 'pt' ? 'Abrir ou fechar menu' : 'Open or close menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div></div></header>
    <main id="main" ref={main} tabIndex={-1} className="main-content"><AnimatePresence mode="wait" initial={false}><motion.div key={page} initial={disabled ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={disabled ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.18 }}>
      {page === 'inicio' && <Home {...props} />}{page === 'sobre' && <About {...props} />}{page === 'projetos' && <Projects {...props} />}{page === 'experiencias' && <Experience {...props} />}{page === 'contato' && <Contact language={language} />}
    </motion.div></AnimatePresence></main>
    <footer className="site-footer"><div className="footer-top"><a href="#inicio" className="logo">mc<span>.</span></a><p>{language === 'pt' ? 'Código, curiosidade e aprendizado contínuo.' : 'Code, curiosity, and continuous learning.'}</p><div className="footer-socials"><External href={profile.github}><Github size={19} /><span>GitHub</span></External><External href={profile.linkedin}><Linkedin size={19} /><span>LinkedIn</span></External>{profile.email && <a href={`mailto:${profile.email}`}><Mail size={19} /><span>E-mail</span></a>}</div></div><div className="footer-bottom"><span>© {2026} {profile.name}</span><nav aria-label={language === 'pt' ? 'Navegação do rodapé' : 'Footer navigation'}>{pages.slice(1).map((slug, i) => <a key={slug} href={`#${slug}`}>{labels[i + 1]}</a>)}</nav><a href={`#${page}`} onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: disabled ? 'instant' : 'smooth' }) }}>{language === 'pt' ? 'Voltar ao topo' : 'Back to top'}<ArrowDown size={14} style={{ transform: 'rotate(180deg)' }} /></a></div></footer>
  </>
}
