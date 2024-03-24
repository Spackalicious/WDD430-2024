export class Contact {
    // these next two lines from Bro Del Sol's video Wk11
    // public _id: string;
    // public id: string;

    constructor(
        public id: string,
        public name: string
        , public email: string
        , public phone: string
        , public imageUrl: string
        , public group?: Contact[]
    ) { }
}