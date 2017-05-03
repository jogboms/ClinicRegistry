import { Component, Input } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'patient-details-view',
  templateUrl: './view.html',
  styles: [`
    :host { display: block }
    .h {
      text-transform: uppercase;
      text-align: center;
    }
    p.lead {
      text-align: justify;
    }

    span.u {
      border-bottom: 1px dotted #ccc;
      color: slateblue;
      text-transform: lowercase;
    }

    span.p {
      font-weight: 400;
      text-transform: uppercase;
    }
  `]
})
export class PatientsDetailView {
  @Input() patient;
}
