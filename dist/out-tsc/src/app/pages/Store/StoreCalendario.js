var StoreCalendario = /** @class */ (function () {
    function StoreCalendario() {
    }
    StoreCalendario.prototype.setSelectedDate = function (date) {
        this.selectedDate = date;
    };
    StoreCalendario.prototype.getSelectedDate = function () {
        return this.selectedDate;
    };
    StoreCalendario.prototype.setCurrentYear = function (year) {
        this.currentYear = year;
    };
    StoreCalendario.prototype.getCurrentYear = function () {
        return this.currentYear;
    };
    StoreCalendario.prototype.setCurrentMonth = function (month) {
        this.currentMonth = month;
    };
    StoreCalendario.prototype.getCurrentMonth = function () {
        return this.currentMonth;
    };
    return StoreCalendario;
}());
export { StoreCalendario };
//# sourceMappingURL=StoreCalendario.js.map