
export class ErrorMessage {
    constructor(
        public forControl: string,
        public forValidator: string,
        public text: string
    ) { }
}

export const ImpfungFormErrorMessages = [
    new ErrorMessage('title', 'required', 'Ein Titel muss angegeben werden'),
    //new ErrorMessage('MaxMember', 'required', 'Es Max. Anzahl muss angegeben werden'),
    //new ErrorMessage('title', 'minlength', 'Der Titel muss mindestens 10Zeichen enthalten'),
   // new ErrorMessage('title', 'maxlength', 'Der Titel darf höchstens 13Zeichen haben'),
   //new ErrorMessage('date', 'required', 'Es muss ein Datum angegeben werden'),
   // new ErrorMessage('date', 'min', 'Bewertung kann nur positive Werte annehmen'),
    //new ErrorMessage('date', 'max', 'Maximal 10 Sterne erlaubt')
];