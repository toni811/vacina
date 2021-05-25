import {Ort} from './ort';
export {Ort} from './ort';

export class Impfung {
    constructor(
        public id,
        public title,
        public date,
        public description,
        public MaxMember,
        public appointment,
        public ort
    ){}
}
