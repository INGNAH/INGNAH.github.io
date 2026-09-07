/* Native anchors preserve document history and scroll restoration; raw images support user-owned URLs and full-length artwork. Browser draft hydration runs once after SSR. */
/* eslint-disable next/no-html-link-for-pages, next/no-img-element, react/react-compiler */
'use client';
import { useEffect, useState } from 'react';
import defaults from './content.json';
export type Section = {id:string;title:string;text:string;layout:string;images:string[]};
export type Project = {id:string;title:string;category:string;tagline:string;tags:string;period:string;role:string;summary:string;collaboration:string;cover:string;visible:boolean;sections:Section[]};
export type Content = Omit<typeof defaults,'projects'> & {projects:Project[]};
export const initialContent:Content = defaults;
export const DRAFT_KEY='design-portfolio-draft-v1';
export function safeAsset(value:string,pdf=false):string { if(!value)return ''; if(/^\/(?!\/)/.test(value)||/^https:\/\//i.test(value))return value; if(!pdf && /^data:image\/(png|jpeg|webp|gif);base64,/i.test(value))return value;return ''; }
export function validContent(value:unknown):value is Content {
 if(!value || typeof value!=='object')return false;const c=value as Content;
 const keys=['brand','name','role','location','intro','about','email','wechat','resumeUrl'] as const;
 if(!keys.every(k=>typeof c[k]==='string')||typeof c.previewMode!=='boolean'||!Array.isArray(c.projects)||c.projects.length>50)return false;
 return new Set(c.projects.map(p=>p.id)).size===c.projects.length && c.projects.every(p=>p && /^[a-z0-9-]+$/.test(p.id) && ['title','category','tagline','tags','period','role','summary','collaboration','cover'].every(k=>typeof (p as unknown as Record<string,unknown>)[k]==='string') && typeof p.visible==='boolean' && Array.isArray(p.sections) && p.sections.every(s=>s&&['id','title','text','layout'].every(k=>typeof (s as unknown as Record<string,unknown>)[k]==='string')&&/^[a-z0-9-]+$/.test(s.id)&&Array.isArray(s.images)&&s.images.every(i=>typeof i==='string')));
}
export function useContent(){const [content,setContent]=useState<Content>(initialContent);const [local,setLocal]=useState(false);useEffect(()=>{try{const saved=localStorage.getItem(DRAFT_KEY);if(saved){const data=JSON.parse(saved);if(validContent(data)){setContent(data);setLocal(true);}}}catch{}},[]);return {content,local};}


