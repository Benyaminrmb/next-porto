import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog'

interface PageProps { params:Promise<{locale:string;slug:string}> }
export async function generateStaticParams(){return ['en','fa'].flatMap(locale=>getAllPostSlugs(locale).map(slug=>({locale,slug})))}
export async function generateMetadata({params}:PageProps):Promise<Metadata>{const {locale,slug}=await params;const p=getPostBySlug(locale,slug);if(!p)return{};return{title:p.title,description:p.description,alternates:{canonical:`/${locale}/blog/${slug}`,languages:{en:`/en/blog/${slug}`,fa:`/fa/blog/${slug}`}},openGraph:{title:p.title,description:p.description,type:'article'}}}
const components={h2:(p:React.HTMLAttributes<HTMLHeadingElement>)=><h2 {...p}/>,h3:(p:React.HTMLAttributes<HTMLHeadingElement>)=><h3 {...p}/>,p:(p:React.HTMLAttributes<HTMLParagraphElement>)=><p {...p}/>,pre:(p:React.HTMLAttributes<HTMLPreElement>)=><pre {...p}/>,code:(p:React.HTMLAttributes<HTMLElement>)=><code {...p}/>,a:(p:React.AnchorHTMLAttributes<HTMLAnchorElement>)=><a {...p}/>,ul:(p:React.HTMLAttributes<HTMLUListElement>)=><ul {...p}/>,li:(p:React.HTMLAttributes<HTMLLIElement>)=><li {...p}/>}
export default async function BlogPost({params}:PageProps){const{locale,slug}=await params;const post=getPostBySlug(locale,slug);if(!post)notFound();const fa=locale==='fa';const Back=fa?ArrowRight:ArrowLeft;return <main className="article-shell"><Link className="article-back text-link" href={`/${locale}/blog`}><Back size={16}/>{fa?'بازگشت به نوشته‌ها':'Back to writing'}</Link><header className="article-header"><p className="kicker">{post.tags.join(' · ')}</p><h1>{post.title}</h1><div className="article-meta"><span>{new Date(post.date).toLocaleDateString(fa?'fa-IR':'en-US',{year:'numeric',month:'long',day:'numeric'})}</span><span>{post.readingTime} {fa?'دقیقه مطالعه':'min read'}</span><span>{post.author}</span></div></header><article className="article-body"><MDXRemote source={post.content} components={components}/></article></main>}
