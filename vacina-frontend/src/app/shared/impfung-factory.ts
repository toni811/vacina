import {Impfung} from './impfung';

export class ImpfungFactory {

    static empty(): Impfung {
        return new Impfung(null, '', 'new date', '', null, '',
            {id: 0, PLZ: null, location: '', address: '', description: '', date: new Date()});
    }

    static fromObject(rawImpfung: any): Impfung{
        return new Impfung(
            rawImpfung.id,
            rawImpfung.title,
            typeof(rawImpfung.date) === 'string' ?
                new Date(rawImpfung.date) : rawImpfung.date,
            rawImpfung.description,
            rawImpfung.MaxMember,
            rawImpfung.appointment,
            rawImpfung.ort,
        );
    }
}
