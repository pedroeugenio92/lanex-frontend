export class ColumnList {
    title:string;
    name: string;
    type: string;
    cell: any;

    constructor(_title: string,_name: string, _type: string, _cell: any){
        this.title = _title;
        this.name = _name;
        this.type = _type;
        this.cell = _cell;

    }
}
