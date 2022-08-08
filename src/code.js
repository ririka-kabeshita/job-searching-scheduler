function doGet() {
  return HtmlService.createTemplateFromFile("src/index").evaluate();
}

/**
 * 企業ごとのカレンダーを作成する
 * @param {string} companyName
 * @returns 作成できた場合はtrue,できなかった場合はnull
 */
function createCompanyCalendar(companyName, companyDesire) {
  const result = checkSameCompany(companyName);
  if (result == true) {
    const options = { createdBy: "就活スケジュール管理 " };
    options.aspiration = companyDesire;
    const optionsJson = JSON.stringify(options);
    const calendar = CalendarApp.createCalendar(companyName);
    calendar.setDescription(optionsJson);
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
  const companyCalender = getAllCompanys();
  const result = companyCalender.includes(companyName);
  if (result == false) {
    return true;
  } else {
    return null;
  }
}

/**
 * "就活スケジュール管理"に該当するカレンダーを全て取得
 * @returns 全てのカレンダー
 */
function getAllCompanys() {
  const calendars = CalendarApp.getAllOwnedCalendars();
  const companyCalender = [];
  for (let i = 0; i < calendars.length; i++) {
    const calendarsDiscription = calendars[i].getDescription();
    if (calendarsDiscription.match("就活スケジュール管理")) {
      companyCalender.push(calendars[i].getName());
    }
  }
  return companyCalender;
}

/**
 * 志望度別で企業名を取得
 * @param {string} companyDesire
 * @returns 志望度ごとの企業の配列
 */
function getCompanysByDesire(companyDesire) {
  const calendars = CalendarApp.getAllOwnedCalendars();
  const companyCalender = [];
  for (let i = 0; i < calendars.length; i++) {
    const calendarsDiscription = calendars[i].getDescription();
    if (
      calendarsDiscription.includes("就活スケジュール管理") &&
      calendarsDiscription.includes(companyDesire)
    ) {
      companyCalender.push(calendars[i].getName());
    }
  }
  return companyCalender;
}
/**
 * どの会社名に予定を追加するか、会社名を取得
 * 会社名のところに予定を追加
 */
function createSchedule(title, date, startTime, finishTime,place,memo) {
  const calender = CalendarApp.getCalendarById("ririka.kabeshita@esm.co.jp");
  calender.createEvent(
    title,
    new Date(date + " " + startTime),
    new Date(date + " " + finishTime),
    {
      location: place,
      description: memo
    }
  );
  // return calender;
}
