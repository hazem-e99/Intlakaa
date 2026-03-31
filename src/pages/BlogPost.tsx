import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPostBySlug, Post } from '@/services/cmsService';
import { PageContent } from '@/components/PageContent';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchPostBySlug(slug)
      .then(data => setPost(data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // Update document title
  useEffect(() => {
    if (post) {
      document.title = post.seoTitle || post.title;
    }
  }, [post]);

  return (
    <div className="min-h-screen" dir="rtl">
      <Navbar />
      <main className="pt-28 pb-20">
        {loading ? (
          <div className="container mx-auto px-4 max-w-3xl space-y-6 animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-64 bg-muted rounded-2xl" />
            <div className="space-y-3">
              {[1,2,3,4].map(i => <div key={i} className="h-4 bg-muted rounded" style={{ width: `${70 + i * 5}%` }} />)}
            </div>
          </div>
        ) : notFound || !post ? (
          <div className="text-center py-24">
            <p className="text-2xl font-bold mb-2">المقال غير موجود</p>
            <Link to="/blog" className="text-primary hover:underline flex items-center gap-2 justify-center mt-4">
              <ArrowRight className="h-4 w-4" /> العودة للمدونة
            </Link>
          </div>
        ) : (
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link to="/" className="hover:text-primary">الرئيسية</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-primary">المدونة</Link>
              <span>/</span>
              <span className="text-foreground">{post.title}</span>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-4">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-[1.45] mb-4">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              {post.author && (
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
              )}
              {post.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(post.publishedAt), 'dd MMMM yyyy', { locale: ar })}
                </span>
              )}
            </div>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="mb-10 rounded-2xl overflow-hidden">
                <img src={post.coverImage} alt={post.title} className="w-full max-h-96 object-cover" />
              </div>
            )}

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-lg text-muted-foreground border-r-4 border-primary pr-4 mb-10 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Content Blocks */}
            <PageContent blocks={post.blocks} />

            {/* Back Link */}
            <div className="mt-16 pt-8 border-t">
              <Link to="/blog" className="flex items-center gap-2 text-primary hover:underline">
                <ArrowRight className="h-4 w-4" />
                العودة إلى المدونة
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
