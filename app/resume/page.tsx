/* Native anchors preserve document history and scroll restoration; raw images support user-owned URLs and full-length artwork. Browser draft hydration runs once after SSR. */
/* eslint-disable next/no-html-link-for-pages, next/no-img-element, react/react-compiler */
'use client';
import { ArrowUpRight } from 'lucide-react';
import { useContent,safeAsset } from '../data';
import { Header,Footer } from '../shared';
export default function Resume(){const {content}=useContent();return <><Header content={content}/><main className="wrap resume" id="main"><span className="eyebrow">个人履历</span><h1>{content.name||content.role}</h1><p className="resume-intro">{content.role} · {content.location} · 8 年商业设计经验</p>{safeAsset(content.resumeUrl,true)&&<a className="primary" href={safeAsset(content.resumeUrl,true)} target="_blank" rel="noopener noreferrer">查看 PDF 简历 <ArrowUpRight size={18}/></a>}<section><h2>个人介绍</h2><p>{content.about}</p></section><section><h2>项目经历</h2>{content.projects.filter(p=>p.category==='UI 设计').map(p=><article key={p.id}><div><h3>{p.title}</h3><span>{p.period}</span></div><p>{p.role}</p><p>{p.summary}</p><a href={'/project/'+p.id}>查看项目 ↗</a></article>)}</section><section><h2>工具与实践</h2><p>Figma · Photoshop · MasterGo · After Effects</p><p>AI 生图、AI 视频，以及 AI 辅助设计工作流探索。</p></section>{content.previewMode&&<div className="draft-notice">工作单位、任职时间、教育经历及完整 PDF 简历待补充。</div>}</main><Footer content={content}/></>}

