'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// ──────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────
export interface WPPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  categories?: {
    nodes: { name: string }[];
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  };
}

interface BlogClientProps {
  posts: WPPost[];
}

// Strip <p> and HTML tags from WP excerpt for plain text display
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

// Format ISO date nicely
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ──────────────────────────────────────────────────
// Skeleton card shown while loading / for placeholder
// ──────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className={styles.card} style={{ pointerEvents: 'none' }}>
      <div className={styles.cardImageWrapper} style={{ background: 'rgba(255,255,255,0.04)' }} />
      <div className={styles.cardContent}>
        <div style={{ height: '0.85rem', width: '60%', background: 'rgba(255,255,255,0.07)', borderRadius: 4, marginBottom: '0.75rem' }} />
        <div style={{ height: '1.25rem', width: '90%', background: 'rgba(255,255,255,0.09)', borderRadius: 4, marginBottom: '0.5rem' }} />
        <div style={{ height: '1rem', width: '75%', background: 'rgba(255,255,255,0.06)', borderRadius: 4 }} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────────
export default function BlogClient({ posts }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Derive unique categories from real WP data
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('All');
    posts.forEach(p => {
      p.categories?.nodes.forEach(c => cats.add(c.name));
    });
    return Array.from(cats);
  }, [posts]);

  const [activeCategory, setActiveCategory] = useState('All');

  // Filter: category then search
  const filteredPosts = useMemo(() => {
    let list = posts;
    if (activeCategory !== 'All') {
      list = list.filter(p =>
        p.categories?.nodes.some(c => c.name === activeCategory)
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        stripHtml(p.excerpt).toLowerCase().includes(q)
      );
    }
    return list;
  }, [posts, activeCategory, searchQuery]);

  // Split: hero (first) + featured sidebar (2–4) + grid rest
  const hasRealPosts = posts.length > 0;
  const heroPost = hasRealPosts ? filteredPosts[0] : null;
  const featuredSidebar = hasRealPosts ? filteredPosts.slice(1, 4) : [];
  const gridPosts = hasRealPosts ? filteredPosts.slice(4) : [];

  // Show skeletons when WP returned nothing yet (site warming up)
  const showSkeletons = !hasRealPosts;

  return (
    <div className={styles.pageWrapper}>

      {/* ── Header ─────────────────────────────── */}
      <section className={styles.headerSection}>
        <h1 className={styles.mainTitle}>Industry Insights</h1>
        <p className={styles.subtitle}>
          Read trending stories and strategic analyses shaping the cybersecurity world.
        </p>
        {/* Search input */}
        <div style={{ marginTop: '2rem', maxWidth: 480, margin: '2rem auto 0' }}>
          <input
            type="search"
            aria-label="Search blog posts"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              padding: '0.8rem 1.2rem',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = '#F5A706')}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
          />
        </div>
      </section>

      {/* ── Featured Area ───────────────────────── */}
      {(heroPost || showSkeletons) && activeCategory === 'All' && !searchQuery && (
        <section className={styles.featuredArea}>
          {/* Hero Card */}
          {heroPost ? (
            <div className={styles.heroCard}>
              <div className={styles.heroImageWrapper}>
                <img
                  src={heroPost.featuredImage?.node.sourceUrl ?? '/og-image.jpg'}
                  alt={heroPost.featuredImage?.node.altText ?? heroPost.title}
                  className={styles.heroImage}
                />
              </div>
              <div className={styles.heroContent}>
                <span className={styles.metaData}>
                  {formatDate(heroPost.date)}
                  {heroPost.categories?.nodes[0] && ` | ${heroPost.categories.nodes[0].name}`}
                </span>
                <h2 className={styles.heroTitle}>{heroPost.title}</h2>
                <p className={styles.heroDesc}>{stripHtml(heroPost.excerpt)}</p>
                <Link href={`/resources/blog/${heroPost.slug}`} className={styles.readMoreBtn}>
                  Read More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6 }}>
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          ) : (
            <SkeletonCard />
          )}

          {/* Featured Sidebar */}
          <div className={styles.featuredListSidebar}>
            <h3 className={styles.featuredSidebarTitle}>Featured Articles</h3>
            <div className={styles.featuredList}>
              {showSkeletons
                ? [1, 2, 3].map(i => <SkeletonCard key={i} />)
                : featuredSidebar.map(post => (
                  <Link href={`/resources/blog/${post.slug}`} key={post.slug} className={styles.featuredListItem}>
                    <div className={styles.featuredListImageWrapper}>
                      <img
                        src={post.featuredImage?.node.sourceUrl ?? '/og-image.jpg'}
                        alt={post.featuredImage?.node.altText ?? post.title}
                        className={styles.featuredListImage}
                      />
                    </div>
                    <div className={styles.featuredListContent}>
                      <span className={styles.metaDataSmall}>
                        {post.categories?.nodes[0]?.name}
                      </span>
                      <h4 className={styles.featuredListTitle}>{post.title}</h4>
                      <span className={styles.readMoreText}>Read More ➔</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Main Layout (Grid + Sidebar) ────────── */}
      <section className={styles.mainLayout}>

        {/* Left: Grid */}
        <div className={styles.gridContainer}>
          {showSkeletons ? (
            [1, 2, 3, 4].map(i => <SkeletonCard key={i} />)
          ) : filteredPosts.length > 0 ? (
            (activeCategory !== 'All' || searchQuery ? filteredPosts : gridPosts).map((post, index) => {
              const isLarge = index === 0 && gridPosts.length > 2 && !searchQuery && activeCategory === 'All';
              return (
                <article
                  key={post.slug}
                  className={`${styles.card} ${isLarge ? styles.largeCard : ''}`}
                >
                  <div className={styles.cardImageWrapper}>
                    <img
                      src={post.featuredImage?.node.sourceUrl ?? '/og-image.jpg'}
                      alt={post.featuredImage?.node.altText ?? post.title}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.metaData}>
                      {formatDate(post.date)}
                      {post.categories?.nodes[0] && ` | ${post.categories.nodes[0].name}`}
                    </span>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    {isLarge && (
                      <p className={styles.cardDesc}>{stripHtml(post.excerpt)}</p>
                    )}
                    <Link href={`/resources/blog/${post.slug}`} className={styles.readMoreBtn}>
                      Read More
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6 }}>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })
          ) : (
            <div className={styles.emptyState}>
              <p>
                {searchQuery
                  ? `No articles found for "${searchQuery}".`
                  : 'No articles in this category yet.'}
              </p>
            </div>
          )}
        </div>

        {/* Right: Category Sidebar */}
        <aside className={styles.categorySidebar}>
          <h3 className={styles.sidebarTitle}>Categories</h3>
          <ul className={styles.categoryList}>
            {categories.map(cat => (
              <li key={cat}>
                <button
                  className={`${styles.categoryBtn} ${activeCategory === cat ? styles.activeCategory : ''}`}
                  onClick={() => { setActiveCategory(cat); setSearchQuery(''); }}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

      </section>

      <div className="section-spacer" aria-hidden="true" />
    </div>
  );
}
