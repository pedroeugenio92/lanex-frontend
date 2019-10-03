import { ElementRef } from '@angular/core';

export class Menu {
    id: string;
    label: string;
    element:ElementRef;
    router:string;
    subMenu: Menu[];

    constructor(_id: string,_label: string,_element: ElementRef,_router: string,_subMenu?: Menu[]){
        this.id = _id;
        this.label = _label;
        this.element = _element;
        this.router = _router;
        this.subMenu = _subMenu;
    }
}
