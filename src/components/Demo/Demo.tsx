import React from "react";

import styles from "./Demo.module.scss";

export interface ComboBoxProps<T> {
  title: string;
  children: React.ReactElement;
}

const Demo = <T extends object>({ title, children }: ComboBoxProps<T>) => {
  return <div className={styles.demo}>
    <div className={styles.title}>{title}</div>
    <div className={styles.children}>{children}</div>
  </div>
};

export default Demo;
