export class StoreCalendario{

    public  selectedDate: any;
    public currentYear:any;
    public currentMonth:any;
    public Aulas: any;

    public setSelectedDate(date){
        this.selectedDate = date;
    }

    public getSelectedDate(){
        return this.selectedDate;
    }

    public setCurrentYear(year){
        this.currentYear = year;
    }

    public getCurrentYear(){
        return this.currentYear;
    }

    public setCurrentMonth(month){
        this.currentMonth = month;
    }

    public getCurrentMonth(){
        return this.currentMonth;
    }

    public setAulas(aulas){
        this.Aulas = aulas;
    }

    public getAulas(){
        return this.Aulas;
    }
}