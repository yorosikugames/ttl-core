class DeltaLogger {

    deltaList: Array<any>;

    constructor() {
        this.deltaList = new Array<any>();
    }

    enqueue(delta: any) {
        this.deltaList.push(delta);
    }

    pop() {
        if (this.deltaList.length > 0) {
            var r = this.deltaList[0];
            this.deltaList.splice(0, 1);
            return r;
        } else {
            return null;
        }
    }
}

export = DeltaLogger;