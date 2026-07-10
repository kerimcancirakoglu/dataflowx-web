'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { decode } from 'html-entities';
import { useLocale } from 'next-intl';
import styles from './page.module.css';

// ──────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────
export interface WPPost {
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
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
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

function FallbackCover({ title }: { title: string }) {
  return (
    <div style={{ 
      width: '100%', height: '100%', 
      backgroundColor: '#0a0a0a', 
      backgroundImage: 'radial-gradient(circle at top right, rgba(0, 180, 255, 0.1), transparent 50%), radial-gradient(circle at bottom left, rgba(245, 167, 6, 0.1), transparent 50%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', 
      padding: '24px', textAlign: 'center',
      position: 'absolute', top: 0, left: 0
    }}>
      <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>
        {title}
      </h3>
    </div>
  );
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
  const locale = useLocale();
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
        decode(p.title).toLowerCase().includes(q) ||
        decode(stripHtml(p.excerpt)).toLowerCase().includes(q)
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
                {heroPost.featuredImage?.node.sourceUrl ? (
                  <Image
                    src={heroPost.featuredImage.node.sourceUrl}
                    alt={heroPost.featuredImage?.node.altText ?? decode(heroPost.title)}
                    fill style={{ objectFit: 'cover' }}
                    className={styles.heroImage}
                  />
                ) : (
                  <FallbackCover title={decode(heroPost.title)} />
                )}
              </div>
              <div className={styles.heroContent}>
                <span className={styles.metaData}>
                  {formatDate(heroPost.date)}
                  {heroPost.categories?.nodes[0] && ` | ${heroPost.categories.nodes[0].name}`}
                </span>
                <h2 className={styles.heroTitle}>{decode(heroPost.title)}</h2>
                <p className={styles.heroDesc}>{decode(stripHtml(heroPost.excerpt))}</p>
                <Link href={`/${locale}/resources/blog/${heroPost.slug}`} className={styles.readMoreBtn}>
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
                  <Link href={`/${locale}/resources/blog/${post.slug}`} key={post.slug} className={styles.featuredListItem}>
                    <div className={styles.featuredListImageWrapper}>
                        {post.featuredImage?.node.sourceUrl ? (
                          <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.featuredImage?.node.altText ?? decode(post.title)}
                            fill style={{ objectFit: 'cover' }}
                            className={styles.featuredListImage}
                          />
                        ) : (
                          <FallbackCover title={decode(post.title)} />
                        )}
                    </div>
                    <div className={styles.featuredListContent}>
                      <span className={styles.metaDataSmall}>
                        {post.categories?.nodes[0]?.name}
                      </span>
                      <h4 className={styles.featuredListTitle}>{decode(post.title)}</h4>
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
                    {post.featuredImage?.node.sourceUrl ? (
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage?.node.altText ?? decode(post.title)}
                        fill style={{ objectFit: 'cover' }}
                        className={styles.cardImage}
                      />
                    ) : (
                      <FallbackCover title={decode(post.title)} />
                    )}
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.metaData}>
                      {formatDate(post.date)}
                      {post.categories?.nodes[0] && ` | ${post.categories.nodes[0].name}`}
                    </span>
                    <h3 className={styles.cardTitle}>{decode(post.title)}</h3>
                    {isLarge && (
                      <p className={styles.cardDesc}>{decode(stripHtml(post.excerpt))}</p>
                    )}
                    <Link href={`/${locale}/resources/blog/${post.slug}`} className={styles.readMoreBtn}>
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
