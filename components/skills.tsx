"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const skills = [
  { name: "React / Next.js", level: 95, color: "purple" },
  { name: "Power BI", level: 90, color: "teal" },
  { name: "Tailwind CSS", level: 85, color: "pink" },
  { name: "CPP", level: 95, color: "amber" },
  { name: "Node.js", level: 75, color: "purple" },
  { name: "MySQL", level: 87, color: "teal" },
]

const tools = [
  { name: "VS Code", icon: "💻", color: "purple" },
  { name: "Git", icon: "🔄", color: "teal" },
  { name: "Figma", icon: "🎨", color: "pink" },
  { name: "Docker", icon: "🐳", color: "amber" },
  { name: "Vercel", icon: "▲", color: "purple" },
  { name: "GitHub Actions", icon: "🔄", color: "teal" },
]

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="skills" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-teal/10 blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-teal via-teal-light to-blue-500 opacity-75 blur-sm" />
              <h2 className="relative text-3xl md:text-4xl font-bold px-4 py-1 rounded-lg bg-background">
                My <span className="text-gradient-teal">Skills</span>
              </h2>
            </motion.div>
          </div>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and the tools I use to build exceptional web experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gradient-teal">Technical Skills</h3>
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6"
            >
              {skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  onMouseEnter={() => setActiveSkill(skill.name)}
                  onMouseLeave={() => setActiveSkill(null)}
                  className="group"
                >
                  <div className="flex justify-between mb-2">
                    <motion.span
                      className={`font-medium ${activeSkill === skill.name ? `text-${skill.color}` : ""}`}
                      animate={{
                        scale: activeSkill === skill.name ? 1.05 : 1,
                        x: activeSkill === skill.name ? 5 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {skill.name}
                    </motion.span>
                    <motion.span
                      className={`text-${skill.color}`}
                      animate={{
                        scale: activeSkill === skill.name ? 1.1 : 1,
                      }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div className="relative">
                    <div className={`absolute inset-0 h-2 rounded-full bg-${skill.color}/20`} />
                    <SkillProgress value={skill.level} color={skill.color} isActive={activeSkill === skill.name} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6 text-gradient-teal">Tools & Software</h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {tools.map((tool) => (
                <motion.div
                  key={tool.name}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 20px rgba(124, 58, 237, 0.3)`,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-${tool.color}/10 p-4 rounded-lg text-center flex flex-col items-center justify-center gap-2 border border-${tool.color}/20 group transition-all duration-300`}
                >
                  <motion.span
                    className="text-2xl"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {tool.icon}
                  </motion.span>
                  <span className={`group-hover:text-${tool.color} transition-colors duration-300`}>{tool.name}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: false, amount: 0.3 }}
              className="mt-12"
            >
              <h3 className="text-xl font-semibold mb-6 text-gradient-teal">Education & Certifications</h3>
              <div className="space-y-4">
                <motion.div
                  className="bg-purple/10 p-6 rounded-lg border border-purple/20 relative overflow-hidden group"
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <h4 className="font-medium text-lg group-hover:text-purple transition-colors duration-300">
                    BTech. Computer Science And Engineering
                  </h4>
                  <p className="text-sm text-foreground/70">Maharaja Surajmal Institute Of Technology</p>
                </motion.div>
                <motion.div
                  className="bg-teal/10 p-6 rounded-lg border border-teal/20 relative overflow-hidden group"
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <h4 className="font-medium text-lg group-hover:text-teal transition-colors duration-300">
                    Microsoft Student Ambassador - Beta
                  </h4>
                  <p className="text-sm text-foreground/70">MSC-MSIT</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillProgress({ value, color, isActive }: { value: number; color: string; isActive: boolean }) {
  const progressRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(progressRef, { once: false })

  return (
    <div ref={progressRef} className="relative">
      <motion.div
        className={`h-2 rounded-full bg-${color}`}
        style={{
          width: isInView ? `${value}%` : "0%",
          boxShadow: isActive ? `0 0 10px rgba(124, 58, 237, 0.5)` : "none",
        }}
        initial={{ width: "0%" }}
        animate={{
          width: isInView ? `${value}%` : "0%",
          boxShadow: isActive ? `0 0 10px rgba(124, 58, 237, 0.5)` : "none",
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      {isActive && (
        <motion.div
          className="absolute top-0 right-0 w-4 h-4 rounded-full bg-white"
          style={{
            left: `calc(${value}% - 8px)`,
            boxShadow: `0 0 10px rgba(124, 58, 237, 0.8)`,
          }}
          layoutId="skillIndicator"
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      )}
    </div>
  )
}

