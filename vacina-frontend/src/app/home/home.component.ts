import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-home',
  template: `
    <div class="jumbotron jumbotron-fluid">
  <div class="container">
      <h1 class="display-4">Vacina Impfanmeldung</h1>
      <p class="lead">Die Buchung eines Impftermins erfolgt ausschließlich über unsere Buchungsplattform (großer blauer Button unten). Eine Terminvereinbarung direkt in einer Arztordination oder Impfstelle ist nicht möglich.</p>
      <hr class="my-4">
      <p class="font-weight-bold">Wer kann AKTUELL einen Impftermin buchen?</p><p> ALLE  über 16 Jahre können einen konkreten Impftermin für eine Corona-Schutzimpfung buchen.

Es stehen Termine für Personen 16 Jahre und älter für jeweils zwei Teilimpfungen in Impfstellen zur Buchung zur Verfügung.</p>

 <p class="font-weight-bold">Gibt es eine spezielle Terminbuchung für Personen mit überstandener COVID-Infektion?</p><p>
Ja, die aktuelle Empfehlung des nationalen Impfgremiums für Personen nach labordiagnostisch gesicherter SARS-CoV-2-Infektion empfiehlt eine Einzeldosis 6 bis 8 Monate nach dem positiven COVID-Bescheid. Ausgewählte Impfstellen, die diese Einzelimpfung durchführen, sind übers ganze Land verteilt. Selbstverständlich können Sie auch direkt bei Ihrem Hausarzt eine solche Impfung bekommen, wenn er dafür Impfdosen zur Verfügung hat. Geeignet sind alle Impfstoffe!

Diese spezielle Buchungsmöglichkeit ist nur für Personen gedacht, die labor- bzw. behördlich bestätigt COVID-19 positiv waren und seit mehr als 6 Monaten vollständig als genesen gelten.</p>
      <p class="font-weight-bold"> Wann können Kinder und Jugendliche unter 16 Jahre geimpft werden?</p>
      <p>Derzeit gibt es leider noch keinen zugelassenen Impfstoff für Kinder und Jugendliche unter 16 Jahre. Wir erwarten diese Zulassung aber in den nächsten Wochen. Sofort wenn die Zulassung dafür erteilt wird, schalten wir die Impftermine auch für diese Altersgruppen frei.

Aktuell können aber bereits Kinder und Jugendliche von 12 bis 15 Jahren mit Hauptwohnsitz in Niederösterreich für eine Impfung vorgemerkt werden. Sie werden dann via Email informiert, sobald neue Informationen über den Impfstart und die weitere Vorgehensweise feststehen.</p>
      <p class="lead">
        <a class="btn btn-primary btn-lg" routerLink="../impfung" href="#" role="button">IMPFANMELDUNG</a>
      </p>
   </div>
    </div>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
