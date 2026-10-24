import { CircleAlert, LockKeyhole } from "lucide-react";
import { PageHeader } from "@/components/app/page-content";

export default function BillingPage() {
  return (
    <>
      <PageHeader title="Billing & Dues" description="Invoices and payment history for your clinic." />
      <div className="app-page-content">
        <section className="billing-setup-state" aria-labelledby="billing-setup-title">
          <span className="billing-setup-icon" aria-hidden="true"><LockKeyhole /></span>
          <div className="billing-setup-copy">
            <p className="billing-setup-eyebrow"><CircleAlert aria-hidden="true" /> Setup required</p>
            <h2 id="billing-setup-title">Billing is not connected yet</h2>
            <p>
              This workspace has no verified staff session, clinic membership, or configured development
              database. Billing records and payment actions stay unavailable until those safeguards are in place.
            </p>
            <p className="billing-setup-next">
              Configure Supabase Auth and a development PostgreSQL connection, then add clinic membership
              provisioning before enabling invoice or payment access.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
