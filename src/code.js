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
      companyCalender.push(calendars[i]);
    }
  }
  return companyCalender;
}

/**
 * カレンダーの名前・ID・説明を取得し、配列に入れる
 * @returns カレンダーの名前・ID・説明の配列
 */
function getCompanysInfo() {
  const calendars = getAllCompanys();
  const calendarInfo = [];

  calendars.filter((calendar) => {
    return calendarInfo.push({
      name: calendar.getName(),
      id: calendar.getId(),
      description: calendar.getDescription(),
    });
  });
  return calendarInfo;
}

/**
 * 志望度別で企業名を取得
 * @param {string} companyDesire
 * @returns 志望度ごとの企業の配列
 */
function getCompanysByDesire(companyDesire) {
  const calendars = getCompanysInfo();
  console.log(calendars);
  const companysByDesire = calendars.filter((company) => {
    return company.description.includes(companyDesire);
  });

  return companysByDesire;
}

/**
 * 企業ごとの予定を作成する
 * @param {*} calendarId
 * @param {string} title
 * @param {number} date
 * @param {number} startTime
 * @param {number} finishTime
 * @param {string} place
 * @param {string} memo
 */
function createSchedule(
  calendarId,
  title,
  date,
  startTime,
  finishTime,
  place,
  memo
) {
  const calender = CalendarApp.getCalendarById(calendarId);
  calender.createEvent(
    title,
    new Date(date + " " + startTime),
    new Date(date + " " + finishTime),
    {
      location: place,
      description: memo,
    }
  );
}

function getSchedules(id) {
  const calendar = CalendarApp.getCalendarById(id);
  const now = new Date();
  const aYearFromNow = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000); //1年間分のデータを取得
  const events = calendar.getEvents(now, aYearFromNow);
  let messageArray = []; //カレンダーから取得した予定を格納

  for (let i = 0; i < events.length; i++) {
    const title = events[i].getTitle();
    let date = events[i].getStartTime();
    date = Utilities.formatDate(date, "JST", "yyyy-MM-dd");//データ型から"yyyy-MM-dd"に変換
    //予定の開始時刻
    const startHours = "0" + events[i].getStartTime().getHours();
    const startMinutes = "0" + events[i].getStartTime().getMinutes();
    const startTime = startHours.slice(-2) + ":" + startMinutes.slice(-2); //データ型から文字列に変換
    //予定の終了時刻
    const endHours = "0" + events[i].getEndTime().getHours();
    const endMinutes = "0" + events[i].getEndTime().getMinutes();
    const endTime = endHours.slice(-2) + ":" + endMinutes.slice(-2); //データ型から文字列に変換

    let location = events[i].getLocation();
    let memo = events[i].getDescription();
 
    messageArray.push({
      date: date,
      startTime: startTime,
      endTime: endTime,
      title: title,
      location: location,
      memo: memo,
    });
  }
  return messageArray;
}
