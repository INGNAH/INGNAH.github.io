import Detail from '../../detail';
import content from '../../content.json';
import { notFound } from 'next/navigation';
export function generateStaticParams(){return content.projects.map(p=>({id:p.id}));}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const {id}=await params;const p=content.projects.find(p=>p.id===id);return {title:p?.title||'项目未找到',description:p?.summary};}
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;if(!content.projects.some(p=>p.id===id))notFound();return <Detail id={id}/>;}

