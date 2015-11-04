
class DeltaLogger {

    deltaList: Array<Map<string, any>>;

    constructor() {
        this.deltaList = new Array<Map<string, any>>();
    }

    enqueue(delta: Map<string, any>): void {
        this.deltaList.push(delta);
    }

    toJSON(): string {
        var jsonArray = new Array<string>();
        for (var idx in this.deltaList) {
            jsonArray.push(JSON.stringify(
                Array.from(this.deltaList[idx].entries())));
        }
        return jsonArray.join('\n');
    }
}

export = DeltaLogger;