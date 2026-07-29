"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import Link from "next/link";
import { BlogPost } from "@/lib/blogs";

const styles = `
  .bc-link { font-family: var(--font-dm-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; }

  .bc-card {
    display: flex; flex-direction: column; height: 100%;
    background: rgba(255,255,255,0.72);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.6);
    box-shadow:
      0 1px 2px rgba(0,0,0,0.03),
      0 8px 24px rgba(0,0,0,0.06),
      inset 0 1px 0 rgba(255,255,255,0.8);
    transition: transform 0.45s cubic-bezier(0.25,1,0.5,1),
                box-shadow 0.45s cubic-bezier(0.25,1,0.5,1),
                border-color 0.45s ease;
    position: relative;
    overflow: hidden;
  }

  .bc-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent);
  }

  .bc-link:hover .bc-card {
    transform: translateY(-6px) scale(1.012);
    box-shadow:
      0 2px 4px rgba(0,0,0,0.04),
      0 20px 40px rgba(224, 102, 0, 0.10),
      inset 0 1px 0 rgba(255,255,255,0.9);
    border-color: rgba(255,255,255,0.85);
  }

  .bc-cat {
    font-weight: 600; font-size: 0.62rem; letter-spacing: 0.13em; text-transform: uppercase;
    border-radius: 999px; padding: 0.35rem 0.9rem;
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.5), 0 1px 2px rgba(0,0,0,0.04);
  }
  .bc-cat.development { background: rgba(99,102,241,0.10); color: #4f46e5; border: 1px solid rgba(99,102,241,0.18); }
  .bc-cat.enterprise   { background: rgba(168,85,247,0.10); color: #9333ea; border: 1px solid rgba(168,85,247,0.18); }
  .bc-cat.marketing    { background: rgba(255, 210, 0, 0.12); color: #d2540a; border: 1px solid rgba(224, 102, 0, 0.20); }
  .bc-cat.strategy     { background: rgba(29,29,31,0.06);   color: rgba(29,29,31,0.65); border: 1px solid rgba(29,29,31,0.10); }
  .bc-cat.default      { background: rgba(255, 210, 0, 0.12); color: #d2540a; border: 1px solid rgba(224, 102, 0, 0.20); }

  .bc-title {
    color: #1d1d1f; font-weight: 650; letter-spacing: -0.015em;
    transition: color 0.35s ease;
  }
  .bc-link:hover .bc-title {
    background: linear-gradient(135deg, #ffd200, #d2540a);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .bc-excerpt { color: rgba(29,29,31,0.52); }

  .bc-tag {
    font-weight: 600; font-size: 0.6rem; letter-spacing: 0.05em; text-transform: uppercase;
    color: rgba(29,29,31,0.45);
    background: rgba(0,0,0,0.035);
    border: 1px solid rgba(0,0,0,0.05);
    border-radius: 8px; padding: 0.18rem 0.55rem;
    transition: background 0.3s ease, color 0.3s ease;
  }
  .bc-link:hover .bc-tag {
    background: rgba(224, 102, 0, 0.06);
    color: rgba(224, 102, 0, 0.75);
  }

  .bc-footer { border-top: 1px solid rgba(0,0,0,0.055); }
  .bc-date { color: rgba(29,29,31,0.4); font-weight: 600; font-size: 0.62rem; letter-spacing: 0.08em; text-transform: uppercase; }

  .bc-read {
    color: #d2540a; font-weight: 650; font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase;
    display: inline-flex; align-items: center; gap: 0.3rem;
  }
  .bc-read svg { transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1); }
  .bc-link:hover .bc-read svg { transform: translateX(4px); }
`;

interface BlogCardProps {
  post: BlogPost & { tags?: string[] };
  index: number;
}

function categoryClass(category: string) {
  switch (category) {
    case "Development": return "development";
    case "Enterprise":  return "enterprise";
    case "Marketing":   return "marketing";
    case "Strategy":    return "strategy";
    default:            return "default";
  }
}

export function BlogCard({ post, index }: BlogCardProps) {
  const displayTags = post.tags || post.keywords || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.045, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -2 }}
      className="h-full"
    >
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <Link href={`/blog/${post.slug}`} className="bc-link block group h-full">
        <Card hoverable className="bc-card rounded-[1.85rem] p-6">

          {/* Category */}
          <div className="flex items-center justify-between mb-4">
            <span className={`bc-cat ${categoryClass(post.category)}`}>
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="bc-title text-base md:text-lg mb-2.5 leading-snug line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="bc-excerpt font-normal text-[11.5px] leading-relaxed line-clamp-3 mb-4">
            {post.excerpt}
          </p>

          {/* Tags */}
          {displayTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {displayTags.slice(0, 3).map((tag) => (
                <span key={tag} className="bc-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="bc-footer mt-auto pt-4 flex items-center justify-between">
            <span className="bc-date">{post.date}</span>
            <span className="bc-read">
              Read more
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}