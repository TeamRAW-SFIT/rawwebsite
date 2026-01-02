'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Competitions.module.css';

const competitionsData = [
  {
    id: 1,
    name: 'e-Yantra Robotics Competition',
    organizer: 'IIT Bombay',
    year: 2024,
    achievement: 'Qualified',
    description: 'Multi-stage national robotics competition focusing on embedded systems, control algorithms, and real-world problem solving.',
    tags: ['Embedded Systems', 'Control', 'Algorithms'],
  },
  {
    id: 2,
    name: 'DD Robocon India',
    organizer: 'Doordarshan & Ministry of Education',
    year: 2024,
    achievement: 'National Participation',
    description: 'Premier national robotics olympiad promoting innovation in mechanical and autonomous systems across Indian colleges.',
    tags: ['Mechanical Design', 'Autonomous Control', 'Electronics'],
  },
  {
    id: 3,
    name: 'Techfest IIT Bombay - Robotics Events',
    organizer: 'IIT Bombay',
    year: 2024,
    achievement: 'Finalist',
    description: 'Prestigious college tech fest featuring multiple robotics challenges including autonomous navigation and speed competitions.',
    tags: ['Design', 'Innovation', 'Autonomous'],
  },
  {
    id: 4,
    name: 'e-Yantra Robotics Competition',
    organizer: 'IIT Bombay',
    year: 2023,
    achievement: 'Qualified',
    description: 'Multi-stage national robotics competition focusing on embedded systems and real-world applications.',
    tags: ['Embedded Systems', 'Control', 'Robotics'],
  },
  {
    id: 5,
    name: 'DD Robocon India',
    organizer: 'Doordarshan',
    year: 2023,
    achievement: 'Top 10',
    description: 'National robotics olympiad promoting mechanical innovation and autonomous systems.',
    tags: ['Mechanical Design', 'Autonomous Control', 'Innovation'],
  },
  {
    id: 6,
    name: 'Techfest IIT Bombay',
    organizer: 'IIT Bombay',
    year: 2023,
    achievement: 'Finalist',
    description: 'Multi-event robotics festival with challenges in autonomous navigation and speed competitions.',
    tags: ['Autonomous', 'Speed Challenge', 'Design'],
  },
];

const ACHIEVEMENT_BADGES = {
  'Participated': '✓ Participated',
  'Qualified': '✓ Qualified',
  'Top 10': '🏆 Top 10',
  'Finalist': '⭐ Finalist',
  'Winner': '🥇 Winner',
  'National Participation': '🇮🇳 National',
};

export default function Competitions() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  // Get unique years and domains for filters
  const years = Array.from(new Set(competitionsData.map(c => c.year))).sort((a, b) => b - a);
  const allDomains = Array.from(new Set(competitionsData.flatMap(c => c.tags))).sort();

  // Filter competitions
  const filteredCompetitions = competitionsData.filter(comp => {
    const yearMatch = !selectedYear || comp.year === selectedYear;
    const domainMatch = !selectedDomain || comp.tags.includes(selectedDomain);
    return yearMatch && domainMatch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="competitions" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Competitions & <span className={styles.redAccent}>Achievements</span></h2>
          <p>Our participation in India's premier national robotics competitions</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className={styles.filters}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Year Filter */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Year:</span>
            <div className={styles.filterButtons}>
              <button
                className={`${styles.filterButton} ${!selectedYear ? styles.active : ''}`}
                onClick={() => setSelectedYear(null)}
              >
                All
              </button>
              {years.map(year => (
                <button
                  key={year}
                  className={`${styles.filterButton} ${selectedYear === year ? styles.active : ''}`}
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Domain Filter */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Domain:</span>
            <div className={styles.filterButtons}>
              <button
                className={`${styles.filterButton} ${!selectedDomain ? styles.active : ''}`}
                onClick={() => setSelectedDomain(null)}
              >
                All
              </button>
              {allDomains.map(domain => (
                <button
                  key={domain}
                  className={`${styles.filterButton} ${selectedDomain === domain ? styles.active : ''}`}
                  onClick={() => setSelectedDomain(domain)}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Counter */}
        <motion.p
          className={styles.resultCount}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Showing <span>{filteredCompetitions.length}</span> competition{filteredCompetitions.length !== 1 ? 's' : ''}
        </motion.p>

        {filteredCompetitions.length > 0 ? (
          <motion.div
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredCompetitions.map((comp) => (
              <motion.div
                key={comp.id}
                className={styles.card}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: '0 20px 40px rgba(225, 6, 0, 0.2)',
                  borderColor: 'var(--color-red)',
                }}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.year}>{comp.year}</span>
                  <span className={styles.achievement}>{ACHIEVEMENT_BADGES[comp.achievement as keyof typeof ACHIEVEMENT_BADGES]}</span>
                </div>

                <h3 className={styles.title}>{comp.name}</h3>
                <p className={styles.organizer}>by {comp.organizer}</p>
                <p className={styles.description}>{comp.description}</p>

                <div className={styles.tags}>
                  {comp.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.border}></div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className={styles.noResults}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p>No competitions found with the selected filters.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
