
// Certificate types based on Italian school system
export const CERTIFICATE_TYPES = [
  { value: "iscrizione", label: "Certificato di Iscrizione" },
  { value: "frequenza", label: "Certificato di Frequenza" },
  { value: "diploma", label: "Diploma di Licenza" },
  { value: "maturita", label: "Diploma di Maturità" },
  { value: "servizio_docenti", label: "Certificato di Servizio (Docenti)" },
  { value: "servizio_ata", label: "Certificato di Servizio (ATA)" },
  { value: "identita_personale", label: "Certificato di Identità Personale" },
  { value: "sostitutivo", label: "Certificato Sostitutivo" },
  { value: "nulla_osta", label: "Nulla Osta al Trasferimento" },
];

// Define the certificate type
export interface Certificate {
  id: string;
  name: string;
  type: string;
  target: "studenti" | "docenti" | "entrambi";
  description?: string;
  content: string;
  includeHeader?: boolean;
  includeFooter?: boolean;
  signed?: boolean;
  signedBy?: string;
  signedDate?: string;
  sentTo?: string[];
  sentDate?: string;
  savedToFile?: boolean;
}

// Person interface for certificate recipients
export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: "studente" | "docente" | "personale";
  class?: string;
}

// Default templates for certificates (simplified versions)
export const DEFAULT_TEMPLATES: Certificate[] = [
  {
    id: "iscrizione_scolastica",
    name: "Certificato di Iscrizione Scolastica",
    type: "iscrizione",
    target: "studenti",
    content: `
<div class="header">
  <img src="{{logo_scuola}}" alt="Logo Scuola" />
  <h1>{{nome_scuola}}</h1>
</div>

<h2>CERTIFICATO DI ISCRIZIONE SCOLASTICA</h2>

<p>IL DIRIGENTE SCOLASTICO</p>

<p>CERTIFICA</p>

<p>che l'alunn{{genere}} <strong>{{cognome_studente}} {{nome_studente}}</strong>, nat{{genere}} a {{luogo_nascita}} ({{provincia_nascita}}) il {{data_nascita}}, è iscritt{{genere}} per l'anno scolastico {{anno_scolastico}} alla classe {{classe}} sezione {{sezione}} di questo Istituto.</p>

<p>Si rilascia il presente certificato per gli usi consentiti dalla legge.</p>

<div class="footer">
  <p>{{luogo}}, {{data_corrente}}</p>
  <div class="firma">
    <p>IL DIRIGENTE SCOLASTICO</p>
    <p>{{nome_dirigente}}</p>
  </div>
  <div class="timbro">
    <p>[TIMBRO]</p>
  </div>
</div>
    `
  },
  {
    id: "frequenza_scolastica",
    name: "Certificato di Frequenza",
    type: "frequenza",
    target: "studenti",
    content: `
<div class="header">
  <img src="{{logo_scuola}}" alt="Logo Scuola" />
  <h1>{{nome_scuola}}</h1>
</div>

<h2>CERTIFICATO DI FREQUENZA</h2>

<p>IL DIRIGENTE SCOLASTICO</p>

<p>CERTIFICA</p>

<p>che l'alunn{{genere}} <strong>{{cognome_studente}} {{nome_studente}}</strong>, nat{{genere}} a {{luogo_nascita}} ({{provincia_nascita}}) il {{data_nascita}}, frequenta nell'anno scolastico {{anno_scolastico}} la classe {{classe}} sezione {{sezione}} di questo Istituto.</p>

<p>Si rilascia il presente certificato per gli usi consentiti dalla legge.</p>

<div class="footer">
  <p>{{luogo}}, {{data_corrente}}</p>
  <div class="firma">
    <p>IL DIRIGENTE SCOLASTICO</p>
    <p>{{nome_dirigente}}</p>
  </div>
  <div class="timbro">
    <p>[TIMBRO]</p>
  </div>
</div>
    `
  },
  {
    id: "servizio_docenti",
    name: "Certificato di Servizio per Docenti",
    type: "servizio_docenti",
    target: "docenti",
    content: `
<div class="header">
  <img src="{{logo_scuola}}" alt="Logo Scuola" />
  <h1>{{nome_scuola}}</h1>
</div>

<h2>CERTIFICATO DI SERVIZIO</h2>

<p>IL DIRIGENTE SCOLASTICO</p>

<p>CERTIFICA</p>

<p>che {{titolo}} <strong>{{cognome_docente}} {{nome_docente}}</strong>, nat{{genere}} a {{luogo_nascita}} ({{provincia_nascita}}) il {{data_nascita}}, ha prestato servizio presso questo Istituto in qualità di Docente di {{materia}} dal {{data_inizio_servizio}} al {{data_fine_servizio}} con contratto di lavoro a tempo {{tipo_contratto}}.</p>

<p>Si rilascia il presente certificato per gli usi consentiti dalla legge.</p>

<div class="footer">
  <p>{{luogo}}, {{data_corrente}}</p>
  <div class="firma">
    <p>IL DIRIGENTE SCOLASTICO</p>
    <p>{{nome_dirigente}}</p>
  </div>
  <div class="timbro">
    <p>[TIMBRO]</p>
  </div>
</div>
    `
  },
  {
    id: "nulla_osta",
    name: "Nulla Osta al Trasferimento",
    type: "nulla_osta",
    target: "studenti",
    content: `
<div class="header">
  <img src="{{logo_scuola}}" alt="Logo Scuola" />
  <h1>{{nome_scuola}}</h1>
</div>

<h2>NULLA OSTA AL TRASFERIMENTO</h2>

<p>IL DIRIGENTE SCOLASTICO</p>

<p>CONCEDE</p>

<p>il nulla osta al trasferimento dell'alunn{{genere}} <strong>{{cognome_studente}} {{nome_studente}}</strong>, nat{{genere}} a {{luogo_nascita}} ({{provincia_nascita}}) il {{data_nascita}}, iscritt{{genere}} nell'anno scolastico {{anno_scolastico}} alla classe {{classe}} sezione {{sezione}} di questo Istituto, presso {{scuola_destinazione}}.</p>

<p>Si rilascia il presente nulla osta per gli usi consentiti dalla legge.</p>

<div class="footer">
  <p>{{luogo}}, {{data_corrente}}</p>
  <div class="firma">
    <p>IL DIRIGENTE SCOLASTICO</p>
    <p>{{nome_dirigente}}</p>
  </div>
  <div class="timbro">
    <p>[TIMBRO]</p>
  </div>
</div>
    `
  }
];

// Mock data for students and teachers
export const MOCK_PEOPLE: Person[] = [
  { id: "std1", firstName: "Marco", lastName: "Rossi", email: "marco.rossi@studenti.scuola.it", type: "studente", class: "3A" },
  { id: "std2", firstName: "Anna", lastName: "Verdi", email: "anna.verdi@studenti.scuola.it", type: "studente", class: "4B" },
  { id: "std3", firstName: "Luca", lastName: "Bianchi", email: "luca.bianchi@studenti.scuola.it", type: "studente", class: "5C" },
  { id: "doc1", firstName: "Maria", lastName: "Ferrari", email: "maria.ferrari@docenti.scuola.it", type: "docente" },
  { id: "doc2", firstName: "Giuseppe", lastName: "Romano", email: "giuseppe.romano@docenti.scuola.it", type: "docente" },
  { id: "ata1", firstName: "Sofia", lastName: "Esposito", email: "sofia.esposito@personale.scuola.it", type: "personale" },
];
