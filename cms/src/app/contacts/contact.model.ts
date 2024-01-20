export class Contact {
    // constructor(public id: number, public email: string, public phone: string, public imageUrl: string, public group: Array) {
    constructor(
        public id: string
        , public name: string
        , public email: string
        , public phone: string
        , public imgUrl: string
        , public group?: Contact[]
    ) {

    }
}