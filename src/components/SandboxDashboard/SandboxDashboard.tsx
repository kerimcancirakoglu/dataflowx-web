import React from 'react';
import styles from './SandboxDashboard.module.css';

export default function SandboxDashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        
        {/* Top Widgets */}
        <div className={styles.topRow}>
          
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5A706" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              Malware Score
            </div>
            <div className={styles.malwareScoreContent}>
              <div className={styles.scoreCircle}>
                <span className={styles.scoreText}>%57</span>
              </div>
              <div className={styles.severityBars}>
                <div>
                  <div className={styles.sevRow}><span>High Severity</span><span>8</span></div>
                  <div className={styles.barBg}><div className={`${styles.barFill} ${styles.highFill}`}></div></div>
                </div>
                <div>
                  <div className={styles.sevRow}><span>Medium Severity</span><span>5</span></div>
                  <div className={styles.barBg}><div className={`${styles.barFill} ${styles.medFill}`}></div></div>
                </div>
                <div>
                  <div className={styles.sevRow}><span>Low Severity</span><span>2</span></div>
                  <div className={styles.barBg}><div className={`${styles.barFill} ${styles.lowFill}`}></div></div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              File Name
            </div>
            <p className={styles.fileInfo}>
              suspicious_payload_v2_final.exe<br/>
              SHA256: 8a4c1...9f2b
            </p>
            <div className={styles.logBoxes}>
              <div className={`${styles.logBox} ${styles.red}`}>
                <span className={styles.logTitle}>Detected Log File</span>
                <span className={styles.logValue}>24</span>
              </div>
              <div className={`${styles.logBox} ${styles.orange}`}>
                <span className={styles.logTitle}>Detected Log File</span>
                <span className={styles.logValue}>12</span>
              </div>
              <div className={`${styles.logBox} ${styles.green}`}>
                <span className={styles.logTitle}>Detected Log File</span>
                <span className={styles.logValue}>8</span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff4757" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Threat Level
            </div>
            <div className={styles.threatRows}>
              <div className={styles.threatRow}>
                <div className={styles.threatHeader}><span>Threat Level</span><span>75</span></div>
                <div className={styles.barBg}><div className={`${styles.barFill} ${styles.highFill}`}></div></div>
              </div>
              <div className={styles.threatRow}>
                <div className={styles.threatHeader}><span>Threat Level</span><span>67</span></div>
                <div className={styles.barBg}><div className={`${styles.barFill} ${styles.medFill}`}></div></div>
              </div>
              <div className={styles.threatRow}>
                <div className={styles.threatHeader}><span>Threat Level</span><span>23</span></div>
                <div className={styles.barBg}><div className={`${styles.barFill} ${styles.lowFill}`}></div></div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5A706" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Antivirus
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
              No local match
            </div>
          </div>

        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <div className={`${styles.tab} ${styles.active}`}>Signatures & Threat Scoring</div>
          <div className={styles.tab}>File & Key Interactions</div>
          <div className={styles.tab}>Network Activity</div>
          <div className={styles.tab}>Behavioral Analysis</div>
          <div className={styles.tab}>Screenshots</div>
          <div className={styles.tab}>Mitre Analysis</div>
          <div className={styles.tab}>YARA</div>
        </div>

        {/* Attack Analysis */}
        <div className={styles.card} style={{ border: 'none', background: 'transparent', padding: '0.5rem 0' }}>
          <div className={styles.attackAnalysis}>
            <div>
              <div className={styles.attackHeader}>Attack Analysis</div>
              <div className={styles.attackSub}>Tactical and Technical Detection Matrix</div>
            </div>
            <div className={styles.detectionGrid}>
              <div className={styles.detectionItem}>
                <span>Total Detection</span>
                <span className={styles.detectionValue}>7</span>
              </div>
              <div className={styles.detectionItem}>
                <span>Total Detection</span>
                <span className={styles.detectionValue}>7</span>
              </div>
              <div className={styles.detectionItem}>
                <span>Total Detection</span>
                <span className={styles.detectionValue}>7</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
