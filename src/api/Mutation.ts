const Mutation = {
  insertNote: `
  mutation createNote($stockId: String!,$content: String!) {
    createNote(stockId: $stockId, content: $content)
  }  
`,
  updateNote: `
  mutation updateNote($noteId: String!, $content: String!) {
    updateNote(noteId: $noteId, content: $content)
  }
`,
  deleteNote: `
  mutation deleteNote($noteId: String!) {
    deleteNote(noteId: $noteId)
  }
`,
  register: `
mutation register($data: Member!){
  register(data: $data) {
    status
    code
    data
  }
}
`,
  updateTracingStock: `
mutation updateTracingStock($id: String!) {
  updateTracingStock(id: $id)
}
`,
  updateStockRecord: `mutation updateRecord($content: String!) {
  updateRecord(content: $content)
}`,
};

export default Mutation;
