function doGet() {
  return HtmlService.createTemplateFromFile("src/index").evaluate();
}

function createCompanyCalendar(companyName) {
  const result = checkSameCompany(companyName);
  if (result == true) {
    const options = '{createdBy:"就活スケジュール管理 ",aspiration:"後で追加"}';
    const calendar = CalendarApp.createCalendar(companyName);
    calendar.setDescription(options);
    return true;
  } else {
    return null;
  }
}
/**
 * 入力された値がカレンダーに存在する企業出ないかをチェックしたい
 * 　カレンダーを全て取得する
 * 　カレンダーの中で、”就活スケジュール管理”と説明文が入ってるものだけを取得する
 * 　その中から、同じ名前がないかを確認する
 */
function checkSameCompany(companyName) {
  const calendars = CalendarApp.getAllOwnedCalendars();
  const companyCalender = [];
  for (let i = 0; i < calendars.length; i++) {
    const calendarsDiscription = calendars[i].getDescription();
    if (calendarsDiscription.match("就活スケジュール管理")) {
      companyCalender.push(calendars[i].getName());
    }
  }
  const result = companyCalender.includes(companyName);
  if (result == false) {
    return true;
  } else {
    return null;
  }
}
