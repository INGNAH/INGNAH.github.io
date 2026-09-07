import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: { default: '设计进行时 · UI 设计作品集', template: '%s · 设计进行时' }, description: 'UI 设计师的作品与思考。移动端界面、运营视觉与创意探索。' };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="zh-CN"><body>{children}</body></html>; }

