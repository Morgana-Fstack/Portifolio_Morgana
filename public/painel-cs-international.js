const es = new URLSearchParams(location.search).get("lang") === "es";
const locale = es ? "es-ES" : "en-US";
document.documentElement.lang = es ? "es" : "en";
const t = (en, spanish) => es ? spanish : en;
const title = t("Customer Success · Demo", "Customer Success · Demostración");
document.title = title;

const dashboard = document.getElementById("dashboard");
const currency = new Intl.NumberFormat(locale, { style: "currency", currency: "BRL", currencyDisplay: "code" });
const percentage = new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 1 });
const number = new Intl.NumberFormat(locale);
const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" });
const money = value => currency.format(value);
const count = value => number.format(value);
const percent = value => percentage.format(value);
const date = value => {
  const [day, month, year = "2026"] = value.split("/");
  const iso = value.includes("/") ? `${year}-${month}-${day}` : value;
  return dateFormat.format(new Date(iso + "T00:00:00Z"));
};
const escape = value => String(value ?? "").replace(/[&<>"']/g, char => ({
  "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;",
})[char]);

const labels = {
  Mensal: ["Monthly", "Mensual"], Trimestral: ["Quarterly", "Trimestral"],
  Semestral: ["Semiannual", "Semestral"], Anual: ["Annual", "Anual"],
  Trial: ["Trial", "Prueba"], Gratuito: ["Free", "Gratuito"],
  Serviço: ["Service", "Servicio"], Mentoria: ["Mentoring", "Mentoría"],
  "Serviço LinkedIn": ["LinkedIn service", "Servicio de LinkedIn"],
  "Mensal - Serviços e SEO": ["Monthly · Services and SEO", "Mensual · Servicios y SEO"],
  "Acordo Sul": ["South agency agreement", "Acuerdo con agencia sur"],
  "Acordo Norte": ["North agency agreement", "Acuerdo con agencia norte"],
  Cartão: ["Card", "Tarjeta"], Boleto: ["Bank slip", "Boleto bancario"],
  Outros: ["Other", "Otros"],
  "Falta de resultado/ROI": ["Lack of results or ROI", "Falta de resultados o ROI"],
  "Falta de uso (tempo/prioridade)": ["Low usage (time or priorities)", "Poco uso (tiempo o prioridades)"],
  "Problema técnico": ["Technical issue", "Problema técnico"],
  "Preço/orçamento": ["Price or budget", "Precio o presupuesto"],
  "Sem resposta pós contato": ["No response after contact", "Sin respuesta tras el contacto"],
  "Foi pro concorrente": ["Switched to a competitor", "Se pasó a un competidor"],
  "Encerramento combinado": ["Agreed termination", "Cierre acordado"],
  "Solução própria": ["In-house solution", "Solución propia"],
  "Cliente sem fit cultural": ["Cultural mismatch", "Incompatibilidad cultural"],
  "Fechamento da empresa": ["Business closure", "Cierre de la empresa"],
  "Fim de contrato": ["End of contract", "Fin del contrato"],
  "Desistência (não chegou a contratar)": ["Withdrew before signing", "Desistió antes de contratar"],
  "Outras saídas (encerramento combinado etc.)": ["Other departures (agreed termination, etc.)", "Otras salidas (cierre acordado, etc.)"],
  "Saída eventual": ["Occasional departure", "Salida eventual"],
};
const translated = value => labels[value]?.[es ? 1 : 0] ?? value;
const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const monthFormat = new Intl.DateTimeFormat(locale, { month: "long", timeZone: "UTC" });
const month = key => monthFormat.format(new Date(Date.UTC(2026, months.indexOf(key), 1)));

function table(title, headers, rows) {
  return `<article><h3>${escape(title)}</h3><div class="table-wrap" tabindex="0" role="region" aria-label="${escape(title)}"><table>
    <thead><tr>${headers.map(value => `<th scope="col">${escape(value)}</th>`).join("")}</tr></thead>
    <tbody>${rows.map(row => `<tr>${row.map(value => `<td>${escape(value)}</td>`).join("")}</tr>`).join("")}</tbody>
  </table></div></article>`;
}

function cards(items) {
  return `<div class="cards">${items.map(([label, value]) => `<div class="card">${escape(label)}<strong>${escape(value)}</strong></div>`).join("")}</div>`;
}

function bars(title, rows, format) {
  const max = Math.max(1, ...rows.map(row => row[1]));
  return `<article><h3>${escape(title)}</h3>${rows.map(([label, value]) => `<div class="bar-row">
    <span>${escape(label)}</span><meter min="0" max="${max}" value="${value}" aria-label="${escape(label)}"></meter>
    <span>${escape(format(value))}</span></div>`).join("")}</article>`;
}

const account = t("Account", "Cuenta");
const accounts = t("Accounts", "Cuentas");
const paying = t("Paying", "De pago");
const customers = t("Customers", "Clientes");
const plan = t("Plan", "Plan");
const product = t("Product", "Producto");
const payment = t("Payment method", "Forma de pago");
const newMrr = t("New MRR", "MRR nuevo");
const lostMrr = t("Lost MRR", "MRR perdido");
const activeMrr = t("Active MRR", "MRR activo");
const active = t("Active", "Activas");
const retention = t("Retention", "Retención");
const monthLabel = t("Month", "Mes");

