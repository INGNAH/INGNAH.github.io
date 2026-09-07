import fs from 'node:fs';
const content=JSON.parse(fs.readFileSync('app/content.json','utf8'));
const html=fs.readFileSync('dist/index.html','utf8');
for(const [route,title] of [['resume','个人履历'],...content.projects.map(p=>['project/'+p.id,p.title])]){fs.mkdirSync('dist/'+route,{recursive:true});fs.writeFileSync('dist/'+route+'/index.html',html.replace(/<title>.*?<\/title>/,'<title>'+title+' · 设计进行时</title>'));}
fs.writeFileSync('dist/404.html',html);fs.writeFileSync('dist/.nojekyll','');
