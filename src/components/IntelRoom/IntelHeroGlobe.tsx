import React from 'react';
import styles from './IntelHeroGlobe.module.css';

export default function IntelHeroGlobe() {
  return (
    <div className={styles.globeContainer}>
      <div className={styles.globeWrapper}>
        {/* The rotating globe itself */}
        <div className={styles.globe}>
          {/* Grid lines and glowing effect */}
          <div className={styles.globeGrid}></div>
          <div className={styles.globeEquator}></div>
          
          {/* Threat Nodes / Risk indicators */}
          <div className={`${styles.threatNode} ${styles.node1}`}>
            <div className={styles.pulseRing}></div>
            <div className={styles.pulseDot}></div>
            <div className={styles.nodeLabel}>CRITICAL</div>
          </div>
          <div className={`${styles.threatNode} ${styles.node2}`}>
            <div className={styles.pulseRing}></div>
            <div className={styles.pulseDot}></div>
          </div>
          <div className={`${styles.threatNode} ${styles.node3}`}>
            <div className={styles.pulseRing}></div>
            <div className={styles.pulseDot}></div>
            <div className={styles.nodeLabel}>WARNING</div>
          </div>
          <div className={`${styles.threatNode} ${styles.node4}`}>
            <div className={styles.pulseRing}></div>
            <div className={styles.pulseDot}></div>
          </div>
        </div>
        
        {/* Static overlay elements / HUD */}
        <div className={styles.hudRing1}></div>
        <div className={styles.hudRing2}></div>
        
        <div className={styles.hudStats}>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>ACTIVE THREATS</span>
            <span className={styles.statValue}>1,402</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>GLOBAL NODES</span>
            <span className={styles.statValue}>54</span>
          </div>
        </div>
      </div>
    </div>
  );
}
