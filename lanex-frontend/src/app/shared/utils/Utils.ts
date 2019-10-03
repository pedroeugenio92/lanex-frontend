import { NativeDateAdapter } from "@angular/material";


export class AppDateAdapter extends NativeDateAdapter {

    nomeDiaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    nomeMesAbreviado = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
    nomeMes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


    format(date: Date, displayFormat: Object): string {

        const diaSemana = this.nomeDiaSemana[date.getDay()]


        const data = date.getDate();
        const mes = this.nomeMesAbreviado[date.getMonth()];
        const mesCompleto = this.nomeMes[date.getMonth()];
        const ano = date.getFullYear();
        if (displayFormat === 'input') {
            return `${diaSemana}, ${data} de ${mesCompleto}`;
        }
        
        return `${mes} ${ano}`;
    }
}

export const APP_DATE_FORMATS =
{
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};