import { Mail, Phone, Linkedin, Github } from "lucide-react"

export default function ContactInfo() {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Mail className="h-5 w-5 mr-3 text-emerald-600 dark:text-emerald-400" />
        <a href="mailto:michael.mutie003@gmail.com" className="hover:text-emerald-600 dark:hover:text-emerald-400">
          michael.mutie003@gmail.com
        </a>
      </div>

      <div className="flex items-center">
        <Phone className="h-5 w-5 mr-3 text-emerald-600 dark:text-emerald-400" />
        <a href="tel:+254743593015" className="hover:text-emerald-600 dark:hover:text-emerald-400">
          +254 743 593015
        </a>
      </div>

      <div className="flex items-center">
        <Github className="h-5 w-5 mr-3 text-emerald-600 dark:text-emerald-400" />
        <a
          href="https://github.com/mikethrills"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-emerald-600 dark:hover:text-emerald-400"
        >
          github.com/mikethrills
        </a>
      </div>

      <div className="flex items-center">
        <Linkedin className="h-5 w-5 mr-3 text-emerald-600 dark:text-emerald-400" />
        <a
          href="https://linkedin.com/in/michael-mutie-1ba1a51b3"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-emerald-600 dark:hover:text-emerald-400"
        >
          linkedin.com/in/michael-mutie-1ba1a51b3
        </a>
      </div>
    </div>
  )
}

