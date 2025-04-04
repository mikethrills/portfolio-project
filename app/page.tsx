"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Github, Linkedin, Mail, ExternalLink, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import ContactForm from "@/components/contact-form"
import SkillsChart from "@/components/skills-chart"
import ProjectCard from "@/components/project-card"
import ProfileImageUpload from "@/components/profile-image-upload"
import { projects } from "@/data/projects"
import { skills } from "@/data/skills"
import ContactInfo from "@/components/contact-info"

export default function Home() {
  const [theme, setTheme] = useState("light")
  const [mounted, setMounted] = useState(false)

  // Use useEffect to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    // Check if user prefers dark mode
    const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    if (isDarkMode) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  // Avoid rendering with incorrect theme
  if (!mounted) return null

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-emerald-600 dark:text-emerald-400">Michael</span>Mutie
          </h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
              About
            </a>
            <a href="#projects" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
              Projects
            </a>
            <a href="#skills" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
              Skills
            </a>
            <a href="#contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
              Contact
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button variant="outline" className="hidden md:flex">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center">
                Resume <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section id="about" className="py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Hi, I'm <span className="text-emerald-600 dark:text-emerald-400">Michael Mutie</span>
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
              Full Stack Developer
            </h3>
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-400 max-w-lg">
              I build responsive, accessible web applications with modern technologies. Passionate about creating
              intuitive user experiences and clean, maintainable code.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button variant="outline">
                <a href="#projects">View Projects</a>
              </Button>
            </div>
            <div className="flex mt-8 space-x-4">
              <a href="https://github.com/mikethrills" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400" />
              </a>
              <a
                href="https://linkedin.com/in/michael-mutie-1ba1a51b3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400" />
              </a>
              <a href="mailto:michael.mutie003@gmail.com" aria-label="Email">
                <Mail className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400" />
              </a>
              <a href="tel:+254743593015" aria-label="Phone">
                <Phone className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400" />
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <ProfileImageUpload />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16">
          <h2 className="text-3xl font-bold mb-2">Projects</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Check out some of my recent work</p>

          <Tabs defaultValue="all">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="web">Web Apps</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </TabsContent>

            <TabsContent value="web" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.category === "web")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </TabsContent>

            <TabsContent value="mobile" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.category === "mobile")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </TabsContent>

            <TabsContent value="design" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.category === "design")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </TabsContent>
          </Tabs>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16">
          <h2 className="text-3xl font-bold mb-2">Skills</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Technologies I work with</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
                <CardDescription>My proficiency in various technologies</CardDescription>
              </CardHeader>
              <CardContent>
                <SkillsChart skills={skills} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
                <CardDescription>Technologies I use regularly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Node.js",
                    "Express",
                    "MongoDB",
                    "PostgreSQL",
                    "Tailwind CSS",
                    "Git",
                    "GitHub",
                    "Figma",
                    "Responsive Design",
                    "RESTful APIs",
                  ].map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16">
          <h2 className="text-3xl font-bold mb-2">Contact Me</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Get in touch for opportunities or collaborations</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>I'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Alternative ways to reach me</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ContactInfo />
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500 dark:text-gray-400">Based in Kenya</p>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Michael Mutie. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Built with HTML, CSS, JavaScript, and ❤️</p>
        </div>
      </footer>
    </div>
  )
}

