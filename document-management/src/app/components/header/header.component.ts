import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private translate: TranslateService) {
    // Set the default language
    this.translate.setDefaultLang('es');
    this.translate.use('es'); // Use Spanish as default
  }

  selectedLanguage: string = 'es'; // Default selected language
  languageOptions = [
    { label: 'Español', value: 'es', image: 'assets/flag-es.png' },
    { label: 'English', value: 'en', image: 'assets/flag-en.png' }
  ];
  
  viewingPermissions: boolean = false; // Set as boolean
  
  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
