class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  notify(data) {
    this.observers.forEach((fn) => fn(data));
  }
}

const newsFeed = new Subject();

// Register multiple observers
newsFeed.subscribe((news) => console.log("[UI Banner]:", news));
newsFeed.subscribe((news) => console.log("[Push Notification]:", news));

newsFeed.notify("ES2026 Features Officially Released!");