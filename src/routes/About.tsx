import { Link } from 'react-router-dom';
import { profile, timeline } from '../data/profile';

export default function About() {
  return <article className="profile-essay">
    <header className="essay-intro"><p className="eyebrow">THE PERSON / ADEOTI ISRAEL</p><h1>Before the systems,<br/><em>there was cødë.</em></h1><p>{profile.positioning}. Statistics student. Creative technologist. Founder.</p></header>
    <section className="essay-portrait"><figure><picture><source srcSet="/images/derin-portrait-608.webp 608w, /images/derin-portrait-400.webp 400w" sizes="(max-width: 768px) 90vw, 40vw"/><img src="/images/derin-portrait-608.webp" alt="Adeoti Israel standing against a wall engraved with Lagos place names" width="608" height="1080" loading="lazy"/></picture><figcaption className="mono">DERIN / LAGOS, NIGERIA</figcaption></figure><div><p className="eyebrow">A DIRECTION OF TRAVEL</p><h2>Visual thinking became interfaces. Interfaces became systems.</h2><p>I’m Adeoti Israel — Derin, online. The work is informed by design, business experience and statistical thinking: disciplines that ask how information is understood, trusted and put to use.</p><p>I’m interested in what sits beneath an answer: evidence, assumptions, failure modes and the engineering required to make a product behave reliably.</p><Link to="/work" className="atlas-link">Follow the work <span>→</span></Link></div></section>
    <section className="essay-timeline"><p className="eyebrow">THE THROUGHLINE</p><ol>{timeline.map(([period, description], index) => <li key={period}><span>0{index + 1} / {period}</span><p>{description}</p></li>)}</ol></section>
    <section className="essay-closing"><p>Design remains a way of seeing. Statistics remains a way of reasoning. Software is how both become useful to someone else.</p><Link to="/contact" className="atlas-link">Start a conversation <span>→</span></Link></section>
  </article>;
}
