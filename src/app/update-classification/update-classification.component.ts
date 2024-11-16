import { Classification } from './../model/classification.model';
import { Component ,EventEmitter,Input, Output} from '@angular/core';

@Component({
  selector: 'app-update-classification',
  templateUrl: './update-classification.component.html',
  styles: [
  ]
})
export class UpdateClassificationComponent {
@Input()
classification! : Classification;

@Output()
classificationUpdated = new EventEmitter<Classification>();

@Input()
ajout!:boolean;




ngOnInit(): void {
  console.log("ngOnInit du composant UpdateClassification ",this.classification);
  }

  saveClassification(){
    this.classificationUpdated.emit(this.classification);
    }
}
