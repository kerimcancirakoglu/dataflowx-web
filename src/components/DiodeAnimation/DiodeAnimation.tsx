import React from 'react';
import styles from './DiodeAnimation.module.css';

export default function DiodeAnimation() {
  return (
    <div className={styles.container}>
      <div className={styles.isometricScene}>
        
        {/* Base Grid Platform */}
        <div className={styles.platform}></div>

        {/* Pipeline between TX and RX */}
        <div className={styles.pipeline}>
          {/* Air Gap Wall */}
          <div className={styles.airGapWall}>
            AIR GAP
          </div>
        </div>

        {/* Data Packets (Moving from TX to RX) */}
        <div className={styles.packet}></div>
        <div className={`${styles.packet} ${styles.packet2}`}></div>
        <div className={`${styles.packet} ${styles.packet3}`}></div>

        {/* TX Node (Trusted Network) */}
        <div className={`${styles.node} ${styles.nodeTx}`}>
          <div className={`${styles.face} ${styles.faceTop}`}></div>
          <div className={`${styles.face} ${styles.faceRight}`}></div>
          <div className={`${styles.face} ${styles.faceFront}`}>TX</div>
        </div>

        {/* RX Node (Untrusted Network) */}
        <div className={`${styles.node} ${styles.nodeRx}`}>
          <div className={`${styles.face} ${styles.faceTop}`}></div>
          <div className={`${styles.face} ${styles.faceRight}`}></div>
          <div className={`${styles.face} ${styles.faceFront}`}>RX</div>
        </div>

      </div>
    </div>
  );
}
