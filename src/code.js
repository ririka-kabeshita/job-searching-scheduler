function doGet() {
  return HtmlService.createTemplateFromFile("src/index").evaluate();
}

function createCompanyCalendar(companyName) {
  const options = '{createdBy:"就活スケジュール管理 ",aspiration:"後で追加"}';
  const calendar = CalendarApp.createCalendar(companyName);
  calendar.setDescription(options);
}
