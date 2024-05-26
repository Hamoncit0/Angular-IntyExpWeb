import { Injectable } from '@angular/core';
declare var introJs: any;

@Injectable({
  providedIn: 'root'
})
export class IntrojsService {
  introJS = null;

  iniciarTutorial(steps: any[]) {
    const tutorialVisto = localStorage.getItem('tutorialVisto');
    
    if (!tutorialVisto) {
      const intro = introJs();
      intro.setOptions({
        steps: steps,
        nextLabel: 'Siguiente',
        prevLabel: 'Anterior',
        doneLabel: 'Listo'
      });

      intro.start()
        localStorage.setItem('tutorialVisto', 'true');
      
    }
  }
}
