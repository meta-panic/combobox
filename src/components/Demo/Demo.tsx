import React from "react";

import styles from "./Demo.module.scss";

export interface DemoProps {
  title: string;
  children: React.ReactElement;
}

const Demo = ({ title, children }: DemoProps) => {
  return (
    <div className={styles.demo}>
      <div className={styles.title}>{title}</div>
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default Demo;
