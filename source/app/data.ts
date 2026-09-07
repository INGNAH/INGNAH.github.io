/* Native anchors preserve document history and scroll restoration; raw images support user-owned URLs and full-length artwork. Browser draft hydration runs once after SSR. */
/* eslint-disable next/no-html-link-for-pages, next/no-img-element, react/react-compiler */
'use client';

import defaults from './content.json';
export type Section = {id:string;title:string;text:string;layout:string;images:string[]};
export type Project = {id:string;title:string;category:string;tagline:string;tags:string;period:string;role:string;summary:string;collaboration:string;cover:string;visible:boolean;sections:Section[]};
export type Content = Omit<typeof defaults,'projects'> & {projects:Project[]};
export const initialContent:Content = defaults;
export function safeAsset(value:string,pdf=false):string { if(!value)return ''; if(/^\/(?!\/)/.test(value)||/^https:\/\//i.test(value))return value; if(!pdf && /^data:image\/(png|jpeg|webp|gif);base64,/i.test(value))return value;return ''; }
export function useContent(){return {content:initialContent};}
