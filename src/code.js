function doGet() {
  return HtmlService.createTemplateFromFile("src/index").evaluate();
}

/**
 * 企業ごとのカレンダーを作成する
 * @param {string} companyName
 * @returns 作成できた場合はtrue,できなかった場合はnull
 */
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
 * 入力された企業と同じ企業のカレンダーは存在しないかをチェックする
 * @param {string} companyName
 * @returns ない場合はtrue,ある場合はnull
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
