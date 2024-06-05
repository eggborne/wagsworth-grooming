"use client"

import { useState } from 'react';
import styles from './QuestionSet.module.css';

type  QuestionSetProps = {
  question: string;
  answer: string[];
  key: number;
};

const QuestionSet = ({ question, answer, key }: QuestionSetProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={styles.questionSet + ' ' + (expanded ? styles.expanded : '')} key={key} onClick={() => setExpanded(!expanded)}>
      <h2 className={styles.question}>{question}</h2>
      <div className={styles.answer}>
        {answer.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    </div>
  );
};

export default QuestionSet;