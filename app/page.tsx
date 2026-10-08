
import { AppShell } from "@/components/crm/app-shell";
import { CompanyCardBody, CompanyCells } from "@/components/crm/company-cells";
import { CompaniesTable } from "@/components/crm/companies-table";

import { companies } from "@/lib/companies";

// Static route: no cookies()/headers(). Row content is rendered here, on the server,
// and handed to the client table as props, so it arrives as HTML without component JS.
export default function Page() {
  const cells = Object.fromEntries(companies.map((c) => [c.name, <CompanyCells key={c.name} c={c} />]));
  const cards = Object.fromEntries(companies.map((c) => [c.name, <CompanyCardBody key={c.name} c={c} />]));

  return (
    <AppShell companies={companies}>
      <CompaniesTable data={companies} cells={cells} cards={cards} />
    </AppShell>
  );
}
