/* Native anchors preserve document history and scroll restoration; raw images support user-owned URLs and full-length artwork. Browser draft hydration runs once after SSR. */
/* eslint-disable next/no-html-link-for-pages, next/no-img-element, react/react-compiler */
'use client';
import { Asterisk, ArrowUpRight, ArrowLeft, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Content, Project, safeAsset } from './data';
export function Header({content}:{content:Content}){
  const [open,setOpen]=useState(false);
  const headerRef=useRef<HTMLElement>(null);
  const toggleRef=useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    if(!open)return;
    const onKey=(event:KeyboardEvent)=>{if(event.key==='Escape'){setOpen(false);toggleRef.current?.focus();}};
    const onPointer=(event:PointerEvent)=>{if(!headerRef.current?.contains(event.target as Node))setOpen(false);};
    const desktop=window.matchMedia('(min-width: 601px)');
    const onResize=()=>{if(desktop.matches)setOpen(false);};
    document.addEventListener('keydown',onKey);
    document.addEventListener('pointerdown',onPointer);
    desktop.addEventListener('change',onResize);
    return()=>{document.removeEventListener('keydown',onKey);document.removeEventListener('pointerdown',onPointer);desktop.removeEventListener('change',onResize);};
  },[open]);
  return <><a className="skip-link" href="#main">跳到内容</a><header ref={headerRef} className="header" onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))setOpen(false);}}>
    <a className="brand" href="/#top" onClick={()=>setOpen(false)}><Asterisk/> {content.name||content.brand}<span>✦</span></a>
    <button ref={toggleRef} className="mobile-menu" onClick={()=>setOpen(!open)} aria-label={open?'关闭菜单':'打开菜单'} aria-expanded={open} aria-controls="main-navigation">{open?<X/>:<Menu/>}</button>
    <nav id="main-navigation" aria-label="主导航" className={open?'mobile-open':''}>
      <a href="/#projects" onClick={()=>setOpen(false)}>精选作品</a><a href="/#about" onClick={()=>setOpen(false)}>关于我</a><a href="/resume" onClick={()=>setOpen(false)}>简历</a><a className="nav-contact" href="/#contact" onClick={()=>setOpen(false)}>聊聊机会 <ArrowUpRight size={16}/></a>
    </nav>
  </header></>;
}
export function Footer({content}:{content:Content}){return <footer className="wrap footer"><span>{content.name||content.brand} © 2026</span><span>带着好奇心，继续设计。</span></footer>}
export function ProjectCover({p,index=0}:{p:Project;index?:number}){return <div className={'project-cover theme-'+index}>{safeAsset(p.cover)?<img className="cover-image" src={safeAsset(p.cover)} alt={p.title+'项目封面'} loading="lazy"/>:<><span className="cover-kind">{p.category}</span><strong>{p.tagline}</strong><span className="cover-number" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><span className="cover-note">作品图片待补充</span></>}</div>}
export function BackToWorks(){return <a className="back-link" href="/#projects" onClick={e=>{try{if(sessionStorage.getItem('portfolio-return')){e.preventDefault();window.location.href='/#projects';}}catch{}}}><ArrowLeft size={17}/> 返回作品列表</a>}
export function rememberPosition(){try{sessionStorage.setItem('portfolio-return',JSON.stringify({y:window.scrollY,category:new URLSearchParams(window.location.search).get('category')||'全部'}));}catch{}}

