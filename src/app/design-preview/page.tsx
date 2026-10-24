import { ArrowDownToLine, ArrowRight, Check, CircleAlert, Clock3, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PRODUCT_NAME } from "@/lib/site";

const patients = [
  { name: "Milo Sherpa", detail: "Golden Retriever · 4 years", visit: "Annual wellness", time: "09:30", status: "Checked in", variant: "success" as const },
  { name: "Luna Rai", detail: "Domestic shorthair · 2 years", visit: "Follow-up", time: "10:15", status: "Arriving", variant: "default" as const },
  { name: "Biscuit Thapa", detail: "Beagle · 7 years", visit: "Dental review", time: "11:00", status: "Needs review", variant: "warning" as const },
];

export default function DesignPreviewPage() {
  return (
    <main className="preview-shell">
      <header className="preview-topbar">
        <Link className="brand" href="/" aria-label={`${PRODUCT_NAME} home`}><span className="brand-mark" aria-hidden="true"><span /></span><span>{PRODUCT_NAME}<span className="brand-period">.</span></span></Link>
        <div className="preview-topbar-meta"><span className="topbar-divider" /> <span>Design system</span><span className="preview-version">Foundation 01</span></div>
      </header>
      <div className="preview-container">
        <section className="preview-intro" aria-labelledby="page-title">
          <p className="eyebrow"><span className="eyebrow-dot" /> Product foundation</p>
          <div className="intro-row">
            <div><h1 id="page-title">A calmer way to care.</h1><p className="intro-copy">The visual language for a more thoughtful clinic day. Made for the people behind every good visit.</p></div>
            <Button variant="outline" asChild><a href="#components">Explore components <ArrowRight aria-hidden="true" /></a></Button>
          </div>
        </section>

        <section className="preview-section token-section" aria-labelledby="color-heading">
          <div className="section-heading"><div><p className="section-kicker">01 / Foundations</p><h2 id="color-heading">Color & type</h2></div><p className="section-description">A warm, quiet canvas. Teal gives important actions a clear home.</p></div>
          <div className="foundation-grid">
            <div className="foundation-card palette-card"><p className="component-label">Color palette</p><div className="swatches">
              <div className="swatch"><span className="swatch-color swatch-paper" /><span>Paper<small>#F7F7F2</small></span></div>
              <div className="swatch"><span className="swatch-color swatch-ink" /><span>Ink<small>#20312F</small></span></div>
              <div className="swatch"><span className="swatch-color swatch-teal" /><span>Evergreen<small>#14685E</small></span></div>
              <div className="swatch"><span className="swatch-color swatch-sage" /><span>Sage<small>#E6F0EC</small></span></div>
            </div></div>
            <div className="foundation-card type-card"><p className="component-label">Typography · Geist Sans</p><div className="type-sample"><span className="type-display">Care, made clear.</span><span className="type-body">Practical tools for a more present kind of care.</span><span className="type-caption">FIELD NOTE 01&nbsp; · &nbsp;PRODUCT FOUNDATION</span></div></div>
          </div>
        </section>

        <section id="components" className="preview-section" aria-labelledby="components-heading">
          <div className="section-heading"><div><p className="section-kicker">02 / Interface</p><h2 id="components-heading">Small details, considered.</h2></div><p className="section-description">Useful controls, consistent rhythm, visible focus.</p></div>
          <div className="component-grid">
            <article className="component-panel button-panel"><p className="component-label">Buttons</p><div className="button-row"><Button><Check aria-hidden="true" /> Save changes</Button><Button variant="outline">Secondary</Button><Button variant="ghost">Quiet action</Button></div><div className="button-row"><Button size="sm">Compact</Button><Button variant="danger" size="sm">Destructive</Button><Button variant="outline" size="icon" aria-label="Search"><Search aria-hidden="true" /></Button></div></article>
            <article className="component-panel input-panel"><p className="component-label">Form fields</p><label className="field-label" htmlFor="patient-search">Search patients</label><div className="input-wrap"><Search aria-hidden="true" /><Input id="patient-search" type="search" placeholder="Name or patient ID" /></div><p className="field-hint">Search by pet name or clinic reference.</p></article>
          </div>
          <div className="component-grid second-row">
            <article className="component-panel badge-panel"><p className="component-label">Status badges</p><div className="badge-row"><Badge variant="success"><Check aria-hidden="true" /> Checked in</Badge><Badge>Scheduled</Badge><Badge variant="warning"><Clock3 aria-hidden="true" /> Needs review</Badge><Badge variant="muted">Archived</Badge></div></article>
            <article className="component-panel alert-panel"><p className="component-label">Feedback</p><div className="inline-alert alert-success" role="status"><ShieldCheck aria-hidden="true" /><div><strong>Changes saved</strong><span>Your clinic details are up to date.</span></div></div><div className="inline-alert alert-warning" role="alert"><CircleAlert aria-hidden="true" /><div><strong>Review required</strong><span>One patient record needs attention.</span></div></div></article>
          </div>
        </section>

        <section className="preview-section table-section" aria-labelledby="table-heading">
          <div className="section-heading"><div><p className="section-kicker">03 / Information</p><h2 id="table-heading">A table that stays out of the way.</h2></div><Button variant="outline" size="sm"><ArrowDownToLine aria-hidden="true" /> Export list</Button></div>
          <div className="table-frame"><table><caption className="sr-only">Fictional appointments for table style preview</caption><thead><tr><th scope="col">Patient</th><th scope="col">Visit</th><th scope="col">Time</th><th scope="col">Status</th></tr></thead><tbody>{patients.map((patient) => <tr key={patient.name}><td><strong>{patient.name}</strong><span className="table-detail">{patient.detail}</span></td><td>{patient.visit}</td><td className="table-time">{patient.time}</td><td><Badge variant={patient.variant}>{patient.status}</Badge></td></tr>)}</tbody></table></div>
          <p className="preview-footnote">Fictional examples for visual preview only.</p>
        </section>
        <footer className="preview-footer"><Link href="/" className="footer-back">← Back to home</Link><span>Thoughtful tools for better clinic days <span aria-hidden="true">✳</span></span></footer>
      </div>
    </main>
  );
}
