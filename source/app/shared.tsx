/* Native anchors preserve document history and scroll restoration; raw images support user-owned URLs and full-length artwork. Browser draft hydration runs once after SSR. */
/* eslint-disable next/no-html-link-for-pages, next/no-img-element, react/react-compiler */
'use client';
import { Asterisk, ArrowUpRight, ArrowLeft, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Content, Project, safeAsset } from './data';
export function Header({content}:{content:Content}){const [open,setOpen]=useState(false);return <><a className="skip-link" href="#main">跳到内容</a><header className="header"><a className="brand" href="/#top"><Asterisk/> {content.name||content.brand}<span>✦</span></a><nav aria-label="主导航" className={open?'mobile-open':''}><a href="/#projects" onClick={()=>setOpen(false)}>精选作品</a><a href="/#about" onClick={()=>setOpen(false)}>关于我</a><a href="/resume">简历</a><a className="nav-contact" href="/#contact" onClick={()=>setOpen(false)}>聊聊机会 <ArrowUpRight size={16}/></a></nav><button className="mobile-menu" onClick={()=>setOpen(!open)} aria-label={open?'关闭菜单':'打开菜单'} aria-expanded={open}>{open?<X/>:<Menu/>}</button></header></>}
export function Footer({content}:{content:Content}){return <footer className="wrap footer"><span>{content.name||content.brand} © 2026</span><span>带着好奇心，继续设计。</span></footer>}
export function ProjectCover({p,index=0}:{p:Project;index?:number}){return <div className={'project-cover theme-'+index}>{safeAsset(p.cover)?<img className="cover-image" src={safeAsset(p.cover)} alt={p.title+'项目封面'} loading="lazy"/>:<><span className="cover-kind">{p.category}</span><strong>{p.tagline}</strong><span className="cover-number" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><span className="cover-note">作品图片待补充</span></>}</div>}
export function BackToWorks(){return <a className="back-link" href="/#projects" onClick={e=>{try{if(sessionStorage.getItem('portfolio-return')){e.preventDefault();window.location.href='/#projects';}}catch{}}}><ArrowLeft size={17}/> 返回作品列表</a>}
export function rememberPosition(){try{sessionStorage.setItem('portfolio-return',JSON.stringify({y:window.scrollY,category:new URLSearchParams(window.location.search).get('category')||'全部'}));}catch{}}

