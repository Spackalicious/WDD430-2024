export class Message {
    constructor(
        public id: string
        , public subject: string
        , public msgText: string 
        // , public sender: number 
        , public sender: string 
      ) { }
}
