import { experience, profile, timeline } from '../data/profile';
import { Link } from 'react-router-dom';

export default function Experience() {
  return <article className="experience-atlas">
    <header><p className="eyebrow">EXPERIENCE / MANY DISCIPLINES</p><h1>Work informs<br/><em>the work.</em></h1><p>{profile.positioning}</p></header>
    <section className="experience-now"><p className="eyebrow">CURRENT FOCUS</p><div><h2>AIICO<br/><em>Insurance</em></h2><p>Software Developer Intern<br/>Head Office, Victoria Island, Lagos</p></div><p>Currently under the innovation team.</p></section>
    <section className="experience-list"><p className="eyebrow">PROFESSIONAL &amp; PRACTICAL EXPERIENCE</p>{experience.map(([company, role, note], index) => <div key={company}><span>0{index + 1}</span><strong>{company}</strong><p>{role}</p><small>{note}</small></div>)}</section>
    <section className="experience-convergence"><div><p className="eyebrow">cødë → derin*</p><h2>One path,<br/>many materials.</h2></div><ol>{timeline.map(([period, description]) => <li key={period}><span>{period}</span><p>{description}</p></li>)}</ol></section>
    <section className="experience-maker"><p className="eyebrow">CREATIVE &amp; FOUNDER PRACTICE</p><div><h2>lāel</h2><p>CO-Founder of an independent clothing brand.</p></div><div><h3>Beyond the screen</h3><p>V&amp;M UNILAG modeling, independent fashion and lifestyle content creation, freelance websites and design work, and family-business experience.</p><p className="muted"> 100,000+ combined likes across two TikTok accounts; 2,000+ followers across platforms; 1,200+ LinkedIn followers.</p></div><Link to="/contact" className="atlas-link">Start a conversation <span>→</span></Link></section>
  </article>;
}
