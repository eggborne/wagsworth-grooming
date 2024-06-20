"use client"

import { useState } from 'react';
import styles from './QuestionSet.module.css';

type QuestionSetProps = {
  question: string;
  answer: string[];
  key: number;
};

const QuestionSet = ({ question, answer, key }: QuestionSetProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={styles.questionSet + ' shadowed-border ' + (expanded ? styles.expanded : '')} key={key} onClick={() => setExpanded(!expanded)}>
      <div className={styles.questionContainer}>
        <h3 className={styles.question}>{question}</h3>
        <button className={styles.expandButton}>△</button>
      </div>
      <div className={styles.answer}>
        {answer.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default QuestionSet;