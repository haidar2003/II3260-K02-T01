interface Tag {
    id : number;
    name :string
  }
  
interface Tag_status extends Tag {
    active : boolean
}


export {Tag, Tag_status}