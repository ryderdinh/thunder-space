const initState = {
  _events: [],
};

export default function events(state = initState, action) {
  switch (action.type) {
    case "SET_EVENTS":
      let events = action.payload.event;
      let listEvent = [];
      if (events !== undefined) {
        let i = 0;
        while (i <= events.length - 1) {
          let arrR = [events[i]];
          let j = i + 1;
          while (j < events.length) {
            if (events[i].date === events[j].date) {
              arrR = [...arrR, events[j]];
              events.splice(j, 1);
            } else ++j;
          }
          listEvent = [...listEvent, arrR];
          ++i;
        }
      }
      return { ...state, _events: listEvent };
    default:
      return { ...state };
  }
}
