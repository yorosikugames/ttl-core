
class DeltaLogger {

    deltaList: Array<Object>;

    constructor() {
        this.deltaList = new Array<Object>();
    }

    enqueue(delta: Object): void {
        this.deltaList.push(delta);
    }

    toJSON(): string {
        var jsonArray = new Array<string>();
        for (var idx in this.deltaList) {
            jsonArray.push(JSON.stringify(this.deltaList[idx]));
        }
        return jsonArray.join('\n');
    }
}

export = DeltaLogger;