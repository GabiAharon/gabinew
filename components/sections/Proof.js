import React from "react";
import { motion } from "framer-motion";
import { Award, Mic, Users, Star } from "lucide-react";
import { AnimatedCounter } from "../ui";

export default function Proof({ t }) {
  const stats = [
    { value: "10", suffix: "+", label: t.stats.years, icon: Award },
    { value: "200", suffix: "+", label: t.stats.lectures, icon: Mic },
    { value: "5000", suffix: "+", label: t.stats.participants, icon: Users },
    { value: "98", suffix: "%", label: t.stats.satisfaction, icon: Star },
  ];

  return (
    <section className="relative border-y border-white/5 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <stat.icon className="mx-auto mb-3 h-6 w-6 text-gold/70" />
              <div className="mb-1 text-3xl font-bold text-white md:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2 + i * 0.3} />
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
