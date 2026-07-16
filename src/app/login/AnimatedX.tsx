import styles from './login.module.css';

const TOP_PATHS = (
  <>
    <polyline points="120.45 1 119.95 .5 .95 .5 24.11 33.98" />
    <polyline points="65.82 34.5 101.95 34.5 103.31 34.5" />
    <polyline points="119.95 .5 224.99 156.5 305.63 34.5 270.95 34.5" />
    <polyline points="230.03 34.5 252.95 .5 368.95 .5 224.99 218.5 101.95 34.5" />
    <path d="M24.46,34.51l-1.37-1.99c-.13-.2-.26-.39-.39-.59" />
    <path d="M65.95,34.5l61.62,89.57c5.33,7.73,3.39,18.31-4.34,23.65h0c-7.73,5.33-18.31,3.39-23.65-4.34L24.46,34.51" />
    <path d="M267.89,8.56h0" />
    <path d="M271.04,34.5l-39.45,59.22c-5.21,7.81-15.76,9.93-23.57,4.72h0c-7.81-5.21-9.93-15.76-4.72-23.57l41.03-61.59" />
    <path d="M270.95,34.5h.08" />
  </>
);

const BOTTOM_PATHS = (
  <>
    <polyline points="249.45 382 249.95 382.5 368.95 382.5 345.79 349.02" />
    <polyline points="304.09 348.5 267.95 348.5 266.6 348.5" />
    <polyline points="249.95 382.5 144.91 226.5 64.27 348.5 98.95 348.5" />
    <polyline points="139.87 348.5 116.95 382.5 .95 382.5 144.91 164.5 267.95 348.5" />
    <path d="M345.45,348.49l1.37,1.99c.13.2.26.39.39.59" />
    <path d="M303.95,348.5l-61.62-89.57c-5.33-7.73-3.39-18.31,4.34-23.65h0c7.73-5.33,18.31-3.39,23.65,4.34l75.13,108.87" />
    <path d="M102.01,374.44h0" />
    <path d="M98.87,348.5l39.45-59.22c5.21-7.81,15.76-9.93,23.57-4.72h0c7.81,5.21,9.93,15.76,4.72,23.57l-41.03,61.59" />
    <path d="M98.95,348.5h-.08" />
  </>
);

export default function AnimatedX() {
  return (
    <div className={styles.xBackground} aria-hidden="true">
      <svg viewBox="0 0 368 378" xmlns="http://www.w3.org/2000/svg">
        <g className={styles.xStaticPaths}>
          {TOP_PATHS}
          {BOTTOM_PATHS}
        </g>
        <g className={styles.xAnimatedPathsOrange}>{TOP_PATHS}</g>
        <g className={styles.xAnimatedPathsWhite}>{BOTTOM_PATHS}</g>
      </svg>
    </div>
  );
}