function render(data) {
  const [updated, time] = data.atualizadoEm.split(" ");
  const portuguese = "/painel-cs-demo.html";
  const english = "/painel-cs-international.html?lang=en";
  const spanish = "/painel-cs-international.html?lang=es";
  const tabs = [
    ["overview", t("Executive overview", "Visión ejecutiva"), () =>
      cards([[activeMrr, money(data.kpi.mrr)], [t("Active customers", "Clientes activos"), count(data.niveis.cli[3])],
        [t("Active accounts", "Cuentas activas"), count(data.niveis.ct[3])], [t("Renewals within 60 days", "Renovaciones en 60 días"), count(data.kpi.contratos)]]) +
      bars(t("MRR by product", "MRR por producto"), data.produtos.map(row => [translated(row[0]), row[3]]), money) +
      table(t("Monthly MRR movement", "Movimiento mensual del MRR"), [monthLabel, newMrr, lostMrr, t("Net change", "Variación neta")],
        data.mensal.map(row => [month(row.m), money(row.novo), money(row.perd), money(row.liq)]))],
    ["operations", t("CS operations", "Operaciones de CS"), () =>
      cards([[t("Average active account age", "Antigüedad media de cuentas activas"), t(`${data.tv.ativos} days`, `${data.tv.ativos} días`)],
        [t("Average time to cancellation", "Tiempo medio hasta la cancelación"), t(`${data.tv.cancel} days`, `${data.tv.cancel} días`)]]) +
      table(t("Churn by onboarding status", "Churn según el estado de incorporación"), [t("Onboarding status", "Estado de incorporación"), accounts, t("Churned accounts", "Cuentas perdidas por churn"), "Churn"],
        data.onb.map((row, i) => [i === 0 ? t("Completed", "Completada") : t("Not completed", "Sin completar"), count(row[1]), count(row[2]), percent(row[3])])) +
      bars(t("Churn reasons", "Motivos de churn"), data.motivos.map(([reason, n]) => [translated(reason), n]), count) +
      bars(t("Departures excluded from churn", "Salidas excluidas del churn"), data.naoChurn.map(([reason, n]) => [translated(reason), n]), count)],
    ["retention", retention, () =>
      table(t("Retention by start-month cohort", "Retención por cohorte de alta"), [monthLabel, t("Joined", "Altas"), t("Cancelled", "Bajas"), "Churn", active, retention, newMrr, activeMrr],
        data.safras.map(row => [month(row.m), count(row.entr), count(row.cancel), count(row.churn), count(row.ativos), percent(row.entr ? row.ativos / row.entr : 0), money(row.mrrIn), money(row.mrrAt)]))],
    ["revenue", t("Revenue", "Ingresos"), () =>
      cards([[activeMrr, money(data.kpi.mrr)], [t("Payments received this month", "Cobros recibidos este mes"), money(data.recebidos.total)],
        [t("MRR at risk", "MRR en riesgo"), money(data.kpi.risco)]]) +
      table(t("MRR by plan", "MRR por plan"), [plan, accounts, paying, "MRR", t("MRR per paying account", "MRR por cuenta de pago")],
        data.planos.map(row => [translated(row[0]), count(row[1]), count(row[2]), money(row[3]), money(row[4])])) +
      table(t("Payments received by source", "Cobros recibidos por canal"), [payment, t("Payments", "Cobros"), t("Amount", "Importe")],
        data.recebidos.fontes.map(row => [translated(row.nome), count(row.n), money(row.valor)]))],
    ["customers", customers, () =>
      table(t("Upcoming renewals", "Próximas renovaciones"), [account, plan, t("Renewal date", "Fecha de renovación"), "MRR"],
        data.contratos.map(row => [row[0], translated(row[1]), date(row[2]), money(row[4])])) +
      `<label for="account-filter">${t("Filter accounts", "Filtrar cuentas")} <input id="account-filter" type="search"></label>` +
      `<div id="active-accounts">${accountTable(data.clientes)}</div>`],
    ["history", t("History", "Histórico"), () =>
      `<label for="history-month">${monthLabel} <select id="history-month">${data.historico.map((row, i) =>
        `<option value="${i}"${i === data.historico.length - 1 ? " selected" : ""}>${escape(month(row.m))}</option>`).join("")}</select></label>
      <div id="month-summary">${historyCards(data.historico.at(-1))}</div>` +
      table(t("Monthly snapshots", "Cierres mensuales"), [monthLabel, accounts, customers, "MRR", newMrr, lostMrr],
        data.historico.map(row => [month(row.m), count(row.contas), count(row.clientes), money(row.mrr), money(row.mrrNovo), money(row.mrrSaiu)]))],
    ["methodology", t("Methodology", "Metodología"), () =>
      `<article><h3>${t("How to read the metrics", "Cómo interpretar los indicadores")}</h3>
        <p>${t("MRR is monthly recurring revenue. Quarterly, semiannual and annual payments are divided by 3, 6 and 12. Free and trial accounts contribute zero MRR.", "El MRR es el ingreso recurrente mensual. Los pagos trimestrales, semestrales y anuales se dividen entre 3, 6 y 12. Las cuentas gratuitas y de prueba aportan cero MRR.")}</p>
        <p>${t("Churn excludes contract endings and other departures that are tracked separately. Customer churn counts companies, while cohort retention and onboarding charts count accounts.", "El churn excluye los fines de contrato y otras salidas que se registran por separado. El churn de clientes cuenta empresas. La retención por cohortes y los gráficos de incorporación cuentan cuentas.")}</p>
        <p>${t("Cohort retention is active accounts divided by the accounts that joined in the same month. Payments received show cash collected and differ from recurring revenue.", "La retención por cohorte divide las cuentas activas entre las que se dieron de alta en el mismo mes. Los cobros recibidos reflejan el dinero ingresado y se diferencian de los ingresos recurrentes.")}</p>
        <p>${t("All records and company names are fictional. Amounts are in Brazilian reais (BRL).", "Todos los registros y nombres de empresas son ficticios. Los importes se expresan en reales brasileños (BRL).")}</p></article>`],
  ];
  dashboard.innerHTML = `<header>
    <nav aria-label="${t("Demo languages", "Idiomas de la demostración")}"><a href="${portuguese}" lang="pt-BR">Português</a> ·
    ${es ? `<a href="${english}" lang="en">English</a>` : '<span aria-current="page">English</span>'} ·
    ${es ? '<span aria-current="page">Español</span>' : `<a href="${spanish}" lang="es">Español</a>`}</nav>
    <h1>${title}</h1><p>${t("Interactive dashboard with fictional data", "Panel interactivo con datos ficticios")}</p>
    <p>${t("Updated", "Actualizado")} ${date(updated)} · ${time} · BRL</p></header>
    <div role="tablist" aria-label="${t("Dashboard sections", "Secciones del panel")}">
    ${tabs.map(([id, label]) => `<button type="button" role="tab" id="tab-${id}" aria-controls="panel-${id}" aria-selected="false" tabindex="-1">${label}</button>`).join("")}</div>
    ${tabs.map(([id, label]) => `<section role="tabpanel" id="panel-${id}" aria-labelledby="tab-${id}" tabindex="0" hidden><h2>${label}</h2><div class="panel-content"></div></section>`).join("")}`;

  function activate(index, focus = false) {
    tabs.forEach(([id, , view], i) => {
      const button = document.getElementById("tab-" + id);
      const panel = document.getElementById("panel-" + id);
      const selected = i === index;
      button.tabIndex = selected ? 0 : -1;
      button.setAttribute("aria-selected", String(selected));
      panel.hidden = !selected;
      if (selected) {
        const content = panel.querySelector(".panel-content");
        if (!content.hasChildNodes()) content.innerHTML = view();
        if (focus) button.focus();
      }
    });
    history.replaceState(null, "", "#" + tabs[index][0]);
  }
  const initial = tabs.findIndex(([id]) => "#" + id === location.hash);
  activate(initial < 0 ? 0 : initial);
  tabs.forEach(([id], i) => {
    const tab = document.getElementById("tab-" + id);
    tab.addEventListener("click", () => activate(i));
    tab.addEventListener("keydown", event => {
      const next = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 }[event.key];
      if (next !== undefined) {
        event.preventDefault();
        activate(next, true);
      }
    });
  });
  dashboard.addEventListener("input", event => {
    if (event.target.id !== "account-filter") return;
    const term = event.target.value.trim().toLocaleLowerCase(locale);
    document.getElementById("active-accounts").innerHTML = accountTable(data.clientes.filter(row =>
      [row[0], translated(row[1]), translated(row[2])].some(value => value.toLocaleLowerCase(locale).includes(term))));
  });
  dashboard.addEventListener("change", event => {
    if (event.target.id === "history-month") {
      document.getElementById("month-summary").innerHTML = historyCards(data.historico[Number(event.target.value)]);
    }
  });
}

function accountTable(rows) {
  const title = t("Active accounts", "Cuentas activas");
  if (!rows.length) return `<p role="status">${t("No matching accounts.", "No hay cuentas que coincidan.")}</p>`;
  return table(title, [account, plan, product, payment, t("Start date", "Fecha de alta"), "MRR"],
    rows.map(row => [row[0], translated(row[1]), translated(row[2]), translated(row[4]), date(row[5]), money(row[6])]));
}

function historyCards(row) {
  return cards([["MRR", money(row.mrr)], [customers, count(row.clientes)], [newMrr, money(row.mrrNovo)], [lostMrr, money(row.mrrSaiu)]]);
}

try {
  const response = await fetch("/painel-cs-data.json");
  if (!response.ok) throw new Error("Dashboard data unavailable");
  render(await response.json());
} catch {
  dashboard.textContent = t("The dashboard could not load. Please refresh to try again.", "No se pudo cargar el panel. Actualiza la página para volver a intentarlo.");
}
