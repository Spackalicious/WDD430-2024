// // the spec file needs to have the same name as the file that I'm testing. 
// // doesn't HAVE to match, but this is following correct conventions. 

// // Test Driven Development: IDEALLY we are writing the test and THEN writing the code to match the tested functionality (planned out in advance)

// // test the delete document functionality.
// import { Document } from "./document.model";
// import { DocumentService } from "./document.service";

// // the way the tests work is that we describe the part of the code that we're working against. 
// describe('DocumentService', () => {
//     let documentService: DocumentService; 
//     const mockDocuments: Document[] = [
//         {
//             id: '1',
//             name: 'document 1', 
//             url: 'documenturl.com',
//             description: "document 1"
//         },
//         {
//             id: '2',
//             name: 'document 2', 
//             url: 'documenturl2.com',
//             description: "document 2"
//         }
//     ];

//     // describe what happens before each test. 
//     beforeEach(() => {
//         // before each test, make sure we initialize the document service.
//         documentService = new DocumentService();
//         documentService['documents'] = mockDocuments.slice(); // Mocking Documents
//     });

//     // create an IT function, which is very descriptive.
//     it('should delete a document', () => {
//         // arrange what the function should do.
//         const documentToDelete: Document = mockDocuments[0]; // Choosing a document to delete
//         const initialLength = documentService['documents'].length;

//         // act
//         documentService.deleteDocument(documentToDelete);

//         // assert
//         expect(documentService['documents'].length).toEqual(initialLength - 1);
//     });
// });